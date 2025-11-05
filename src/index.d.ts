export {};

declare global {
  interface YM {
    (
      clientID: string,
      method: "getClientID",
      callback: (clientID: string) => void
    ): void;
    (
      clientID: string,
      method: "userParams",
      data: Record<string, string | number | boolean>
    ): void;
  }

  const ym: YM | undefined;
}
