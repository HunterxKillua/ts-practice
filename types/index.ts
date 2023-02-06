type IsEqual<A, B> = 
  (A extends B ? true : false) 
  & (B extends A ? true : false);

type IsArrayIndex<T extends unknown> = {
  [Key in keyof T]:
    Key extends number 
    ? true
    : never
}
type IsArray<T extends unknown> = 
  IsArrayIndex<T> extends boolean[] ? true : false
type NotArrayExtendsObject<T extends unknown> = 
  IsArray<T> extends false 
    ? T extends object
      ? true
      : false
    : false

type StringReplaceChar<Str extends string, From extends string, To extends string> = 
  Str extends `${infer Prefix}${From}${infer Suffix}` 
    ? StrLen<Prefix> extends 0
      ? `${To}${StringReplaceChar<Suffix, From, To>}`
      : `${Prefix}${To}${StringReplaceChar<Suffix, From, To>}`
    : Str;

type StringDropChar<Str extends string, Char extends string> =
  Str extends `${infer Prefix}${Char}${infer Rest}` 
    ? StrLen<Prefix> extends 0 
      ? StringDropChar<Rest, Char>
      : `${Prefix}${StringDropChar<Rest, Char>}`
    : Str

type StrLen<
    Str extends string,
    CountArr extends unknown[] = []
> = Str extends `${string}${infer Rest}`
    ? StrLen<Rest, [...CountArr, unknown]>
    : CountArr["length"]

type IsUnion<A, B = A> =
  A extends A ?
    [B] extends [B]
      ? true
      : false
    : never

type UnionToType<T extends string, U extends unknown = ''> = 
  IsUnion<T> extends true 
    ? { [Key in T] : U }
    : never
    
type RecordToUnion<T extends Record<string, any>> = keyof T

type GetQueryByUrl<T extends string> =
  T extends `${infer _}?${infer Param}`
  ? ParseUrl<Param>
  : Record<string, any>

type ParseUrl<T extends string> =
  T extends `${infer P}&${infer Ret}`
  ? MergeParam<ParseUrl<Ret> ,ParseParam<P>> 
  : MergeParam<ParseParam<T>>

type ParseParam<S extends string> = 
  S extends `${infer Key}=${infer Val}`
  ? { [k in Key]: Val }
  : Record<string, any>

type MergeParam<T extends Record<string, any>, Result extends Record<string, any> = {}> =
  {
    [Key in keyof T | keyof Result]:
      Key extends keyof Result
      ? Key extends keyof T
        ? T[Key]
        : Result[Key]
      : Key extends keyof T 
        ? T[Key]
        : never
  }

type ToPartialRecordByKey<U extends Record<string, any>, Key extends string> = 
  Partial<Pick<U, Key>> & Omit<U, Key>  

type ToComputed<T extends Record<string, any>> = {
  [Key in keyof T]: T[Key]
}

type RemoveFirstDelimiter<
    Str extends string
> = Str extends `${infer _}${infer Rest}`
        ? Rest
        : Str;

type JoinType<Args extends any[], Char extends string, Result extends string = ''> = 
Args extends [infer Curr, ...infer Rest] ? JoinType<Rest, Char, `${Result}${Char}${Curr & string}`>
  : RemoveFirstDelimiter<Result>
