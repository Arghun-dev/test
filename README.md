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
