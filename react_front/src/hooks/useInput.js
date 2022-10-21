import {useState} from "react";

function useInput(){
  const [value,setValue] = useState('');
  const onChange = (event) => setValue(event.target.value); 
  
  return { value, setValue, onChange };
}

export default useInput;

