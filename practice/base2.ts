/* 修改联合类型的type */
type User = {
  type: 'user'
} | {
  type: 'comment'
} | {
  type: 'link'
}

type UserType = 'user' | 'comment' | 'link' 

type UnionUser = {
  // 本身就是联合类型的type直接取值然后使用in [Key in User["type"]]
  [Key in User["type"]]: {
    type: Key 
  } & Record<`${Key}Id`, string | number>
}[User["type"]]

type UnionUserType = {
  [Key in UserType]: {
    type: Key
  } & Record<`${Key}Id`, string | number>
}[UserType]

type IsEquals = UnionUser extends UnionUserType ? true : false

const kkk: UnionUser = {
  type: 'user',
  userId: '212'
}
