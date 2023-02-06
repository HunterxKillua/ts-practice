// 去除_并转换成大驼峰
const data41 = {
  aa_bb_cc: '',
  bb_cc: {
    cc_ddd: '',
    dd_eee: 1,
    ee_fff: {
      ff_ggg: true,
      gg_hhh: [1, '23']
    }
  },
}

type type41 = {
  aaa_bb: string;
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

type type42 = {
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

type CameCaseString<S extends string, C extends string = '_'> =
  StrLen<C> extends 0
    ? DefaultCameCase<S>
    : S extends `${infer First}${C}${infer Ret}`
      ? First extends `${infer F}${infer Rest}`
        ? `${Uppercase<F>}${Rest}${CameCaseString<Ret>}`
        : `${Uppercase<First>}${CameCaseString<Ret>}`
      : DefaultCameCase<S>

type DefaultCameCase<T extends string> = 
  T extends `${infer First}${infer Ret}`
  ? `${Uppercase<First>}${Ret}`
  : Uppercase<T>
  
type ToCameCase<U extends Record<string, any>> =
  U extends any ? // 触发计算
  {
    [Key in keyof U 
      as Key extends string 
        ? CameCaseString<Key> 
        : never 
    ]: NotArrayExtendsObject<U[Key]> extends true
      ? ToCameCase<U[Key]>
      : U[Key]
  }
  : never

type ooo = ToComputed<ToCameCase<typeof data41>>

type DeepCamelize<Obj extends Record<string, any>> = // 递归数组
    Obj extends unknown[]
        ? CamelizeArr<Obj>
        : { 
            [Key in keyof Obj 
                as Key extends `${infer First}_${infer Rest}`
                    ? `${First}${Capitalize<Rest>}`
                    : Key
            ] : DeepCamelize<Obj[Key]> 
        };
type CamelizeArr<Arr> = Arr extends [infer First extends Record<string, any>, ...infer Rest]
  ? [DeepCamelize<First>, ...CamelizeArr<Rest>]
  : []

type Deep = DeepCamelize<type41>


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

type DeepObj = DeepReadonly<typeof data41>
type DeepObjs = Readonly<typeof data41>

type GetAllPath<T extends Record<string, any>> = {
  [Key in keyof T]: 
    Key extends string ? 
      T[Key] extends Record<string, any> 
        ? `${Key}.${GetAllPath<T[Key]>}`
        : Key
      : never
}[keyof T]

type Paths = GetAllPath<type42>

type FilterProperty<T extends Record<string, any>> = {
  [Key in keyof T]: 
    Key extends string ? Key
    : never
}[keyof T]

type Defaultize<T extends Record<string, any>, U extends Record<string, any>> = 
  Required<Omit<T, Extract<FilterProperty<T>, FilterProperty<U>>>> & Partial<U>
