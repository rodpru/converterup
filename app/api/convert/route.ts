import { NextRequest, NextResponse } from "next/server";

// Increase max duration for video processing (Vercel Pro: up to 300s)
export const maxDuration = 120;

const isProduction = process.env.NODE_ENV === "production";
const CLOUDCONVERT_API_URL = isProduction
  ? "https://api.cloudconvert.com/v2"
  : "https://api.sandbox.cloudconvert.com/v2";

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
    timeout: 900, // 15 minutes max for large videos
  };

  return params;
}

// Step 1: Create job and return upload info (client uploads directly to CloudConvert)
export async function POST(request: NextRequest) {
  try {
    const apiKey = getApiKey();
    const { outputFormat, quality } = await request.json();

    if (!outputFormat) {
      return NextResponse.json(
        { error: "No output format specified" },
        { status: 400 },
      );
    }

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
    const job = data.data;

    const uploadTask = job.tasks.find(
      (t: { name: string; operation: string }) =>
        t.name === "import-file" && t.operation === "import/upload",
    );

    if (!uploadTask?.result?.form) {
      throw new Error("Upload task missing form data");
    }

    return NextResponse.json({
      jobId: job.id,
      uploadUrl: uploadTask.result.form.url,
      uploadParams: uploadTask.result.form.parameters,
    });
  } catch (error) {
    console.error("[CloudConvert Error]", error);
    const message =
      error instanceof Error ? error.message : "Job creation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// Step 2: Poll job status
export async function GET(request: NextRequest) {
  try {
    const apiKey = getApiKey();
    const jobId = request.nextUrl.searchParams.get("jobId");

    if (!jobId) {
      return NextResponse.json({ error: "No jobId provided" }, { status: 400 });
    }

    const response = await fetch(`${CLOUDCONVERT_API_URL}/jobs/${jobId}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to check job status (${response.status})`);
    }

    const data = await response.json();
    const job = data.data;

    if (job.status === "finished") {
      const exportTask = job.tasks.find(
        (t: { name: string; operation: string }) =>
          t.name === "export-file" && t.operation === "export/url",
      );
      const exportUrl = exportTask?.result?.files?.[0]?.url;

      return NextResponse.json({ status: "finished", url: exportUrl });
    }

    if (job.status === "error") {
      const failedTask = job.tasks.find(
        (t: { status: string }) => t.status === "error",
      );
      console.error("[CloudConvert] Failed task:", JSON.stringify(failedTask, null, 2));
      const taskMessage = failedTask?.message || failedTask?.code || failedTask?.name || "unknown";
      return NextResponse.json({
        status: "error",
        error: `Conversion failed: ${taskMessage}`,
      });
    }

    return NextResponse.json({ status: job.status });
  } catch (error) {
    console.error("[CloudConvert Poll Error]", error);
    const message =
      error instanceof Error ? error.message : "Status check failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
