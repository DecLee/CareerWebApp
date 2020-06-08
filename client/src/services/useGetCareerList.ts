import { useEffect,useState } from 'react';

export interface career {
  _id?:string;
  title:string;
  description: string;
  prerequisite?:string;
  author:user;
}

export interface user {
  _id: string;
  name:string;
  email:string;
  password?:string;
}

export interface careers {
  results: career[];
}

const useGetCareerList = () => {
  const [result, setResult] = useState<career[] | undefined>([]);

  useEffect(() => {
    fetch('http://localhost:5000/career')
      .then(res => res.json())
      .then(res => setResult(res))
      //.then(res => console.log(res))
      .catch(error => console.log(error));
  }, []);

  return result;
}

export default useGetCareerList;
