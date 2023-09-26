import React from 'react'
import LogoDisplay from './LogoDisplay'

export const brandlogos=[
    {make:'Mercedes Benz',logo:"/images/mercedes.jpeg"},
    {make:'Mazda',logo:"/images/mazda.jpeg"},
    {make:'Ford',logo:"/images/ford.jpeg"},
    {make:'Jeep',logo:"/images/jeep.jpeg"},
    {make:'Toyota',logo:"/images/toyota.jpeg"},
    {make:'Nisssan',logo:"/images/nissan.jpeg"},
    {make:'Isuzu',logo:"/images/isuzu.jpeg"},
    {make:'Honda',logo:"/images/honda.jpeg"},
    {make:'Porshe',logo:"/images/porshe.jpeg"},
    {make:'Bmw',logo:"/images/bmw.jpeg"},
    {make:'Land rover',logo:"/images/Landrover.jpeg"},
    {make:'Bentley',logo:"/images/bentley.jpeg"},
    {make:'lamborgini',logo:'/images/lamborgini.png'}
]
const Makelogo = () => {
  return (
    <div className=' w-full flex flex-wrap bg-transparent justify-between absolute top-20 '>
        {brandlogos.map(brand=>(
           <LogoDisplay key={brand.make} logo={brand.logo} name={brand.make}/>
        ))}
    </div>
  )
}

export default Makelogo