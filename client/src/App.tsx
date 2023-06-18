import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Lobby, Login, NotFound, CodeBlock, ProtectedRoute, MentorProtectedRoute, NotValid } from './pages';
import { useEffect } from 'react';
import { useAppDispatch } from './app/hooks';
import { getAllStudentsAsync, getCodeblocksAsync, getCurrentUserAsync } from './app/reducers';


function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const initApp = async () => {
      await dispatch(getCurrentUserAsync());
      await dispatch(getCodeblocksAsync());
      await dispatch(getAllStudentsAsync());
    }
    initApp();
  },[]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <MentorProtectedRoute>
              <Lobby />
            </MentorProtectedRoute>
          }
        />
        <Route
          path='/codeblock/:codeblockId/:studentId'
          element={
            <ProtectedRoute>
              <CodeBlock />
            </ProtectedRoute>
          }
        />
        <Route path='/login' element={<Login />} />
        <Route path='/invalid-link' element={<NotValid />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
