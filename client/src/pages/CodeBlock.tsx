import { useEffect, useRef, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {io} from 'socket.io-client';
import CryptoJS from 'crypto-js';
import { CodeBlockType, UserType } from '../utils/types';
import { RootState } from '../app/store';
import { useAppSelector } from '../app/hooks';


const serverUrl = window.location.origin;
const socket = io(`${serverUrl}`);


function CodeBlock() {
  const [input, setInput] = useState('');
  const { user, students, codeblocks, params } = useAppSelector((store: RootState) => store.app);
  const { studentId, codeblockId } = params;
  
  const codeblock: CodeBlockType | undefined = codeblocks.find((cb: CodeBlockType) => cb._id === codeblockId);
  const student: UserType | undefined = students.find((student: UserType) => student._id === studentId);
  
  const roomIdRef = useRef('');

  const createRoomId = (studentId: string, codeblockId: string) => {
    const concatenatedIds = `${studentId}${codeblockId}`;
    const hash = CryptoJS.MD5(concatenatedIds).toString();
    return hash;
  };

  const updateInput = (newInput: string) => {
    setInput(newInput);
    checkSolution();
    socket.emit('send-message', { message: newInput, roomId: roomIdRef.current });
  };

  const solution = 'this is just a test';
  const checkSolution = () => {
    if (input === solution) {
      alert('WOW YOU WON!!');
    }
  };


  useEffect(() => {
    roomIdRef.current = createRoomId(studentId, codeblockId);

    socket.emit('join_room', roomIdRef.current);

    socket.on('receive_message', (data: any) => {
      setInput(data.message);
    });

    socket.on('room_joined', (roomId: string) => {
      console.log(`Joined room: ${roomId}`);
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);

  return (
    <div className='code-block'>
      <h1>{codeblock?.title}</h1>
      <h4>Student: {student?.username}</h4>
      <div className='code-block-content'>
        {!user?.isMentor && (
          <textarea
            name=''
            id=''
            cols={100}
            rows={50}
            value={input}
            onChange={(e) => updateInput(e.target.value)}
          />
        )}
        <div
          className={
            user?.isMentor
              ? 'syntax-highlighter-container mentor'
              : 'syntax-highlighter-container'
          }
        >
          <SyntaxHighlighter
            language='javascript'
            style={atomDark}
            customStyle={{ width: '100%', height: '100%' }}
          >
            {input}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}

export default CodeBlock;
