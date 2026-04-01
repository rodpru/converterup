import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const alt = "Base64 Decoder — ConverterUp";
export const size = ogSize;
export const contentType = ogContentType;

export default async function OgImage() {
	return generateOgImage({
		title: "Base64 Decoder",
		badge: "Developer",
	});
}
