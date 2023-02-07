/* 联合类型与交叉类型的互转 */
/* 在将非联合类型转换成联合类型是需要使用柯里化 */
type SingleFruit = {
  apple: number
} | {
  banana: number
} | {
  type: string
}

const fruitCount = {
  apple: 1,
  banana: 2,
  type: 'fruit'
}

type IsUnionM<A, B = A> = A extends A ? 
  [B] extends [A] ? false : true
  : never

type FilterUnionObj<T> = {
  [Key in keyof T]: T[Key]
}

type unionType = FilterUnionObj<{ a: string, b: number }>


type ToUnionFunc<U> = U extends any ? (arg: U) => void : never

type FuncUnion<T> = ToUnionFunc<T> extends (arg: infer T) =>void ? T : never

type UnionToRequired<U> = FuncUnion<U>

type mmm = UnionToRequired<SingleFruit>

const fruits:nnn = {
  apple: 1,
  banana: 2,
  type: 'haha'
}

type nnn = FilterUnionObj<typeof fruitCount>

type ffff<T> =
  T extends Record<string, any> ? {
    [Key in keyof T] : {
      [K in Key]: T[Key]
    } & Record<`${Key & string}Price`, number>
  }[keyof T] : never

type dddd = ffff<nnn>

const fruitOrder:dddd = {
  apple: 12,
  applePrice: 2
}