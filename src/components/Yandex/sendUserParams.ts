import { METRIKA_COUNTER_ID } from ".";

export function sendUserParams(
  params: Record<string, string | number | boolean>
) {
  if (ym === undefined) throw new Error("Яндекс метрика не инициализирована");
  ym(METRIKA_COUNTER_ID, "userParams", params);
}
