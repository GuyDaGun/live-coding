import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Styles from '../assets/styles/Error';
import { logoutUserAsync } from '../app/reducers';
import { useAppDispatch } from '../app/hooks';


const NotValid = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    setTimeout(async () => {
      await dispatch(logoutUserAsync());
      navigate('/login');
    },3000);
  })

  return (
    <Styles>
      <div className='error'>
        <h2>Oops!</h2>
        <h5>
          Dear Student, apparently your link is invalid or missing.
          <br />
          please ask your mentor for a new link
        </h5>
      </div>
    </Styles>
  );
};

export default NotValid;
