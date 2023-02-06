// 函数柯里化
declare function ToJoinChar<Char extends string>(char: Char): <Args extends string[]>(...parts: Args) => JoinType<Args, Char>
