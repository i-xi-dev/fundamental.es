import text from "./_text/en.json" with { type: "json" };

export function _message(
  messageId: string, /*TODO, messageParameters*/
): string {
  return (text as Record<string, string>)[messageId];
}
