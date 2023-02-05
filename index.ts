type isTwo<T> = T extends 2 ? true : false

type res = isTwo<1>

type res1 = isTwo<2>

type StrReplace<Str extends string, From extends string, To extends string> = Str extends `${infer Prefix}${From}${infer Suffix}` ? `${Prefix}${To}${Suffix}` : Str

type str = StrReplace<'ts is super class of ?', '?', 'js'>

type GetParameter<Func extends Function> = Func extends (...args: infer Args) => unknown ? Args : never

type func = GetParameter<(name: string, age: string) => void>

type GetReturnType<Func extends Function> = Func extends (...args: any[]) => infer ReturnType ? ReturnType : never

type rFunc = GetReturnType<() => void>

interface Machines {
  name: string
}

class Animal {
  public name: string = 'test'
  constructor() {
  }
  getName(this: Machines) {
    return this.name
  }
}

const animal = new Animal()

console.log(animal.getName.call({ name: '1' }))

type tuple1 = [1, '2']
type tuple2 = ['ts', 'js']

type Zip<One extends unknown[], Other extends unknown[]> = 
  One extends [infer OneFirst, infer Last] 
    ? Other extends [infer OtherFirst, infer OtherLast] 
      ? [[OneFirst, OtherFirst], [Last, OtherLast]] 
      : [] 
    : []

type ZipInstance = Zip<tuple1, tuple2>

type Zip2<One extends unknown[], Other extends unknown[]> = 
  One extends [infer OneFirst, ...infer OneRest]
    ? Other extends [infer OtherFirst, ...infer OtherRest]
      ? [[OneFirst, OtherFirst], ...Zip2<OneRest, OtherRest>]: []
        : [];
        
type DropSubStr<Str extends string, SubStr extends string> =
  Str extends `${infer prefix}${SubStr}${infer Suffix}`
    ? DropSubStr<`${prefix}${Suffix}`, SubStr>
    : Str

type DropSubStr2<Str extends string, SubStr extends string> = 
  Str extends `${infer Prefix}${SubStr}${infer Suffix}` 
    ? DropSubStr<`${Prefix}${Suffix}`, SubStr> : Str;

type DropStr = DropSubStr<'?a?v?b?', '?'>

interface CustomConfig {
  [propName: string]: any
}

type Mappings<T extends object> = {
  [key in keyof T as Uppercase<key & string>]: [key, T[key]]
}

type Filterss<T extends object> = {
  [key in keyof T]: key
}

type results = Mapping<{ a: 1, b: 'ts' }>

const res2:object = { c: 2, d: false, f: 'abc' }

function getResponse<T>(config: T): T {
  return config
}

const a = getResponse(res2)

type P<T extends string | number, S> = { [N in T] : S}

type G = Record<string, any>

type B = P<'a', 1>

type F<T> = T extends G ? true : false

const c:F<{ a: '2' }> = true

type IsEquals<A, B> = (A extends B ? true : false) & (B extends A ? true : false);

const account:IsEquals<1, 1> = true

type BuildArray<
  Len extends number,
  Ele extends unknown = '',
  Result extends unknown[] = []
> = Result['length'] extends Len ? Result :  BuildArray<Len, Element, [...Result, Ele]>

type Add<
  Number1 extends number,
  Number2 extends number,
> = [...BuildArray<Number1>, ...BuildArray<Number2>]['length']

type Subtract<Num1 extends number, Num2 extends number> = 
    BuildArray<Num1> extends [...arr1: BuildArray<Num2>, ...arr2: infer Rest]
        ? Rest['length']
        : never;

type counter = Subtract<222, 33>

type IsUnionMs<A, B = A> = A extends A ? 
  [B] extends [A] ? false : true
  : never 

type TestUnion = IsUnionM<['a' | 'b' | 'c' | 'd']>

type Mock = 1 & any

type GetParams<str extends string> = 
  str extends `${infer Param}&${infer Rest}` ? 
    MergeParam<ParseParam<Param>, MergeParam<GetParams<Rest>>>
  : ParseParam<str>

type ParseParam<str extends string> = str extends `${infer Param}=${infer Rest}` ? { [key in Param]: Rest } : {}

type MergeParam<Obj extends Record<string, any>, OtherObj extends Record<string, any> = {}> = {
  [Key in keyof Obj | keyof OtherObj]: 
    Key extends keyof Obj ? 
      Obj[Key] 
        // Key extends keyof OtherObj ? MergeValue<Obj[Key], OtherObj[Key]> : Obj[Key] 
      : Key extends keyof OtherObj ? OtherObj[Key] 
    : never
}

type QueryParams = GetParams<'a=1&b=2&c=3'>

type Test<Obj extends object> = {
  [key in keyof Obj]: Obj[key]
}

type dto = Test<{b: 1}>

type GetIndex<Obj extends Record<string, any>> = Obj[keyof Obj]

type UnionByObj = GetIndex<{ a: 1, b: '2' }>