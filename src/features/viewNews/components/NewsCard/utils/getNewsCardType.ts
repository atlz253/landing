import type { News } from "../../../schemas";

export function getNewsCardType(news: News) {
  if (news.videos) {
    return "videos";
  } else if (news.images) {
    return "images";
  } else {
    return "text";
  }
}
