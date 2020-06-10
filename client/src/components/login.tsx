import React, {useState,useEffect} from 'react';
import useLoginService from '../services/useLoginService';
import {useForm} from 'react-hook-form';

type LoginData = {
  email:string;
  password:string;
}

const Login:React.FC = () => {
  const { register, handleSubmit, errors, setValue } = useForm<LoginData>();
  const [info,setLogin] = useLoginService();

  const onSubmit = handleSubmit((data:LoginData) => {
    setLogin(data);
  });


  return (
      <div>
        <form onSubmit={onSubmit}>
          <label> Email </label>
          <input name='email' ref={register} />
          <label> Password </label>
          <input name='password' ref={register} />
          <input type='submit' />
        </form>
        <div>
          <p> {info.email} </p>
          <p> {info.name} </p>
          <p> {info._id} </p>
        </div>
      </div>
    );

}

export default Login;
