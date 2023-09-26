'use client'
import React from 'react'

import Image from 'next/image'

interface AvatarProps{
    src:String|null|undefined,
}

const Avatar:React.FC<AvatarProps> = ({
    src
}) => {
  return (
    <Image
      src={src ||"/images/placeholder.jpeg"}
      width={35}
      height={35}
      className=' rounded-full'
      alt=''
      />
  )
}

export default Avatar