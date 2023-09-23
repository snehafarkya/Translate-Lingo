import './App.css';
import Translate from './Translate';
import ReactSpeech from './components/ReactSpeech';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <Translate /> */}
        <ReactSpeech/>
      </header>
    </div>
  );
}

export default App;
