export {};

declare global {
  const ymab:
    | ((
        clientID: string,
        method: structuredClone,
        callback: (flags: { [key: string]: string[] }) => void
      ) => void)
    | undefined;
}
