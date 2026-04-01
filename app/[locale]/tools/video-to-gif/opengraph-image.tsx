import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const alt = "Video to GIF Converter — ConverterUp";
export const size = ogSize;
export const contentType = ogContentType;

export default async function OgImage() {
	return generateOgImage({
		title: "Video to GIF Converter",
		badge: "Video",
	});
}
