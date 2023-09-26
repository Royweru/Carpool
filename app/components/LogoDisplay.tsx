import React from 'react'
import Image from 'next/image'
interface LogoDisplayProps{
    logo:string,
    name:string
}



const LogoDisplay:React.FC<LogoDisplayProps> = ({
    logo,
    name
}) => {
  return (
      <div className=' m-2 border-r-[2px] rounded-md flex '>
          <Image 
           src={logo}
           width={95}
           height={95}
           alt=''
           className=' rounded'
           />
      </div>
  )
}

export default LogoDisplay