import React, {useState, useEffect} from 'react';
import useGetCareerList from '../services/useGetCareerList';

const Careers:React.FC = () => {
  const careers = useGetCareerList();
  //const [post, setPost] = React.useState();

  return (
    <ul>
    {
      careers.map(career => (
        <li key={career._id}>
          <h1> {career.title} </h1>
          <p> {career.description} </p>
          <p> {career.author.name} </p>
          <p> {career.author.email} </p>
        </li>
      ))
    }
    </ul>
  )

  /*const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/career')
      .then(res => res.json())
      .then(res => setData(res))
      .catch(error => console.log(error));
  }, []);

  return (
    <ul>
      {data.map(item => (
          <li key={item._id}>
            <h1>{item.title}</h1>
            <p>{item.description}</p>
            <p>{item.author.email}</p>
            <p>{item.author.name}</p>
          </li>
      ))}
    </ul>
  );*/
}

export default Careers;
