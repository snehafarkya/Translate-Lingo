import { Route, Routes } from 'react-router-dom';
import './App.css';
import Translate from './Translate';
import ReactSpeech from './components/ReactSpeech';
import Speech from './components/TexttoSpeech';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path='/' element={ <Translate/>}/>
          <Route path='/speech-to-text' element={ <ReactSpeech/>}/>
          <Route path='/text-to-speech' element={<Speech/>} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
