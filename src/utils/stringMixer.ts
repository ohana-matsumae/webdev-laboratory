export default function stringMixer(data: string) {
  const encoder = new TextEncoder();
  const text = encoder.encode(data);

  const mixed = text.map(x => ((x ^ 0x1337) << 4) ^ 86);

  const decoder = new TextDecoder();
  return btoa(encodeURIComponent(decoder.decode(mixed)));
}