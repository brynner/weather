module.exports = {
  context: __dirname + "/assets/js",
  entry: {
    app: [
    	"./ie-emulation-modes-warning.js",
    	"./ie10-viewport-bug-workaround.js",
    	"./sweetalert.min.js",
    	"./weather.min.js"
    ],
  },
  output: {
    path: __dirname + "/dist/js",
    filename: "weather.bundle.js",
  },
};