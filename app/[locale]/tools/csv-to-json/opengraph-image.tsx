import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const alt = "CSV to JSON Converter — ConverterUp";
export const size = ogSize;
export const contentType = ogContentType;

export default async function OgImage() {
	return generateOgImage({
		title: "CSV to JSON Converter",
		badge: "Developer",
	});
}
