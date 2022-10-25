export function multiply(param1,param2){
  return param1 * param2
}


const calculation = {
  //곱셈
  multiply : (param1,param2) =>{
    return param1 * param2;
  },
  //배열전체 합계
  arraySum : (arr) =>{
    const result = arr.reduce((sum,currValue)=>{
      return (sum + currValue)
    })
    return result;
  },
  //퍼센트
  percent : (parent,child) =>{
    return ((parent / child) * 100).toFixed(2)
  }
}

export default calculation;