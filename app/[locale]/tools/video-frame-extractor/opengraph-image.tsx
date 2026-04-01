import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const alt = "Video Frame Extractor — ConverterUp";
export const size = ogSize;
export const contentType = ogContentType;

export default async function OgImage() {
	return generateOgImage({
		title: "Video Frame Extractor",
		badge: "Video",
	});
}
