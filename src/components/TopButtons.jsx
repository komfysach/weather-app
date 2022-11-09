import React from 'react'

function TopButtons({setQuery}) {
    const cities = [
        {
            id: 1,
            title: 'Amsterdam',
        },
        {
            id: 2,
            title: 'Cape Town'
        },
        {
            id: 3,
            title: 'New York'
        },
        {
            id: 4,
            title: 'London'
        },
        {
            id: 5,
            title: 'Tokyo'
        },
    ]

  return (
    <div className='flex items-center justify-around my-6'>
        {cities.map((city) => (
            <button key={city.id} className='text-white text-m font-medium px-6 transition ease-out hover:scale-110'
            onClick={() => setQuery({ q: city.title })}
            >{city.title}</button>
        ))}
    </div>
  )
}

export default TopButtons