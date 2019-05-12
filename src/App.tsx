import React, {useState} from 'react';
import './App.css';
import Form, {FileInfo} from "./Form";
import Report from "./Report";

function App() {
  const [fileInfo, setFileInfo] = useState<FileInfo>(null);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [fileData, setFileData] = useState(null);

  function handleFileInfoChange(fileInfo:FileInfo) {
    setFileInfo(fileInfo);
    console.log(fileInfo);
  }

  return (
    <div>
      <Form callback={handleFileInfoChange} />
      {fileInfo ? <Report fileInfo={fileInfo} /> : null}
    </div>
  );
}

export default App;
