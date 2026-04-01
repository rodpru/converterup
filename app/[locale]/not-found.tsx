import { redirect } from "@/i18n/routing";

export default function NotFound() {
  redirect({ href: "/", locale: "en" });
}
