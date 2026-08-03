export interface _DecoderStreamRegulator {
  regulate(text: string): string;
  flush(): string;
}
