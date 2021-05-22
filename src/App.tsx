import React from 'react';
import { initialStore, Provider } from './store/'

const store = initialStore();

function App() {
  return (
    <Provider value={store}>
      <div className="App">
      </div>
    </Provider>
  );
}

export default App;
