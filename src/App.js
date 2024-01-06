
import { useState } from 'react';
import './App.css';
import Url from './Url';
import './Url.css'

function App() {
  const [shortenUrl,setShortenUrl]=useState([])
 const handleShortendUrl =(Url)=>{
  setShortenUrl(Url.shortendUrl)
 }

  return (
    <div className="App">
    <h1>URL SHORTNER</h1>
    <button className='shortendUrl' onClick={handleShortendUrl}/>
    <Url/>
    {shortenUrl && (
        <div>
          <p>Shortened URL:</p>
          <a href={shortenUrl} target="_blank" rel="noopener noreferrer">
            {shortenUrl}
            </a>
            </div>
    )}
    </div>

  
  
  );
}

export default App;
