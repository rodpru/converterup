/**
 * Lightweight tool-event tracker for tools that don't use ToolGate.
 * Fires a POST to /api/tool-events — silently fails for anonymous users.
 */
export function trackToolEvent(
  toolName: string,
  eventType: "started" | "completed",
) {
  fetch("/api/tool-events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ toolName, eventType }),
  }).catch(() => {});
}
