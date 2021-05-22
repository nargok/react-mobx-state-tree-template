import axios from 'axios';
import { cast, Instance, flow, types} from 'mobx-state-tree'
import { createContext, useContext } from 'react'

// todo storeの切り出し
import { Country } from '../interface/Country';

const CountryStore = types
  .model({
    countries: types.array(types.frozen<Country>()),
    timesRefreshed: types.number,
    autoRefreshActive: types.boolean,
  })
  .actions(self => {
    const refreshCountries = flow(function* () {
      const response: Country[] = yield axios
        .get("https://restcountries.eu/rest/v2/all")
        .then(value => value.data)

      self.countries = cast(response)
      self.timesRefreshed += 1
    })
    return { refreshCountries }
  })
  .actions(self => {
    let timeIntervalId: any

    return {
      cancelTimeInterval() {
        clearInterval(timeIntervalId)
      },
      setupTimeInterval() {
        self.autoRefreshActive = true
        timeIntervalId = setInterval(() => {
          self.refreshCountries()
        }, 3000)
      }
    }
  })

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