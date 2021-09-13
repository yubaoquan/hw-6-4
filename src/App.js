import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
const { ipcRenderer } = window.require('electron');


function App() {

  const [messages, setMessages] = useState([]);
  const [msgContent, setMsgContent] = useState('');

  const handleMsgContentChange = (e) => {
    setMsgContent(e.target.value);
  }

  const handleClick = () => {
    console.info(`发送消息`)
    ipcRenderer.send('msg', msgContent)
    setMsgContent('')
  };

  ipcRenderer.on('msg-main', (ev, data) => {
    console.info(`收到主进程的消息`, data)
    setMessages([...messages, { time: Date.now(), content: data }])
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <input type="text" value={msgContent} onChange={handleMsgContentChange} />
          <button onClick={handleClick}>向主线程发个消息</button>
        </div>

        <div style={{margin: '20px'}}>主进程消息:</div>
        {
          messages.map(msg => {
            return <div key={msg.time}>{msg.content}</div>
          })
        }
      </header>
    </div>
  );
}

export default App;
