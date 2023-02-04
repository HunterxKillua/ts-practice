/* 类装饰器在声明类的时候立即执行 参数为构造函数*/
/* 类方法的装饰器的三个参数分别是当前类的prototype 方法名 描述字段 在类声明完成立即执行 */
function f() {
  console.log("f(): evaluated");
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // console.log("f(): called");
  }
}

function g() {
  console.log("g(): evaluated");
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('*********************')
    console.log(target, propertyKey, descriptor)
    console.log('*********************')
  }
}

function h() {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log(target, propertyKey, descriptor)
  }
  
}

class C {
  @f()
  @g()
  print() {}
}

// const test = new C()

// test.print()

function classDecorator<T extends {new(...args:any[]):{}}>(constructor:T) {
  return class extends constructor {
    newProperty = "new property";
    hello = "override";
  }
}

@classDecorator
class Greeter {
  property = "property";
  hello: string;
  constructor(m: string) {
    this.hello = m;
  }
  @f()
  @g()
  print() {}
}

console.log(new Greeter("world"));

 