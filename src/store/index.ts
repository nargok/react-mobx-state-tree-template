import { Instance, types} from 'mobx-state-tree'
import { createContext, useContext } from 'react'

import CountryStore from './country'

export const RootStore = types.model({
  countryStore: CountryStore,
})

let _store:any = null;

export function initialStore() {
  _store = RootStore.create({
    countryStore: {
       countries: [],
       timesRefreshed: 0,
       autoRefreshActive: false,
    },
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