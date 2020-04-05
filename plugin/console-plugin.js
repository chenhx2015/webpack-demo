function MyDemoPlugin() {}
MyDemoPlugin.prototype.apply = function (compiler) {
  compiler.hooks.compilation.tap("compilation", (compilation) => {
    //compiler.plugin("compilation", (compilation) => {
    compilation.hooks.succeedModule.tap("optimize", () => {
      console.log("this is my first example plugin");
    });
  });
};

module.exports = MyDemoPlugin;
