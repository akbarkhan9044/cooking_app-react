import {useState,useEffect} from 'react'
export const useFetch=(url,method="GET") =>{
    const [data,setData] = useState(null)
    const [pending,setPending] = useState(false)
    const [error,setError] = useState(null)
    const [options,setOptions] = useState(null)

  console.log(data)

const postData = (postData) =>{
 setOptions({
     method: 'POST',
     headers:{
         "Content-Type": "application/json"
     },
     body: JSON.stringify(postData)
 })
}
   
    useEffect(()=>{
      
        const  controller = new AbortController()
     const fetchData = async(fetchOptions) => {
         setPending(true)
         try{
         const res = await fetch(url, {
           ...fetchOptions,
           signal: controller.signal,
         });
         if(!res.ok)
         {
            throw new Error(res.statusText)
         }
         const json = await res.json()
         setPending(false)
         setData(json)
         setError(null)
         
         }catch(err){
             if(err.name === 'AbortError')
             {
                 console.log('Fetch was aborted');
                 setPending(false)
             }
             else
             { setPending(false);
             setError("Couldn't fetch data");
             console.log(err.message);

             }
         
         }
     }
     if(method === "GET")
     {
          fetchData()
     }
     if(method === "POST" && options)
     {
         fetchData(options)
     } 

     return ()=>{
     controller.abort()
     }
    },[url,options,method]);
    return { data: data, pending, error, postData };
}


 