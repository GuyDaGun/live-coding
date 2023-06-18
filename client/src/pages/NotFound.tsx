import { useNavigate } from 'react-router-dom';
import Styles from '../assets/styles/Error';

const NotFound = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    return navigate('/');
  };

  return (
    <Styles>
      <div className='error'>
        <h2>Ohh! Page Not Found</h2>
        <p>We can't seem to find the page you're looking for</p>
        <button className='btn' onClick={handleClick}>
          Back Home
        </button>
      </div>
    </Styles>
  );
};

export default NotFound;
