const getDeepValue = <Obj extends Record<string, any>, FirstKey extends keyof Obj, SecondKey extends string>(
  obj: Obj,
  first: FirstKey,
  second: SecondKey
): any => {
  if (obj[first][second] !== undefined && obj[first][second] !== null && typeof obj[first][second] !== 'object')
    return obj[first][second]
  else {
    for(const key in obj[first]) {
      if (getDeepValue(obj[first], key, second)) {
        return getDeepValue(obj[first], key, second)
      }
    }
  }
}

type GetDeepValueType<Obj extends Record<string, any>, FirstKey extends keyof Obj, SecondKey extends string> = 
  FirstKey extends keyof Obj ?
    SecondKey extends keyof Obj[FirstKey] ?  Obj[FirstKey][SecondKey]
    : GetDeepValueType<Obj[FirstKey], keyof Obj[FirstKey], SecondKey>
  : never

const obj = {
  a: {
    b: 1,
    c: {
      e: 2,
      f: {
        h: 1,
        i: {
          h: {
            j: '类型编程可是会上瘾的'
          }
        }
      }
    }
  },
  b: {
    c: '2',
    d: '3'
  }
}

const value:GetDeepValueType<typeof obj, 'a', 'j'> = getDeepValue(obj, 'a', 'j')
console.log(value)

const RemoverFromObject = <Key extends string>(Keys: Key[]) => 
  <Obj extends Record<string, string>>(obj: Obj): Omit<Obj, Key> => {
    return {} as any
}

const KeyRemover = RemoverFromObject(["a", "b"])

const newObject = KeyRemover({ a: '1', b: '2', c: '3' })

type eee = never extends any ? true : false