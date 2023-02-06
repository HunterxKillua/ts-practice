// 判断俩个值的类型或者引用值是否相等
function CheckEqualValue<U, T>(val: U, value: T): IsEqual<U, T>;
function CheckEqualValue(val: any, value: any) {
  if (typeof val === typeof value)
    return JSON.stringify(val) === JSON.stringify(value)
  else
    return false
}
 
// 替换字符串
function ReplaceOnString<S extends string, F extends string, T extends string>(source: S, from: F, to: T): StringReplaceChar<S, F, T>;
function ReplaceOnString(source: string, from: string, to: string) {
  if (!source.length)
    return ''
  if (!from.length)
    return source
  const [first, ...last] = source
  if (first === from)
    return `${to}${ReplaceOnString(last.join(''), from, to)}`
  else 
    return `${first}${ReplaceOnString(last.join(''), from, to)}`
}

// 删除字符
function DropCharOnString<S extends string, C extends string>(str: S, char: C): StringDropChar<S, C>;
function DropCharOnString(str: string, char: string) {
  if (!str.length) 
    return ''
  if (!char.length)
    return str
  const [first, ...last] = str
  if (first === char)
    return `${DropCharOnString(last.join(''), char)}`
  else 
    return `${first}${DropCharOnString(last.join(''), char)}`
}
// 获取url字符串
function GetQueryParams<T extends string>(url: string): GetQueryByUrl<T>
function GetQueryParams<T extends string>(query: string): ParseUrl<T>
function GetQueryParams(url: string) {
  if (!url.length) {
    return {};
  }
  let param;
  const res:Record<string, any> = {};
  if (url.includes('?')) {
    const [, query] = url.split('?');
    param = query.split('&');
  } else {
    param = url.split('&');
  }
  param.forEach((ele: string) => {
    const [key, value] = ele.split('=');
    res[key] = value
  })
  return res
}