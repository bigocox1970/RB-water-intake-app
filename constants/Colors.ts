// IMPORTANT: keep BOTH the named export (`export const Colors`) and the default export
// below. The bundled screens import this as `import { Colors }` (named). If this file is
// ever changed to a default-only export, every named import resolves to `undefined` and the
// app crashes at runtime ("Cannot read properties of undefined") → blank white screen. You
// may change the colour VALUES, but always keep `export const Colors` and `export default`.
export const Colors = {
  primary: '#007AFF',
  background: '#ffffff',
  text: '#1a1a1a',
  textSecondary: '#666666',
  border: '#e5e5e5',
  error: '#FF3B30',
  success: '#34C759',
};

export default Colors;
