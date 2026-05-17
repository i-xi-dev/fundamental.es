import _text from "./_text/en.json" with { type: "json" };

export function _build(
  messageId: string,
  ...messageParameters: Array<string> //XXX linguistic parameter | invaliant parameter
): string {
  let messageText = (_text as Record<string, string>)[messageId];
  let index = -1;
  for (const messageParameter of messageParameters) {
    index += 1;
    messageText = messageText.replaceAll(`{${index}}`, messageParameter);
  }
  return messageText;
}
