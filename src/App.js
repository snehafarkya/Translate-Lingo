import { Route, Routes } from 'react-router-dom';
import './App.css';
import Translate from './Translate';
import ReactSpeech from './components/ReactSpeech';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path='/' element={ <Translate/>}/>
          <Route path='/reactspeech' element={ <ReactSpeech/>}/>

        </Routes>
      </header>
    </div>
  );
}

export default App;
