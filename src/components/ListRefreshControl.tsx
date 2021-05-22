import { observer } from 'mobx-react-lite'
import { useStore } from '../store/'

const ListRefreshControl = () => {
  const { countryStore } = useStore();

  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>Update Control</h3>
      <div>Times update: {countryStore.timesRefreshed}</div>
      <br />
      <button onClick={countryStore.refreshCountries}>Manual Update</button>

      <button
        onClick={countryStore.setupTimeInterval}
        disabled={countryStore.autoRefreshActive}
      >
        Sertup Auto-Refresh
      </button>

      <button
        onClick={countryStore.cancelTimeInterval}
        disabled={!countryStore.autoRefreshActive}
      >
        Tear down auto-refresh
      </button>
      
    </div>
  )
}

export default observer(ListRefreshControl)