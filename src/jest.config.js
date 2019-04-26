const esModules = ['@ionic', '@ionic-native'].join('|');

module.exports = {
  preset: "jest-preset-angular",
  transform: {
    "^.+\\.(ts|js|html)$": "ts-jest"
  },
  testMatch: [
    "**/?(*.)spec.ts?(x)"
  ],
  setupFilesAfterEnv: [
    "<rootDir>/setupJest.ts"
  ],
  transformIgnorePatterns: [`<rootDir>/node_modules/(?!${esModules})`]
};
