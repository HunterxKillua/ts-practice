type Mutable<T> = {
  -readonly [Key in keyof T]: T[Key]
}

type MergeArr<arr extends Array<any>, list extends Array<any>> =
  arr extends [infer OneFirst, ...infer OneLast] ?
    list extends [infer OtherFirst, ...infer OtherLast] ?
      [[OneFirst, OtherFirst], ...MergeArr<OneLast, OtherLast>] 
      : [] 
    : []

export function zip<Target extends readonly any[], Source extends readonly any[]>(
  target: Target,
  source: Source
): MergeArr<Mutable<Target>, Mutable<Source>>

export function zip(target: any[], source: any[]) {
  if (!target.length || !source.length) {
    return []
  }
  const [one, ...ret1] = target
  const [other, ...ret2] = source
  return [[one, other], ...zip(ret1, ret2)]
}

const result = zip([1, 2, 3] as const, [4, 5, 6] as const)

const response = zip([1, '2', 3] as const, [4, '5', 6] as const)

console.log(result, response);

type Data = {
  a?: number
  b: {
    a: string
    c: boolean
  }
}

type DeepRecord<O extends Record<string, any>> = {
  [Key in keyof O]: 
    O[Key] extends Record<string, any> ?
      DeepRecord<O[Key]> & Record<string, any>
      : O[Key]
} & Record<string, any>

const rep: DeepRecord<Data> = {
  a: 1,
  c: true,
  b: {
    c: false,
    a: '123',
    test: true,
  },
  test: '123'
}

const print = (data: DeepRecord<Data>) => {
  if (data.b.test as boolean) {
    console.log('类型验证成功')
  } else {
    console.log('类型验证失败')
  }
}

print(rep);

type a = 'desc' | 'aes' | false

type GenerateValue<Keys extends string> = {
  [Key in Keys]: {
    [Key2 in Key]: 'desc' | 'asc'
  } & {
    [key3 in Exclude<Keys, Key>]: false
  }
}[Keys]

type UnionType = GenerateValue<'a' | 'b' | 'c'>


type Obj = {
  a: number
  b: string
  c: boolean
  [key: string]: any
}

const obj_satisfies = {
  a: 1,
  b: '1',
  c: false,
  d: 1
} satisfies Obj;




