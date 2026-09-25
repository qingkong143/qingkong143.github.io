import { i18n } from "./config";

export function t(key: string, ...args: Array<string | number>): string {
  const val = key.split(".").reduce<any>((obj, k) => obj?.[k], i18n);
  if (typeof val !== "string") return key;
  if (!args.length) return val;
  let i = 0;
  return val.replace(/%s/g, () => String(args[i++] ?? ""));
}
