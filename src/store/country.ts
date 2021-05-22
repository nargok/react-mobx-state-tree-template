import axios from 'axios';
import { cast, flow, types} from 'mobx-state-tree'

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
        self.autoRefreshActive = false
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

export default CountryStore