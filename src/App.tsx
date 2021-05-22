import React from 'react';
import { initialStore, Provider } from './store/'
import CountryList from './components/CountryList'

const store = initialStore();

function App() {
  return (
    <Provider value={store}>
      <div className="App">
        <CountryList  />
      </div>
    </Provider>
  );
}

export default App;
