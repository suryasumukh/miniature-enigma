/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
export default {
  trailingComma: "es5",
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  quoteProps: "as-needed",
  arrowParens: "always",
  printWidth: 80,

  proseWrap: "preserve",
  bracketSpacing: true,
  jsxSingleQuote: false,
  endOfLine: "lf",
  htmlWhitespaceSensitivity: "css",
  insertPragma: false,
  singleAttributePerLine: false,
  bracketSameLine: false,
  requirePragma: false,
  embeddedLanguageFormatting: "auto",
  experimentalTernaries: false,

  plugins: ["prettier-plugin-tailwindcss"],
};
