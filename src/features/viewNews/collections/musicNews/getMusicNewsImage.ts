export function getMusicNewsImage(path: string) {
  const images = import.meta.glob<{ default: ImageMetadata }>(
    "/collections/musicNews/*.(jpg|png)",
  );
  return images[path]?.();
}
