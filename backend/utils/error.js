
//utility function to create and return a custom error object
export  const error=(statusCode,message)=>{
   const error = new Error();
   error.statusCode = statusCode;
   error.message  = message;
   return error;
}