# test

1. Create App
2. `$. npm i -D jest`
3. add in the scripts tag of package.json => `test: "jest"`
4. now, run test => `$. npm t`

Now most probably you will get this error => 

`9 files checked.
  testMatch: **/__tests__/**/*.[jt]s?(x), **/?(*.)+(spec|test).[tj]s?(x) - 0 matches
  testPathIgnorePatterns: \\node_modules\\ - 9 matches
  testRegex:  - 0 matches`
  
  Because, you don't have any test file, and jest couldn't fand any test file.
  
  Now, according to the `testMatch` if you create `__tests__/example.js`
  
  ```js
   test("it works", () => {});
  ```
  Jest could find a test file, and the error went out.
  
  
  
  
  Now I have a function called `getFormattedValue` and I want to test it, to the this function inside my test file, I have to import the function inside test file, and if I import it, I will get this error: => **SyntaxError: Unexpected token**
  
  `Jest suit failed to run`
  
  What's going on here, is that `Jest` runs in node, but `node` does not support `import` statements. we have to compile our `import` statements, we compile our import statements using `webpack`, `webpack` understands the `import` statements by default, and we have webpack configured further, with the babel loader, so it compiles everything out that isn't supported by the browser that we don't support.
  
  this usually means that you are trying to import a file which `Jest` cannot parse, It's not plain JavaScript.
  
  The trick here, is that in our `babelrc.js`, we're configuring our `@babel/preset-env` to not compile the `modules`, so that `webpack` can manage those, `Jest` is actually automatically, is picking up this `babel configuration` and applying it to our `test` code.
  
 finally our `babelrc.js` file should be this:
 
 ```js
 const isTest = String(process.env.NODE_ENV) === "test";
const isProd = String(process.env.NODE_ENV) === "production";

module.exports = {
  presets: [
    ["@babel/preset-env", { modules: isTest ? "commonjs" : false }],
    "@babel/preset-react",
    [
      "@emotion/babel-preset-css-prop",
      {
        hoist: isProd,
        sourceMap: !isProd,
        autoLabel: isProd ? "never" : "always",
        labelFormat: "[filename]--[local]",
      },
    ],
  ],
  plugins: ["@babel/plugin-transform-runtime"],
};
 ```
