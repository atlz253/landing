export function getPortfolioImage(path: string) {
  const images = import.meta.glob<{ default: ImageMetadata }>(
    "/collections/portfolio/*.(jpg|png|webp)",
  );
  return images[path]?.();
}
