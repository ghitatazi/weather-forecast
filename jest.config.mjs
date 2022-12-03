import babel from "./babel.config.cjs";

export default {
  clearMocks: true,
  verbose: true,
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": [
      "ts-jest",
      {
        useESM: true, // important
        babelConfig: babel,
        packageJson: "package.json",
        tsConfig: "tsconfig.json",
        diagnostics: true,
      },
    ],
  },
  moduleFileExtensions: ["js", "ts"],
  testEnvironment: "node",
};
