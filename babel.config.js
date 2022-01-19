module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
  ],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@assets": "./src/assets",
					"@configs": "./src/configs",
					"@controllers": "./src/controllers",
					"@databases": "./src/databases",
					"@entities": "./src/entities",
					"@errors": "./src/errors",
					"@middlewares": "./src/middlewares",
					"@models": "./src/models",
					"@providers": "./src/providers",
					"@repositories": "./src/repositories",
					"@routes": "./src/routes",
					"@services": "./src/services",
					"@utils": "./src/utils",
					"@validators": "./src/validators",
					"@views": "./src/views",
        },
      },
    ],
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
  ],
};
