export const isNotNumber = (args: string[]): boolean =>
  args.slice(2).some((a) => isNaN(Number(a)));
