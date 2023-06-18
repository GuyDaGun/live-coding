import React, { useState,useEffect } from 'react';
import FormRow from '../components/FormRow';
import {useNavigate} from 'react-router-dom';
import Alert from '../components/Alert';
import Styles from '../assets/styles/LoginPage'
import { RootState } from '../app/store';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { clearAlert, displayAlert } from '../app/slices/appSlice';
import { loginUserAsync } from '../app/reducers';

const initialState = {
  username: '',
  password: '',
};

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const dispatch = useAppDispatch();
  
  const {
    user,
    isLoading,
    showAlert,
    params,
  } = useAppSelector((store: RootState) => store.app);
  
  const {studentId ,codeblockId} = params;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { username, password } = values;
    
    if (!username || !password ) {
      dispatch(displayAlert('Please Provide All Values'));
      
      setTimeout(() => {
        dispatch(clearAlert())
      },3000);

      return;
    }

    const currentUser = {username, password};
    
    dispatch(loginUserAsync({
      currentUser,
      alertText:'Login Successful! redirecting...',
    }));
    
    setTimeout(() => {
      dispatch(clearAlert())
    },3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        if (user.isMentor) {
          navigate('/');
        } else if ((codeblockId && studentId) && user._id === studentId){
            navigate(`/codeblock/${codeblockId}/${studentId}`);
        } else {
          navigate('/invalid-link');
        }
      }, 3000);
    }
  }, [user, navigate, codeblockId, studentId]);


  return (
    <Styles className='full-page'>
    <div className='login-page'>
      <form className='form' onSubmit={handleSubmit}>
        <h3>Login</h3>
        {showAlert && <Alert />}
        <FormRow
          type='text'
          name='username'
          value={values.username}
          handleChange={handleChange}
        />
        <FormRow
          type='password'
          name='password'
          value={values.password}
          handleChange={handleChange}
        />
        <button className='btn btn-block' type='submit' disabled={isLoading}>Login</button>
      </form>
    </div>
    </Styles>
  );
}

export default Login;
