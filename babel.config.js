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
					"@tmp": "./src/tmp",
					"@utils": "./src/utils",
					"@views": "./src/views",
        },
      },
    ],
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
  ],
};
