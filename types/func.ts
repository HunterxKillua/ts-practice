// 函数柯里化
declare function ToJoinChar<Char extends string>(char: Char): <Args extends string[]>(...parts: Args) => JoinType<Args, Char>


interface Bar {
  _bar: string
}

interface Foo {
  _foo: string
}

let foo: Foo
let bar: Bar

type ddd = Foo extends Bar ? true : false

// 由子集延伸为父集 则称之为协变
// 由父集逆变为子集 则称之为逆变
// 需要开启strictFunctionTypes 否则默认双向协变 不安全

// 函数的参数会默认遵循逆变
// 举个例子:
interface Person {
 name: string
 age: number
}
interface Student {
 name: string
 age: number
 parent: string
}
interface StudentA {
  name: string
  age: number
  parent: string
  rank: number
}

const p:Person = {
  name: '1',
  age: 27
}
const s:Student = {
  name: '11',
  age: 14,
  parent: ''
}

type abs = Student extends Person ? true : false
type abss = StudentA extends Student ? true : false
type absss = Person extends Student ? true : false

// 生成一个参数类型为Student 返回类型为Student的方法

type GetStudentName = (s: Student) => Student

const testName: GetStudentName = (s: Person): Student => {
  return {
    name: '1',
    age: 2,
    parent: ''
  }
}

/*
  ts确认父子继承关系是通过结构一致性的, 并不是通过extends继承
*/