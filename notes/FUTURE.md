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

## Exercise 05/06 - Discriminated Unions

You can create a union type that has one common element with different values (e.g a key in a object called "type") to "discriminate" between them.
Typescript than then use that common element to determine when you can access other values
Example:

```
export type Event =
  | {
      type: "click";
      event: MouseEvent;
      clickName: "click name";
    }
  | {
      type: "focus";
      event: FocusEvent;
      focusName: "focus name";
    }
  | {
      type: "keydown";
      event: KeyboardEvent;
      keydownName: "keydown name";
    };

const getUnion = (result: Event) => {
  if (result.type == "click") {
    console.log(result.clickName)
  }
}
```

If I rewrote my getUnion function to try to access a value in a object, I would get a type error:

```
const getUnion = (result: Event) => {
  if (result.type == "click") {
    console.log(result.focusName) // this would be a type error
  }
}
```

## Exercise 09 - Discriminated Unions Continued

If you have a discriminated union type with a common element, you can extract a union type of its values by doing the below:

```
export type Event =
  | {
      type: "click";
      event: MouseEvent;
    }
  | {
      type: "focus";
      event: FocusEvent;
    }
  | {
      type: "keydown";
      event: KeyboardEvent;
    };

type EventType = Event["type"];

type tests = [Expect<Equal<EventType, "click" | "focus" | "keydown">>];
```

## Exercise 10 - `as const`

`as const` seems like a useful thing to use in the future, google it later.
Essentially it seems to turn a const into a read-only variable with typescript, which allows you to use their literal values as types.

```
export const programModeEnumMap = {
  GROUP: "group",
  ANNOUNCEMENT: "announcement",
}

type GroupProgram = typeof programModeEnumMap["GROUP"] // this type would resolve to "string"
```

```
export const programModeEnumMap = {
  GROUP: "group",
  ANNOUNCEMENT: "announcement",
} as const;

type GroupProgram = typeof programModeEnumMap["GROUP"] // this type would resolve to "group"
```

## Exercise 13 - Create Unions out of Array Values

You can use `number` to access all values of an array to use how you wish, below I use it to create a string union out of the array's values:

```
const fruits = ["apple", "banana", "orange"] as const;

type Fruit = typeof fruits[number]; // this resolves to: "apple" | "banana" | "orange
```
