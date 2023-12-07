module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          version: "2.4.0",
        },
      ],
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@src": "./src",
          },
        },
      ],
    ],
  };
};
