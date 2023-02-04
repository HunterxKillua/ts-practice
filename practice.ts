type obj = {
  aaa_bbb: string;
  bbb_ccc: {
    ccc_ddd: string;
    ddd_eee: string;
    eee_fff: {
        fff_ggg: string;
    }
  }
}

type obj1 = {
  a: {
      b: {
          b1: string
          b2: string
      }
      c: {
          c1: string;
          c2: string;
      }
  },
}

type ToCameCase<Str extends string> = Str extends `${infer F}${infer L}` ? `${Uppercase<F>}${L}` : Uppercase<Str>

type CopyInfo<T extends Record<string, any>> = {
  [Key in keyof T]: T[Key]
}

type Mapping<Obj extends Record<string, any>> =  
  Obj extends any ?
  {
    [Key in keyof Obj 
      as Key extends `${infer First}_${infer Rest}`
          ? `${First}${ToCameCase<Rest>}`
          : Key
    ]: Obj[Key] extends object ? Mapping<Obj[Key]> : Obj[Key] 
  }
  :
  never

type CloneObj = CopyInfo<Mapping<obj>>

type ccc = ToCameCase<'cabd'>

type obj3 = {
  aaa_bbb: string;
  bbb_ccc: [
      {
          ccc_ddd: string;
      },
      {
          ddd_eee: string;
          eee_fff: {
              fff_ggg: string;
          }
      }
  ]
}

type DeepCamelize<Obj extends Record<string, any>> = 
    Obj extends unknown[]
        ? CamelizeArr<Obj>
        : { 
            [Key in keyof Obj 
                as Key extends `${infer First}_${infer Rest}`
                    ? `${First}${Capitalize<Rest>}`
                    : Key
            ] : DeepCamelize<Obj[Key]> 
        };
type CamelizeArr<Arr> = Arr extends [infer First, ...infer Rest]
  ? [DeepCamelize<First>, ...CamelizeArr<Rest>]
  : []

type Deep = DeepCamelize<obj3>

type DeepReadonly<Obj extends Record<string, any>> =
    Obj extends any
        ? {
            readonly [Key in keyof Obj]:
                Obj[Key] extends object
                    ? Obj[Key] extends Function
                        ? Obj[Key] 
                        : DeepReadonly<Obj[Key]>
                    : Obj[Key]
        }
        : never;

type DeepObj = DeepReadonly<obj>

type GetAllPath<T extends Record<string, any>> = {
  [Key in keyof T]: 
    Key extends string ? 
      T[Key] extends Record<string, any> 
        ? `${Key}.${GetAllPath<T[Key]>}`
        : Key
      : never
}[keyof T]

type Paths = GetAllPath<obj1>

type AAA = {
  a: 111
  b: 222
  c: 333
}

type BBB = {
  b: 222
  c: 333
}

type FilterProperty<T extends Record<string, any>> = {
  [Key in keyof T]: 
    Key extends string ? Key
    : never
}[keyof T]

type Defaultize<T extends Record<string, any>, U extends Record<string, any>> = 
  Required<Omit<T, Extract<FilterProperty<T>, FilterProperty<U>>>> & Partial<U>

type Results = CopyInfo<Defaultize<AAA, BBB>>