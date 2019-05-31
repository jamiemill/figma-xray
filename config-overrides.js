module.exports = function override(config, env) {
  config.module.rules.unshift({
    test: /\.worker\.ts$/,
    use: ["worker-loader", "babel-loader"]
  });
  config.output.globalObject = "this";
  return config;
};
