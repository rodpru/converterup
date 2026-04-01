import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const alt = "Stripe Fee Calculator — ConverterUp";
export const size = ogSize;
export const contentType = ogContentType;

export default async function OgImage() {
	return generateOgImage({
		title: "Stripe Fee Calculator",
		badge: "Utility",
	});
}
