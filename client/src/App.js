import React from 'react';
import './App.css';
import Main from './components/main';
import FullPageDialog from './components/utils/fullPageDialog';

function App() {
  return (
    <div className="App">
      <div class="top-bar">
        <FullPageDialog />
      </div>
      
      <header className="App-header">
        <Main />
      </header>
    </div>
  );
}

export default App;
