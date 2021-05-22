import React from 'react';
import { initialStore, Provider } from './store/'
import ListRefreshControl from './components/ListRefreshControl'
import CountryList from './components/CountryList'

const store = initialStore();

function App() {
  return (
    <Provider value={store}>
      <div className="App">
        <ListRefreshControl />
        <CountryList  />
      </div>
    </Provider>
  );
}

export default App;
