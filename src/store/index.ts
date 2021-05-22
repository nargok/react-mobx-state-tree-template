import { Instance, types} from 'mobx-state-tree'
import { createContext, useContext } from 'react'

import { Country } from '../interface/Country';

const CountryStore = types.model({
  countries: types.array(types.frozen<Country>()),
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