/**
 * To fix this: https://github.com/Microsoft/TypeScript/issues/30471#issuecomment-474963436
 * https://stackoverflow.com/questions/53279182/vscode-imports-import-console-requireconsole-automatically
 */

declare module "console" {
  export = typeof import("console");
}
