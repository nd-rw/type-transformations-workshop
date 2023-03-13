import { Equal, Expect } from "../helpers/type-utils";

const myFunc = () => {
  return "hello";
};

type MyFuncReturn = ReturnType<typeof myFunc>;

type tests = [Expect<Equal<MyFuncReturn, string>>];
