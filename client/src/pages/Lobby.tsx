import React, { useState } from 'react';
import Modal from '../components/Modal'
import Styles from '../assets/styles/LoginPage'
import { CodeBlockType } from '../utils/types';
import { RootState } from '../app/store';
import { useAppDispatch, useAppSelector } from '../app/hooks';

function Lobby() {
  const [selectedCodeblock, setSelectedCodeblock] = useState('');
  const { codeblocks, students } = useAppSelector((store: RootState) => store.app);

  const handleCodeblockClick = (cb: CodeBlockType) => {
    setSelectedCodeblock(cb._id);
  };
  
  return (
    <Styles className='full-page'>
    <div className='lobby'>
      <h1>Choose Code block</h1>
      <div>
        {codeblocks.map((cb) => (
          <div key={cb._id}>
            <button
              className='btn btn-block'
              onClick={() => handleCodeblockClick(cb)}
            >
              {cb.title}
            </button>
          </div>
        ))}
      </div>
      <Modal
        selectedCodeblock={selectedCodeblock}
        setSelectedCodeBlock={setSelectedCodeblock}
        students={students}
      />
    </div>
    </Styles>
  );
}

export default Lobby;
