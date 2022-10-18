

const messageStyle = (main,chat,name,typeCompare,compareValue) =>{
  if(typeCompare === compareValue){
    chat.style.backgroundColor="#F2DA46";
    chat.style.borderRadius="20px 20px 0px";
    
    main.style.justifyContent="start";

    name.style.display="none";

  }else{
    chat.style.backgroundColor="#4BDB87";
    chat.style.borderRadius="0px 20px 20px 20px";
    
    main.style.justifyContent="end";
    main.style.alignSelf="start";

    name.style.display="flex";
    name.style.justifyContent="start";
    
  }

  name.style.padding="5px";  

  chat.style.width="max-content";
  chat.style.maxWidth="200px";
  chat.style.height="max-content";
  chat.style.padding="10px";
  chat.style.wordBreak="break-all";
  chat.style.fontSize="14px";
  chat.style.fontWeight="bold";

  main.style.display="flex";
  main.style.margin="10px";
  main.style.flexDirection="column";
  
  

 
}

export default messageStyle;