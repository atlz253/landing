import { METRIKA_COUNTER_ID } from ".";

export function getClientID(): Promise<string> {
  return new Promise((resolve, reject) => {
    if (ym === undefined)
      reject(new Error("Яндекс метрика не инициализирована"));
    else ym(METRIKA_COUNTER_ID, "getClientID", (clientID) => resolve(clientID));
  });
}
