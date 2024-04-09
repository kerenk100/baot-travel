import './App.css'
import Map from '../src/components/utilities/map';
function App() {

  return (
    <>
      <h1>
        Baot travel
      </h1>
      <div style={{ height: 300, width: 300 }}>
        <Map lat={7.2905715} lng={80.6337262}></Map>
      </div>
    </>
  )
}

export default App
