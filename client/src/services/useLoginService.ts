import { useEffect,useState } from 'react';


export interface loginDto {
  email:string;
  password:string;
}

export interface userDto {
  name?: string;
  email: string;
  password?: string;
}

const useLoginService = ()=> {
  const [info, setInfo] = useState<any | undefined>({
    email:'',
    password:'',
  });
  const [output, setOutput] = useState<any | undefined>({
    email:'',
    password:'',
    name:''
  });

  useEffect(() => {
    //console.log(info);
    const requestOption = {
      method: 'POST',
      headers: {'Content-Type': 'application/json;charset=utf-8'},
      body: JSON.stringify(info)
    };
    fetch('http://localhost:5000/auth/login', requestOption)
      .then(res => res.json())
      //.then(res => console.log(res));
      .then(res => setOutput(res));
  },[info]);

  return [output,setInfo];
}

export default useLoginService;
