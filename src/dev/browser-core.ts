/** Lazy browser fixture entry avoids importing application stores while i18n loads. */
export const isTauri = () => false;
export async function invoke<T>(command: string, args: Record<string, unknown> = {}): Promise<T> {
  if (command === "get_keyboard_shortcuts") return {} as T;
  if (command === "set_keyboard_shortcuts") return args.bindings as T;
  if (command === "suspend_keyboard_shortcuts") return undefined as T;
  const backend = await import("./mock-tauri");
  return backend.invoke<T>(command, args);
}
export class Resource {
  close() {}
}
export class Channel<T = unknown> {
  onmessage: ((message: T) => void) | undefined;
}
