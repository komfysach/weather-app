import { useEffect, useState } from 'react';
import './App.css';
import Inputs from './components/Inputs';
import TemperatureDetails from './components/TemperatureDetails';
import TimeLocation from './components/TimeLocation';
import TopButtons from './components/TopButtons';
import getFormattedWeatherData from './services/weatherService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [query, setQuery] = useState({q: 'london'})
  const [units, setUnits] = useState('metric')
  const [weather, setweather] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : 'current location.'

      toast.info("Fetching weather for " + message)

      await getFormattedWeatherData({...query, units}).then(data => {
        setweather(data)
        toast.success(`Successfully fetched weather for ${data.name}, ${data.country}`)
        console.log(data);
      });
      
    }
  
    fetchWeather()
  }, [query, units])

  return (
    <div className='max-w-screen h-screen py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 shadow-xl shadow-gray-400'>
      <TopButtons setQuery={setQuery}/>
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits}/>
      {weather &&
      <div>
      <TimeLocation weather={weather}/>
      <TemperatureDetails weather={weather}/>
      </div>}
      <ToastContainer autoClose={2000} theme='colored' newestOnTop={true}/>
    </div>
  );
}

export default App;
