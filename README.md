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

**Jest** has a lot of awesome things by default, and one those awesome things, is it simulates it's browser environment in `Node`, using the module called `jsdom`.

`jest.config.js`

```js
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
}
```

If you're gonna test a component which uses a `css` file, then in this case you'll get an error when you run the test using `npm t`, it's actually an issue in, mocking a js module, we're getting a `syntax error unexpected token .` when we want to import a `.css` file.

what's going on here, `Jest` is trying to require this file (.css) like a `common.js` module, and clearly this is not a `common.js` module, this is a `css` file, and that's why we're running into this syntax error, so what we're gonna do, is using this `moduleNameMapper` suggestion, so we can map modules that ending up with `.css` to a different module, a `mocked` version of that module.

so inside `jest.config.js` file:

```js
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.css$': require.resolve('./test/style-mock.js')
  }
}
```

`test/style-mock.js`

```js
module.exports = {}
```

and create a directory of `test/style-mock.js`

with doing this you are resolving every module that ends with `.css` to a different module to `style-mock.js` instead.

now if we run `$. npm t` everything will work out.

So, now when `Jest` comes across a file that matches this `\\.css$` instead of requiring a file that matches that, it's going to require this file => `./test/style-mock.js`


## How to test rendering a component using `@testing-library/react`

```js
import React from 'react';
import {render} from '@testing-library/react';
import AutoScalingText from '../AutoSclaingText.js';

test('renders', () => {
  render(<AutoScaligText />)
})
```

## How to use debug method

```js
import React from 'react';
import {render} from '@testing-library/react';
import AutoScalingText from '../AutoSclaingText.js';

test('renders', () => {
  const {debug} = render(<AutoScaligText />);
  debug();
})
```

now if your component has a className which I have written it like this: `className={style.test}`, now if you look at your cosole you'll see that className isn't log into the console, why this happens?

because, we said that our `.css` files would map into the `style-mock.js` which is exporting an empty module, so in our console, the className would be undefined, so how could we resolve this issue, because we will need it in the future,

Do this:

`$. npm i -D identity-obj-proxy`

inside `jest.config.js`

the order inside `moduleNameMapper` is important.

```js
module.exports = {
  testEnvironemnt: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.css$': require.resolve('./test/style-mock.js'),
  }
}
```
