import React, { useEffect, useRef, useState } from 'react';
import Styles from '../assets/styles/Modal'
import { UserType } from '../utils/types';

interface ModalProps {
  setSelectedCodeBlock: (codeBlock: string) => void;
  selectedCodeblock: string;
  students: UserType[];
}

function Modal({ setSelectedCodeBlock ,selectedCodeblock, students }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [selectedStudent, setSelectedStudent] = useState('');
    const [link, setLink] = useState('');
    
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        event.target instanceof HTMLElement &&
        event.target.className !== 'btn btn-block'
      ) {
        setSelectedCodeBlock('');
        setSelectedStudent('');
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
        document.removeEventListener('click', handleClickOutside);
      };

  }, [setSelectedCodeBlock]);

  useEffect(() => {
    const serverUrl = window.location.origin;
    setLink(
      `${serverUrl}/codeblock/${selectedCodeblock}/${selectedStudent}`
    );
  }, [selectedCodeblock, selectedStudent]);

  const handleStudentClick = (student: UserType) => {
    setSelectedStudent(student._id);
  };

  return (
    <Styles>
    <div className={`modal ${selectedCodeblock ? 'visible' : ''}`} ref={modalRef}>
      <div className='modal-content'>
        {!selectedStudent ? (
          <React.Fragment>
            <h2>Choose a Student</h2>
            <div>
              {students.map((student) => (
                <div key={student._id}>
                  <button
                    className='btn btn-block'
                    onClick={() => handleStudentClick(student)}
                  >
                    {student.username}
                  </button>
                </div>
              ))}
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h2>Here is your link, enjoy coding</h2>
            <div>
            <p className='link'>{link}</p>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
    </Styles>
  );
}

export default Modal;
