export function sendUserParams(
  clientID: string,
  params: Record<string, string | number | boolean>
) {
  if (ym === undefined) throw new Error("Яндекс метрика не инициализирована");
  ym(clientID, "userParams", params);
}
