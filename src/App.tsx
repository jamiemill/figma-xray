import React, {useState, SyntheticEvent} from 'react';
import './App.css';

type FileInfo = {
  personalToken:string,
  fileURL:string
};

type Callback = (fileInfo:FileInfo) => void;

type FormProps = {
  callback: Callback
};


function Form(props:FormProps) {
  const [personalToken, setPersonalToken] = useState("");
  const [fileURL, setFileURL] = useState("");

  function handleSubmit(e:SyntheticEvent) {
    e.preventDefault();
    props.callback({personalToken, fileURL})
  }

  return <form onSubmit={handleSubmit}>
    <label>Figma Personal Token
      <input value={personalToken} onChange={e => setPersonalToken(e.target.value)} />
    </label>
    <label>Figma File URL
      <input value={fileURL} onChange={e => setFileURL(e.target.value)} />
    </label>
    <button type="submit">Analyse file</button>
  </form>
}

function App() {
  return (
    <div>
      <Form callback={(fileInfo:FileInfo) => console.log(fileInfo)} />
    </div>
  );
}

export default App;
