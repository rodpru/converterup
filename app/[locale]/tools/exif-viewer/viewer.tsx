"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Camera,
  Download,
  Eye,
  Loader2,
  MapPin,
  ShieldOff,
  Upload,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import exifr from "exifr";
import { JsonLd } from "@/components/json-ld";
import { ToolGate } from "@/components/tool-gate";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/tiff"];
const ACCEPTED_EXTENSIONS = ".jpg,.jpeg,.png,.webp,.tiff,.tif";

type ExifData = Record<string, unknown>;

type GpsCoordinates = {
  latitude: number;
  longitude: number;
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "EXIF Data Viewer & Remover",
  url: "https://converterup.com/tools/exif-viewer",
  description:
    "View and remove EXIF metadata from your photos. See camera model, GPS coordinates, date taken, and more. Strip metadata for privacy.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any (browser-based)",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  isPartOf: {
    "@type": "WebSite",
    name: "ConverterUp",
    url: "https://converterup.com",
  },
};

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function formatExifValue(key: string, value: unknown): string {
  if (value === null || value === undefined) return "N/A";

  if (value instanceof Date) {
    return value.toLocaleString();
  }

  if (key === "ExposureTime" && typeof value === "number") {
    return value < 1 ? `1/${Math.round(1 / value)}s` : `${value}s`;
  }

  if (key === "FNumber" && typeof value === "number") {
    return `f/${value}`;
  }

  if (key === "FocalLength" && typeof value === "number") {
    return `${value}mm`;
  }

  if (key === "ISO" || key === "ISOSpeedRatings") {
    return `ISO ${value}`;
  }

  if (
    (key === "ImageWidth" ||
      key === "ImageHeight" ||
      key === "ExifImageWidth" ||
      key === "ExifImageHeight") &&
    typeof value === "number"
  ) {
    return `${value}px`;
  }

  if (typeof value === "object" && !Array.isArray(value)) {
    return JSON.stringify(value);
  }

  if (Array.isArray(value)) {
    return value.join(", ");
  }

  return String(value);
}

function getDisplayLabel(key: string): string {
  const labels: Record<string, string> = {
    Make: "Camera Make",
    Model: "Camera Model",
    LensModel: "Lens",
    LensMake: "Lens Make",
    FNumber: "Aperture",
    ExposureTime: "Shutter Speed",
    ISO: "ISO",
    ISOSpeedRatings: "ISO",
    FocalLength: "Focal Length",
    FocalLengthIn35mmFormat: "Focal Length (35mm)",
    DateTimeOriginal: "Date Taken",
    CreateDate: "Date Created",
    ModifyDate: "Date Modified",
    ExifImageWidth: "Width",
    ExifImageHeight: "Height",
    ImageWidth: "Width",
    ImageHeight: "Height",
    Software: "Software",
    Artist: "Artist",
    Copyright: "Copyright",
    Orientation: "Orientation",
    ColorSpace: "Color Space",
    WhiteBalance: "White Balance",
    Flash: "Flash",
    MeteringMode: "Metering Mode",
    ExposureProgram: "Exposure Program",
    ExposureCompensation: "Exposure Compensation",
    DigitalZoomRatio: "Digital Zoom",
    SceneCaptureType: "Scene Type",
    Contrast: "Contrast",
    Saturation: "Saturation",
    Sharpness: "Sharpness",
    GPSLatitude: "GPS Latitude",
    GPSLongitude: "GPS Longitude",
    GPSAltitude: "GPS Altitude",
    latitude: "GPS Latitude",
    longitude: "GPS Longitude",
  };
  return labels[key] || key;
}

function extractGps(data: ExifData): GpsCoordinates | null {
  const lat = data.latitude ?? data.GPSLatitude;
  const lng = data.longitude ?? data.GPSLongitude;

  if (typeof lat === "number" && typeof lng === "number") {
    return { latitude: lat, longitude: lng };
  }

  return null;
}

function getStaticMapUrl(coords: GpsCoordinates): string {
  const { latitude, longitude } = coords;
  const zoom = 14;
  const size = "400x250";
  return `https://staticmap.openstreetmap.de/staticmap.php?center=${latitude},${longitude}&zoom=${zoom}&size=${size}&markers=${latitude},${longitude},red-pushpin`;
}

const ease = [0.16, 1, 0.3, 1] as const;

export function ExifViewer() {
  return (
    <ToolGate toolName="exif-viewer">
      {({ gatedDownload, trackStarted }) => (
        <ExifViewerContent
          gatedDownload={gatedDownload}
          trackStarted={trackStarted}
        />
      )}
    </ToolGate>
  );
}

