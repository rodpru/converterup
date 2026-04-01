import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

async function loadSyneFont(): Promise<ArrayBuffer | undefined> {
	try {
		const css = await fetch(
			"https://fonts.googleapis.com/css2?family=Syne:wght@700&display=swap",
		).then((res) => res.text());
		const fontUrl = css.match(
			/src:\s*url\(([^)]+)\)\s*format\('woff2'\)/,
		)?.[1];
		return fontUrl
			? await fetch(fontUrl).then((res) => res.arrayBuffer())
			: undefined;
	} catch {
		return undefined;
	}
}

export async function generateOgImage({
	title,
	badge,
}: {
	title: string;
	badge: string;
}) {
	const fontData = await loadSyneFont();

	return new ImageResponse(
		(
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					padding: "60px 72px",
					background: "#0C0A12",
					color: "#EDEDEF",
					fontFamily: fontData ? "Syne" : "system-ui",
				}}
			>
				<div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
					<span
						style={{
							fontSize: 14,
							fontWeight: 700,
							letterSpacing: "0.1em",
							textTransform: "uppercase",
							color: "#2DD4BF",
							border: "1px solid #2A2535",
							padding: "4px 12px",
							borderRadius: "4px",
						}}
					>
						{badge}
					</span>
					<span
						style={{
							fontSize: 14,
							fontWeight: 700,
							letterSpacing: "0.1em",
							textTransform: "uppercase",
							color: "#71717A",
							border: "1px solid #2A2535",
							padding: "4px 12px",
							borderRadius: "4px",
						}}
					>
						Free Tool
					</span>
				</div>

				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "16px",
						maxWidth: "900px",
					}}
				>
					<h1
						style={{
							fontSize: title.length > 50 ? 42 : 56,
							fontWeight: 700,
							lineHeight: 1.15,
							margin: 0,
							color: "#EDEDEF",
						}}
					>
						{title}
					</h1>
				</div>

				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<span style={{ fontSize: 24, fontWeight: 700, color: "#EDEDEF" }}>
						ConverterUp
					</span>
					<span style={{ fontSize: 16, color: "#71717A" }}>
						converterup.com
					</span>
				</div>
			</div>
		),
		{
			...ogSize,
			...(fontData
				? {
						fonts: [
							{
								name: "Syne",
								data: fontData,
								weight: 700 as const,
								style: "normal" as const,
							},
						],
					}
				: {}),
		},
	);
}
