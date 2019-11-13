type Diff<T, U> = T extends U ? never : T; // Remove types from T that are assignable to U
type Filter<T, U> = T extends U ? T : never; // Remove types from T that are not assignable to U

export type JSONLiteral = string | number | boolean | null | undefined;
export type JSONValue = JSONLiteral | JSONObject | JSONArray;
export type JSONArray = JSONValue[];
export interface JSONObject extends Record<string, JSONValue> {}

export enum ActionType {
  ADD /* 增加 */,
  UPDATE /* 更新 */,
  REMOVE /* 删除 */,
}

export enum DataType {
  LITERAL,
  ARRAY,
  OBJECT,
}

export interface Result {
  root?: boolean;
  level: number;
  old?: JSONValue;
  new?: JSONValue;
  actionType: ActionType;
  dataType: DataType;
  value?: JSONValue;
  result?: Result;
}

export type JSON = Filter<any, JSONValue>;

export interface Options {}

export type DiffFunction = (a: JSON, b: JSON, options?: Options) => Result[];

type T30 = Diff<'a' | 'b' | 'c' | 'd', 'a' | 'c' | 'f'>; // "b" | "d"
type T31 = Filter<'a' | 'b' | 'c' | 'd', 'a' | 'c' | 'f'>; // "a" | "c"
type T32 = Diff<string | number | (() => void), Function>; // string | number
type T33 = Filter<string | number | (() => void), Function>; // () => void

type NonNullable<T> = Diff<T, null | undefined>; // Remove null and undefined from T

type T34 = NonNullable<string | number | undefined>; // string | number
type T35 = NonNullable<string | string[] | null | undefined>; // string | string[]

function f1<T, U>(x: T, y: U) {
  x = y; // Ok
  y = x; // Error
}

function f2<T extends string | undefined>(x: T, y: NonNullable<T>) {
  x = y; // Ok
  y = x; // Error
  const s1: string = x; // Error
  const s2: string = y; // Ok
}

type FunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T];
type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;

type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];
type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

interface Part {
  id: number;
  name: string;
  subparts: Part[];

  updatePart(newName: string): void;
}

type T40 = FunctionPropertyNames<Part>; // "updatePart"
type T41 = NonFunctionPropertyNames<Part>; // "id" | "name" | "subparts"
type T42 = FunctionProperties<Part>; // { updatePart(newName: string): void }
type T43 = NonFunctionProperties<Part>; // { id: number, name: string, subparts: Part[] }

// export interface JSONArray extends Array<JSONValue> {}

const jsonO: JSONObject = {
  sfdf: 'fdf',
};

// declare namespace diff {
//   interface Options {
//     aAnnotation?: string;
//     bAnnotation?: string;
//     expand?: boolean;
//     contextLines?: number;
//   }
// }
//
// // eslint-disable-next-line no-redeclare
// declare function diff(a: any, b: any, options?: diff.Options): string;
//
// export = diff;
