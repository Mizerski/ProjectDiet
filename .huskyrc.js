module.exports = {
  hooks: {
    "pre-commit":
      "yarn lint --fix && node check-dependencies.mjs && npm test && npm run lint",
  },
};
