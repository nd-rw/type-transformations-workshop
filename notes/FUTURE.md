## Things to add

- Get function parameters, get function return type
- Extract, Exclude
- Awaited
- Union to tuple
- Distributive Conditional Types

## Exercise 01 "Get the Return Type of a Function"

You can extract the implicit return type of the function by using the utility type `ReturnType<>` and `typeof`.. eg:

```
const myFunc = () => {
  return "hello";
};

/**
 * How do we extract MyFuncReturn from myFunc?
 */
type MyFuncReturn = ReturnType<typeof myFunc>;
```

If I changed `myFunc` to return a different type of value (e.g `return 5;`), MyFuncReturn would automatically resolve to "number".

## Exercise 02 - "Function Parameters"

Using `Parameters<>` and `typeof` you can extract the parameters of a function into a type, e.g:

```
const myFunc = (a: number, b: number) => {
  return a + b;
};

type MyFuncParametersType = Parameters<typeof myFunc>;

```

MyFuncParametersType would resolve to `[a: number, b: number]`.

If we wanted the type of one of the specific parameters (e.g the second parameter from myFunc) you can access it from its index like this:

```
type MyFuncSecondParameterType = MyFuncParametersType[1];
```

## Exercise 04 - "Object Keys as an Type"

```
const testingFrameworksObj = {
  vitest: 1
  jest: 2
  mocha: 3
};

type TestingFrameworks = keyof typeof testingFrameworksObj;
```

`keyof` with `typeof` (and then an object), will return a string union of the keys of that object.

`keyof` cannot be used directly on an object, it only works on types; hence why in the example above the syntax is `keyof typeof testingFrameworksObj`.

`key` can also be used on an already existing type like this:

```
const testingFrameworksObj = {
  vitest: 1
  jest: 2
  mocha: 3
};

type TestingFrameworksType = typeof testingFrameworksObj;
type TestingFrameworkKeys = keyof TestingFrameworksType
```
