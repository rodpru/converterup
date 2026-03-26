import { ImageResponse } from "next/og";

export const alt = "ConverterUp — Convert Anything. Upload Nothing.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "edge";

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #0C0A12 0%, #16131E 50%, #0C0A12 100%)",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        <svg viewBox="0 0 32 32" width="80" height="80" fill="none">
          <defs>
            <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0D9488" />
              <stop offset="50%" stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#F43F5E" />
            </linearGradient>
          </defs>
          <rect x="5" y="6" width="14" height="20" rx="2" fill="url(#g)" />
          <rect
            x="13"
            y="6"
            width="14"
            height="20"
            rx="2"
            fill="none"
            stroke="#EDEDEF"
            strokeWidth="1.2"
            opacity="0.35"
            transform="rotate(8 20 16)"
          />
          <path
            d="M14.5 16l2.5 2.5 2.5-2.5"
            stroke="#fff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="17"
            y1="12.5"
            x2="17"
            y2="18.5"
            stroke="#fff"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <span
          style={{
            fontSize: "56px",
            fontWeight: 800,
            color: "#EDEDEF",
            letterSpacing: "-1px",
          }}
        >
          ConverterUp
        </span>
      </div>
      <div
        style={{
          fontSize: "32px",
          fontWeight: 600,
          color: "#EDEDEF",
          marginBottom: "16px",
        }}
      >
        Convert Anything. Upload Nothing.
      </div>
      <div
        style={{
          fontSize: "20px",
          color: "#71717A",
          maxWidth: "600px",
          textAlign: "center",
        }}
      >
        Images & videos converted 100% in your browser. Private, fast, free.
      </div>
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginTop: "40px",
        }}
      >
        {["PNG", "JPG", "WebP", "MP4", "GIF", "AVIF"].map((fmt) => (
          <div
            key={fmt}
            style={{
              padding: "8px 20px",
              borderRadius: "8px",
              border: "1px solid rgba(45, 212, 191, 0.3)",
              color: "#2DD4BF",
              fontSize: "16px",
              fontWeight: 600,
              letterSpacing: "1px",
            }}
          >
            {fmt}
          </div>
        ))}
      </div>
    </div>,
    { ...size },
  );
}
