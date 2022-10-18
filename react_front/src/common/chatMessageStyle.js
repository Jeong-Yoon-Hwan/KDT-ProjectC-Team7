

const messageStyle = (element,typeCompare,compareValue) =>{
  if(typeCompare === compareValue){
    element.style.backgroundColor="#F2DA46";
    element.style.borderRadius="20px 20px 0px";
  }else{
    element.style.backgroundColor="#4BDB87";
    element.style.alignSelf="start";
    element.style.borderRadius="0px 20px 20px 20px";
  }
  element.style.width="max-content";
  element.style.maxWidth="200px";
  element.style.height="max-content";
  element.style.display="flex";
  element.style.flexDirection="column";
  element.style.justifyContent="end";
  element.style.alignItems="center";
  element.style.fontWeight="bold";
  element.style.fontSize="14px";
  element.style.wordBreak="break-all";
  element.style.padding="10px";
  element.style.margin="10px";
}

export default messageStyle;