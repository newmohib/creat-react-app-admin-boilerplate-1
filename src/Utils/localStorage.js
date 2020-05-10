
export const setLocalStorage=(key,value)=>{
    localStorage.setItem(key,JSON.stringify(value));
}

export const getLocalStorage=(key)=>{
   let value= localStorage.getItem(key);
   value=JSON.parse(value);
   return value;
}

export const deleteLocalStorage=(key)=>{
    localStorage.removeItem(key);
 }