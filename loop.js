const loop = (n) => {
  if (n < 1) return 0
  if (n === 1) return 1
  return loop(n - 1) + loop(n + 1)
}

const fab2 = (n)=>{
	if(n === 0){
		return 0
	}
	if(n === 1){
		return 1
	}
	let total = 0
	let f1 = 1
	let f2 = 1
	for(let i = 2;i < n;i++){
		total=f1+f2
		f1=f2
		f2=total
	}
	return total
}

const fab3 = (n,f1 = 1,f2 = 1) => {
	if(n === 0){
		return 0
	}
	if(n === 1){
		return 1
	}
	if(n === 2){
		return f2
	}
	return fab3(n-1,f2,f1+f2)
}

console.log(fab3(8))
