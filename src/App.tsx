import React from 'react';
import logo from './logo.svg';
import './App.css';
import {makeStorage} from "./utils/storage"
import aes from "crypto-js/aes";
import CryptoJS from 'crypto-js';
import { decrypt, encrypt } from './utils/encryption';
import { Web3Storage, Web3File } from 'web3.storage';
import axios from 'axios';
//import {Storage} from "@samudai_xyz/web3-sdk"
function App() {

  const [token, setToken] = React.useState<string>('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDE2NzA5MzgwMUY5NTY4NTEzMERFOGE1YkZkQTE2Q0E2MmMzOGJBMzUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTk5NDE5NzkwMTAsIm5hbWUiOiJTYW11ZGFpIn0.raVnhgVsWM52Ea4GAhyfy459eoymw-IkIFyxgqszcuY');
  const storage = makeStorage(token);
  const [file, setFile] = React.useState<File>();
  const [cid, setCid] = React.useState<string>('bafybeialg4lasq2hzdqthgpx2prnoxk2twwwhdxejxzbvi7c4qcf6fgd64');

  const storeFile = async () => { 
    if(file) {
   
     const arra = await file.arrayBuffer();
     const res = encrypt(arra)
      const fileData = new File([res as any], file.name, {type: file.type})
     const cid = await storage.put([fileData]);
      console.log(cid)
      setCid(cid)
     //const dec = decrypt(file)
    }
  }

  const downloadFile = async () => { 
   
    //fetch file from url and download 
    const url ="https://bafybeiax54goofumqu7yh6jdr6gez2ltevgwvc4e62hmdm4dw3ostusgl4.ipfs.w3s.link/Screenshot%202022-11-10%20at%206.07.17%20PM.png"
    //get file name from url
    const fileName = url.split('/').pop();
    fetch('https://bafybeiax54goofumqu7yh6jdr6gez2ltevgwvc4e62hmdm4dw3ostusgl4.ipfs.w3s.link/Screenshot%202022-11-10%20at%206.07.17%20PM.png').then(res => res.blob()).then(blob => {
      const file = new File([blob], decodeURIComponent(fileName!), {type: blob.type})
      const dec = decrypt(file)
    })


    //get file name from content-disposition header
    // const fileName = result.headers['content-disposition'].split('filename=')[1];
    // console.log(fileName)
    // const fileDec = new Blob([result.data]); // Create blob from ArrayBuffer

		// const a = document.createElement('a');
		// const url = window.URL.createObjectURL(fileDec);
		// const filename = 'fileName.png'
		// a.href = url;
		// a.download = filename;
		// a.click();
		// window.URL.revokeObjectURL(url);

    // const res = await storage.get(cid!);
    // const files = await res?.files();
    // console.log(await files![0].arrayBuffer())
    // files![0].arrayBuffer().then((buffer) => { 
    //   const file = new File([buffer], files![0].name)
    //   const dec = decrypt(file)
    //   console.log(dec)
    // })
  }

 
  return (
    <div className="App">
       <input type="file" onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
          }
        }} />
        <button onClick={storeFile}>Store</button>
        <button onClick={downloadFile}>Download</button>
    </div>
  );
}

export default App;
