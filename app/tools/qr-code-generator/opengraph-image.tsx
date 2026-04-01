import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const alt = "QR Code Generator — ConverterUp";
export const size = ogSize;
export const contentType = ogContentType;

export default async function OgImage() {
	return generateOgImage({
		title: "QR Code Generator",
		badge: "Utility",
	});
}
