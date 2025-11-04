export function getVarioqubFlags(): Promise<{
  [key: string]: string[] | undefined;
}> {
  return new Promise((resolve, reject) => {
    if (ymab === undefined) reject(new Error("Varioqub не инициализирован"));
    else
      ymab("metrika.104114816", "getFlags", function (flags) {
        resolve(flags);
      });
  });
}
