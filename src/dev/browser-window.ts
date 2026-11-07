/** Browser preview has no native close event. */
export function getCurrentWindow() {
  return {
    onCloseRequested: async (_handler: (event: { preventDefault(): void }) => void) => () => {},
  };
}
