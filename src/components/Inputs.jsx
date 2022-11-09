import React, { useState } from 'react'
import {UilSearch, UilLocationPoint} from '@iconscout/react-unicons'
import {toast} from 'react-toastify'

function Inputs({setQuery, units, setUnits}) {
  const [city, setCity] = useState("")

  const handleSearchClick = () => {
    if (city !== '') setQuery({q: city})
  }


  const handleLocationClick = () => {
    if (navigator.geolocation) {
      toast.info("Fetching your location...")
      navigator.geolocation.getCurrentPosition((position) => {
        toast.success("We found you!")

        let lat = position.coords.latitude
        let lon = position.coords.longitude

        setQuery({
          lat,
          lon
        })
      })
    }
  }

  const handleKeyPress = (e) => {
    // triggers when the user presses enter
    if (e.key === 'Enter') {
      handleSearchClick()
    }
  }

  const handleUnitChange = (e) => {
    e.preventDefault()
    const selectedUnit = e.currentTarget.name
    if (units !== selectedUnit) setUnits(selectedUnit)
  }

  return (
    <div className='flex flex-row justify-center'>
        <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
            <input type="text" placeholder='Search for city...' 
            value={city}
            onChange={(e) => setCity(e.currentTarget.value)}
            onKeyDown={handleKeyPress}
            className='text-xl font-light p-2 w-15 shadow-xl focus:outline-none rounded-2xl capitalize placeholder:lowercase'/>
            <UilSearch size={25} 
            onClick={handleSearchClick}
            className="text-white cursor-pointer transition ease-out hover:scale-125"/>
            <UilLocationPoint size={25} 
            onClick={handleLocationClick}
            className="text-white cursor-pointer transition ease-out hover:scale-125"/>
            <div className="flex flex-row 1-1/4 items-center justify-center">
                <button name='metric' 
                onClick={handleUnitChange}
                className='text-xl text-white font-light'>°C</button>
                <p className='p-2 text-white text-xl'> | </p>
                <button name='imperial' 
                onClick={handleUnitChange}
                className='text-xl text-white font-light'>°F</button>
            </div>
        </div>
    </div>
  )
}

export default Inputs