const toDo = (time: Date, id: number | string): void => {
  console.log(time, id)
}

type Params = Parameters<typeof toDo>
type Result = ReturnType<typeof toDo>

interface Student {
  name: string
  age: string
}

interface Teacher {
  name: string
  married: boolean
}

type ReadOnlyStudent = Required<Partial<Student>>

type Filters = Pick<{ age: 26, sex: 'man' }, 'age'>
type Remained = Omit<{ age: 26, sex: 'man'}, 'age'> 

type emo = 'a' | 'b' | 'c' | 'd' | 'e' | 'f'
/* 二者都是通过extends去判断的 */
type FilterEmo = Exclude<emo, 'a' | 'd' >
type ClassEmo = Extract<emo, 'a' | 'g'>
type School = Extract<Student, Teacher>
type part = Teacher extends Student ? true : false

type PartialObjectPropByKeys<Obj extends Record<string, any>, Key extends keyof any> = Partial<Pick<Obj, Extract<keyof Obj, Key>>> & Omit<Obj, Key>
type Copy<T extends Record<string, any>> = {
  [Key in keyof T]: T[Key]
}

type CopyType<T> = T

type result = Copy<PartialObjectPropByKeys<{ age: string, name: string, sex: boolean }, 'age' | 'name'>>

// const Obj = {
//   a: 1,
//   b: '2'
// } as const

declare function func(name: string):void
declare function func(age: number):void

interface Func {
  (name: string): void
  (sex: boolean): void
}

declare const func2: Func

type RemoveFirstDelimiter<
    Str extends string
> = Str extends `${infer _}${infer Rest}`
        ? Rest
        : Str;

type JoinType<Items extends any[], Char extends string, Result extends string = ''> = 
  Items extends [infer Curr, ...infer Rest] ? JoinType<Rest, Char, `${Result}${Char}${Curr & string}`>
  : RemoveFirstDelimiter<Result>

declare function join<Char extends string>(char: Char): <Items extends string[]>(...parts: Items) => JoinType<Items, Char>

let res = join('-')('haha', 'hehe')
