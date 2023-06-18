import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import { ReactNode, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { setParamsAsync } from '../app/reducers';
import { useAppDispatch } from '../app/hooks';

const ProtectedRoute = ({ children }: {children: ReactNode}) => {
  const { user, userLoading} = useSelector((store: RootState) => store.app);
  const { studentId, codeblockId } = useParams();
  const [paramsSet, setParamsSet] = useState(false); // Track completion of setParams
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const setParams = async () => {
      if (studentId && codeblockId) {
        await dispatch(setParamsAsync({studentId, codeblockId}));
        setParamsSet(true);
      }
    };
    setParams();
  }, [studentId, codeblockId]);
  
  if (userLoading || !paramsSet) {
    return <Loading center={true}/>;
  }

  if (!user) {
    navigate('/');
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
