import axios from 'axios';
import { cast, Instance, flow, types} from 'mobx-state-tree'
import { createContext, useContext } from 'react'

import { Country } from '../interface/Country';

const CountryStore = types
  .model({
    countries: types.array(types.frozen<Country>()),
  })
  .actions(self => {
    const refreshCountries = flow(function* () {
      const response: Country[] = yield axios
        .get("https://restcountries.eu/rest/v2/all")
        .then(value => value.data)

      console.log('response', response)

      self.countries = cast(response)
    })
    return { refreshCountries }
  })

export const RootStore = types.model({
  countryStore: CountryStore,
})

let _store:any = null;

export function initialStore() {
  _store = RootStore.create({
    countryStore: { countries: []}
  })
  return _store
}

export type RootInstance = Instance<typeof RootStore>
const RootStoreContext = createContext<null | RootInstance>(null)
export const Provider = RootStoreContext.Provider

export function useStore(): Instance<typeof RootStore> {
  const store = useContext(RootStoreContext)
  if (store === null) {
    throw new Error("Store connot be null. please add a context provider")
  } else {
    return store;
  }
}