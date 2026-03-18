import type { News } from "../../../schemas";

export type NewsCardPreviewType = "yandexVideos" | "images" | "text";

export function getNewsCardPreviewType(news: News): NewsCardPreviewType {
  if (news.previewType) {
    return news.previewType;
  } else if (news.yandexVideos) {
    return "yandexVideos";
  } else if (news.images) {
    return "images";
  } else {
    return "text";
  }
}
