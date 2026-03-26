import { NextRequest, NextResponse } from "next/server";

const isProduction = process.env.NODE_ENV === "production";
const CLOUDCONVERT_API_URL = isProduction
  ? "https://api.cloudconvert.com/v2"
  : "https://api.sandbox.cloudconvert.com/v2";
const POLL_INTERVAL_MS = 2000;
const MAX_POLL_TIME_MS = 120_000;

interface CloudConvertTask {
  id: string;
  name: string;
  operation: string;
  status: string;
  result?: {
    form?: {
      url: string;
      parameters: Record<string, string>;
    };
    files?: Array<{ url: string; filename: string }>;
  };
}

interface CloudConvertJob {
  id: string;
  status: string;
  tasks: CloudConvertTask[];
}

function getApiKey(): string {
  const key = isProduction
    ? process.env.CLOUDCONVERT_API_KEY
    : process.env.CLOUDCONVERT_TEST_API_KEY;
  if (!key) {
    throw new Error(
      `${isProduction ? "CLOUDCONVERT_API_KEY" : "CLOUDCONVERT_TEST_API_KEY"} environment variable is not set`,
    );
  }
  return key;
}

function buildConvertTaskParams(
  outputFormat: string,
  quality?: number,
): Record<string, unknown> {
  const params: Record<string, unknown> = {
    operation: "convert",
    input: ["import-file"],
    output_format: outputFormat,
  };

  // Codec settings per format
  if (outputFormat === "webm") {
    params.video_codec = "libvpx";
    params.audio_codec = "libvorbis";
  } else if (outputFormat === "mp4") {
    params.video_codec = "x264";
    params.audio_codec = "aac";
  } else if (outputFormat === "mkv") {
    params.video_codec = "x264";
    params.audio_codec = "aac";
  }

  // Map quality (0-100) to CRF (51-0, lower = better)
  if (quality !== undefined) {
    const crf = Math.round(51 - (quality / 100) * 51);
    params.crf = crf;
  }

  return params;
}

async function createJob(
  apiKey: string,
  outputFormat: string,
  quality?: number,
): Promise<CloudConvertJob> {
  const convertParams = buildConvertTaskParams(outputFormat, quality);

  const response = await fetch(`${CLOUDCONVERT_API_URL}/jobs`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tasks: {
        "import-file": {
          operation: "import/upload",
        },
        "convert-file": convertParams,
        "export-file": {
          operation: "export/url",
          input: ["convert-file"],
        },
      },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `CloudConvert job creation failed (${response.status}): ${errorBody}`,
    );
  }

  const data = await response.json();
  return data.data as CloudConvertJob;
}

async function uploadFile(
  uploadTask: CloudConvertTask,
  file: File,
): Promise<void> {
  const form = uploadTask.result?.form;
  if (!form) {
    throw new Error("Upload task missing form data");
  }

  const formData = new FormData();
  for (const [key, value] of Object.entries(form.parameters)) {
    formData.append(key, value);
  }
  formData.append("file", file);

  const response = await fetch(form.url, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`File upload failed (${response.status})`);
  }
}

async function pollJobUntilDone(
  apiKey: string,
  jobId: string,
): Promise<CloudConvertJob> {
  const startTime = Date.now();

  while (Date.now() - startTime < MAX_POLL_TIME_MS) {
    const response = await fetch(`${CLOUDCONVERT_API_URL}/jobs/${jobId}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to check job status (${response.status})`);
    }

    const data = await response.json();
    const job = data.data as CloudConvertJob;

    if (job.status === "finished") {
      return job;
    }

    if (job.status === "error") {
      const failedTask = job.tasks.find((t) => t.status === "error");
      throw new Error(
        `CloudConvert job failed: ${failedTask?.name ?? "unknown task"}`,
      );
    }

    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
  }

  throw new Error("CloudConvert job timed out after 120 seconds");
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = getApiKey();

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const outputFormat = formData.get("outputFormat") as string | null;
    const qualityStr = formData.get("quality") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!outputFormat) {
      return NextResponse.json(
        { error: "No output format specified" },
        { status: 400 },
      );
    }

    const quality = qualityStr ? Number.parseInt(qualityStr, 10) : undefined;

    // 1. Create job
    const job = await createJob(apiKey, outputFormat, quality);

    // 2. Find the upload task
    const uploadTask = job.tasks.find(
      (t) => t.name === "import-file" && t.operation === "import/upload",
    );
    if (!uploadTask) {
      throw new Error("Upload task not found in job response");
    }

    // 3. Upload the file
    await uploadFile(uploadTask, file);

    // 4. Poll until complete
    const finishedJob = await pollJobUntilDone(apiKey, job.id);

    // 5. Get the export URL
    const exportTask = finishedJob.tasks.find(
      (t) => t.name === "export-file" && t.operation === "export/url",
    );
    const exportUrl = exportTask?.result?.files?.[0]?.url;

    if (!exportUrl) {
      throw new Error("Export URL not found in finished job");
    }

    return NextResponse.json({ url: exportUrl });
  } catch (error) {
    console.error("[CloudConvert Error]", error);
    const message =
      error instanceof Error ? error.message : "Server conversion failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