function ExifViewerContent({
  gatedDownload,
  trackStarted,
}: {
  gatedDownload: (downloadFn: () => void | Promise<void>) => Promise<void>;
  trackStarted: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [exifData, setExifData] = useState<ExifData | null>(null);
  const [gps, setGps] = useState<GpsCoordinates | null>(null);
  const [loading, setLoading] = useState(false);
  const [stripping, setStripping] = useState(false);
  const [cleanedUrl, setCleanedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hasTrackedStarted = useRef(false);

  const resetState = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    if (cleanedUrl) URL.revokeObjectURL(cleanedUrl);
    setFile(null);
    setPreviewUrl(null);
    setExifData(null);
    setGps(null);
    setCleanedUrl(null);
    setError(null);
  }, [previewUrl, cleanedUrl]);

  const parseExif = useCallback(async (imageFile: File) => {
    setLoading(true);
    setError(null);
    setExifData(null);
    setGps(null);
    setCleanedUrl(null);

    try {
      const data = await exifr.parse(imageFile, {
        gps: true,
        tiff: true,
        exif: true,
        iptc: true,
        xmp: true,
      });

      if (!data || Object.keys(data).length === 0) {
        setExifData(null);
        setError("No EXIF data found in this image.");
      } else {
        setExifData(data);
        const gpsCoords = extractGps(data);
        setGps(gpsCoords);
      }
    } catch {
      setError(
        "Failed to parse EXIF data. The file may be corrupted or unsupported.",
      );
    }

    setLoading(false);
  }, []);

  const handleFile = useCallback(
    (selectedFile: File) => {
      resetState();

      if (!ACCEPTED_TYPES.includes(selectedFile.type)) {
        setError(
          "Unsupported format. Please upload a JPG, PNG, WebP, or TIFF image.",
        );
        return;
      }

      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      parseExif(selectedFile);
      if (!hasTrackedStarted.current) {
        trackStarted();
        hasTrackedStarted.current = true;
      }
    },
    [resetState, parseExif, trackStarted],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) handleFile(droppedFile);
    },
    [handleFile],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) handleFile(selectedFile);
    },
    [handleFile],
  );

  const stripExif = useCallback(async () => {
    if (!file) return;

    setStripping(true);
    setError(null);

    try {
      const img = new Image();
      const loadPromise = new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Failed to load image."));
      });

      const objectUrl = URL.createObjectURL(file);
      img.src = objectUrl;
      await loadPromise;
      URL.revokeObjectURL(objectUrl);

      const canvas = canvasRef.current;
      if (!canvas) throw new Error("Canvas not available.");

      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context not available.");

      ctx.drawImage(img, 0, 0);

      const outputType = file.type === "image/png" ? "image/png" : "image/jpeg";
      const quality = outputType === "image/jpeg" ? 0.95 : undefined;

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => {
            if (b) resolve(b);
            else reject(new Error("Failed to create blob."));
          },
          outputType,
          quality,
        );
      });

      if (cleanedUrl) URL.revokeObjectURL(cleanedUrl);
      const url = URL.createObjectURL(blob);
      setCleanedUrl(url);
    } catch {
      setError("Failed to strip EXIF data. Please try again.");
    }

    setStripping(false);
  }, [file, cleanedUrl]);

  const downloadClean = useCallback(async () => {
    if (!cleanedUrl || !file) return;
    await gatedDownload(() => {
      const ext = file.type === "image/png" ? ".png" : ".jpg";
      const baseName = file.name.replace(/\.[^.]+$/, "");
      const a = document.createElement("a");
      a.href = cleanedUrl;
      a.download = `${baseName}-no-exif${ext}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }, [cleanedUrl, file, gatedDownload]);

  // Priority keys to show at the top of the table
  const priorityKeys = [
    "Make",
    "Model",
    "LensModel",
    "FNumber",
    "ExposureTime",
    "ISO",
    "ISOSpeedRatings",
    "FocalLength",
    "DateTimeOriginal",
    "CreateDate",
    "ExifImageWidth",
    "ExifImageHeight",
    "ImageWidth",
    "ImageHeight",
    "Software",
  ];

  const sortedEntries = exifData
    ? Object.entries(exifData).sort(([a], [b]) => {
        const aIdx = priorityKeys.indexOf(a);
        const bIdx = priorityKeys.indexOf(b);
        if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
        if (aIdx !== -1) return -1;
        if (bIdx !== -1) return 1;
        return a.localeCompare(b);
      })
    : [];

  return (
    <>
      <JsonLd data={jsonLdSchema} />
      <canvas ref={canvasRef} className="hidden" />

      <section className="container mx-auto px-4 sm:px-6 pt-12 pb-8 sm:pt-20 sm:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="inline-block font-mono text-[11px] uppercase tracking-wider text-primary mb-4">
            Free Tool
          </span>
          <h1 className="text-3xl sm:text-5xl font-[Syne] font-bold text-[#EDEDEF] mb-4">
            EXIF Data
            <br />
            <span className="gradient-text">Viewer & Remover</span>
          </h1>
          <p className="text-[#71717A] font-[Inter] text-base sm:text-lg max-w-xl mx-auto">
            Upload a photo to inspect its metadata — camera, lens, GPS, date,
            and more. Remove all EXIF data with one click for privacy.
          </p>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          className="max-w-2xl mx-auto"
        >
          {!file ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`relative border-2 border-dashed rounded-xl p-10 sm:p-14 text-center cursor-pointer transition-colors duration-200 ${
                dragOver
                  ? "border-[#2DD4BF]/50 bg-[#2DD4BF]/5"
                  : "border-[#2A2535] bg-[#16131E] hover:border-[#2DD4BF]/20"
              }`}
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  fileInputRef.current?.click();
                }
              }}
              role="button"
              tabIndex={0}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept={ACCEPTED_EXTENSIONS}
                onChange={handleFileInput}
                className="hidden"
              />
              <Upload className="w-8 h-8 text-[#71717A] mx-auto mb-4" />
              <p className="text-[#EDEDEF] font-[Inter] text-sm mb-1">
                Drop an image here or click to browse
              </p>
              <p className="text-[#71717A] font-mono text-[11px] uppercase tracking-wider">
                JPG, PNG, WebP, TIFF
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-[#16131E] border border-[#2A2535] rounded-xl p-4 flex items-center gap-4">
                {previewUrl && (
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#0C0A12] shrink-0">
                    {/* biome-ignore lint/a11y/useAltText: Preview thumbnail for uploaded file */}
                    <img
                      src={previewUrl}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-[Inter] font-medium text-[#EDEDEF] truncate">
                    {file.name}
                  </p>
                  <p className="font-mono text-[11px] text-[#71717A]">
                    {formatFileSize(file.size)} — {file.type}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    resetState();
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="text-[#71717A] hover:text-[#FB7185] transition-colors text-sm font-mono min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  Clear
                </button>
              </div>
            </div>
          )}

          <AnimatePresence>
            {error && !exifData && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex items-center gap-2 mt-4 p-3 rounded-lg bg-[#FB7185]/10 border border-[#FB7185]/20"
              >
                <AlertCircle className="w-4 h-4 text-[#FB7185] shrink-0" />
                <p className="text-[#FB7185] text-sm font-[Inter]">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {loading && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <Loader2 className="w-5 h-5 animate-spin text-[#2DD4BF]" />
              <span className="text-sm text-[#71717A] font-[Inter]">
                Reading EXIF data...
              </span>
            </div>
          )}
        </motion.div>

        <AnimatePresence>
          {exifData && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease }}
              className="max-w-4xl mx-auto mt-10 sm:mt-14"
            >
              {/* Actions bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-primary" />
                  <h2 className="text-lg font-[Syne] font-bold text-[#EDEDEF]">
                    Metadata
                  </h2>
                  <span className="ml-2 font-mono text-[11px] uppercase tracking-wider text-[#71717A]">
                    {sortedEntries.length} fields
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {!cleanedUrl ? (
                    <button
                      type="button"
                      onClick={stripExif}
                      disabled={stripping}
                      className="flex items-center gap-2 h-10 px-5 rounded-lg bg-[#FB7185]/10 border border-[#FB7185]/20 text-[#FB7185] font-mono text-[11px] uppercase tracking-wider font-semibold hover:bg-[#FB7185]/20 transition-colors disabled:opacity-50 min-h-[44px]"
                    >
                      {stripping ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <ShieldOff className="w-4 h-4" />
                      )}
                      Remove EXIF Data
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={downloadClean}
                      className="flex items-center gap-2 h-10 px-5 rounded-lg bg-[#2DD4BF] text-[#042F2E] font-mono text-[11px] uppercase tracking-wider font-semibold hover:shadow-[0_0_20px_rgba(45,212,191,0.15)] transition-all min-h-[44px]"
                    >
                      <Download className="w-4 h-4" />
                      Download Clean Image
                    </button>
                  )}
                </div>
              </div>

              <AnimatePresence>
                {cleanedUrl && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex items-center gap-2 mb-6 p-3 rounded-lg bg-[#2DD4BF]/10 border border-[#2DD4BF]/20"
                  >
                    <ShieldOff className="w-4 h-4 text-[#2DD4BF] shrink-0" />
                    <p className="text-[#2DD4BF] text-sm font-[Inter]">
                      EXIF data has been stripped. Your clean image is ready for
                      download.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {error && exifData && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex items-center gap-2 mb-6 p-3 rounded-lg bg-[#FB7185]/10 border border-[#FB7185]/20"
                  >
                    <AlertCircle className="w-4 h-4 text-[#FB7185] shrink-0" />
                    <p className="text-[#FB7185] text-sm font-[Inter]">
                      {error}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* EXIF Data table */}
                <div className="bg-[#16131E] border border-[#2A2535] rounded-xl overflow-hidden">
                  <div className="p-4 border-b border-[#2A2535] flex items-center gap-2">
                    <Camera className="w-4 h-4 text-primary" />
                    <h3 className="text-sm font-[Syne] font-bold text-[#EDEDEF]">
                      EXIF Fields
                    </h3>
                  </div>
                  <div className="max-h-[500px] overflow-y-auto">
                    <table className="w-full">
                      <tbody>
                        {sortedEntries.map(([key, value], i) => (
                          <motion.tr
                            key={key}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.015 }}
                            className="border-b border-[#2A2535]/50 last:border-0"
                          >
                            <td className="px-4 py-2.5 text-[11px] font-mono uppercase tracking-wider text-[#71717A] w-2/5 align-top">
                              {getDisplayLabel(key)}
                            </td>
                            <td className="px-4 py-2.5 text-sm font-[Inter] text-[#EDEDEF] break-all">
                              {formatExifValue(key, value)}
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Map + Image preview column */}
                <div className="space-y-6">
                  {/* Image preview */}
                  {previewUrl && (
                    <div className="bg-[#16131E] border border-[#2A2535] rounded-xl overflow-hidden">
                      <div className="p-4 border-b border-[#2A2535] flex items-center gap-2">
                        <Eye className="w-4 h-4 text-primary" />
                        <h3 className="text-sm font-[Syne] font-bold text-[#EDEDEF]">
                          Preview
                        </h3>
                      </div>
                      <div className="p-4">
                        {/* biome-ignore lint/a11y/useAltText: Image preview of user upload */}
                        <img
                          src={previewUrl}
                          alt=""
                          className="w-full h-auto rounded-lg max-h-[300px] object-contain bg-[#0C0A12]"
                        />
                      </div>
                    </div>
                  )}

                  {/* GPS Map */}
                  {gps && (
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease, delay: 0.2 }}
                      className="bg-[#16131E] border border-[#2A2535] rounded-xl overflow-hidden"
                    >
                      <div className="p-4 border-b border-[#2A2535] flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <h3 className="text-sm font-[Syne] font-bold text-[#EDEDEF]">
                          GPS Location
                        </h3>
                      </div>
                      <div className="p-4">
                        {/* biome-ignore lint/a11y/useAltText: Static map preview of GPS coordinates */}
                        <img
                          src={getStaticMapUrl(gps)}
                          alt=""
                          className="w-full h-auto rounded-lg bg-[#0C0A12]"
                          loading="lazy"
                        />
                        <p className="mt-3 font-mono text-[11px] text-[#71717A] text-center">
                          {gps.latitude.toFixed(6)}, {gps.longitude.toFixed(6)}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* How it works */}
      <section className="container mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-xl sm:text-2xl font-[Syne] font-bold text-[#EDEDEF] mb-6 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                step: "01",
                title: "Upload",
                desc: "Drop or select a JPG, PNG, WebP, or TIFF image.",
              },
              {
                step: "02",
                title: "Inspect",
                desc: "View all EXIF metadata: camera, lens, GPS, date, and more.",
              },
              {
                step: "03",
                title: "Clean & Download",
                desc: "Strip all metadata with one click and download the clean file.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease, delay: i * 0.1 }}
                className="bg-[#16131E] border border-[#2A2535] rounded-xl p-5"
              >
                <span className="font-mono text-[11px] text-primary uppercase tracking-wider">
                  Step {item.step}
                </span>
                <h3 className="text-base font-[Syne] font-bold text-[#EDEDEF] mt-2 mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-[#71717A] font-[Inter]">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </>
  );
}
