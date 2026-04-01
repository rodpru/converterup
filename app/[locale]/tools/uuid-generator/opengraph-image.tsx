import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const alt = "UUID Generator — ConverterUp";
export const size = ogSize;
export const contentType = ogContentType;

export default async function OgImage() {
	return generateOgImage({
		title: "UUID Generator",
		badge: "Developer",
	});
}
