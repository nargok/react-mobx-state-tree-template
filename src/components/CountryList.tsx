import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore} from '../store'

const CountryList = () => {
  const { countryStore } = useStore();

  useEffect(() => {
    countryStore.refreshCountries()
  }, [])

  return (
    <div>
      <h3>CountryList</h3>
      {countryStore.countries.map((value) => {
        const countryName = value.name
        return <span key={countryName}>{countryName}| </span>
      })}
    </div>
  )
}

export default observer(CountryList)