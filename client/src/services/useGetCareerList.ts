import { useEffect,useState } from 'react';

export interface career {
  _id?:string;
  title:string;
  description: string;
  prerequisite?:string;
  author:string;
}

export interface careers {
  results: career[];
}

const useGetCareerList = () => {
  const [result, setResult] = useState<careers>();

  useEffect(() => {
    fetch('http://localhost:5000/career',
    {
      method:"GET"
    })
      .then(res => res.json())
      .then(res => setResult(res))
      //.then(res => console.log(res))
      .catch(error => console.log(error));
  }, []);

  return result;
}

export default useGetCareerList;
