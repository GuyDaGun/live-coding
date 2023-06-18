import { Navigate } from 'react-router-dom';
import Loading from '../components/Loading'
import { RootState } from '../app/store';
import { ReactNode } from 'react';
import { useAppSelector } from '../app/hooks';


const MentorProtectedRoute = ({ children }: {children: ReactNode}) => {
  const { user, userLoading } = useAppSelector((store: RootState) => store.app);
  
  if (userLoading) {
    return <Loading center={true}/>
  }
  
  if (!user) {    
    return <Navigate to='/login' />;
  }
  
  if (!user.isMentor) {
    return <Navigate to='/invalid-link' /> 
  }

  return <>{children}</>;
};

export default MentorProtectedRoute;
