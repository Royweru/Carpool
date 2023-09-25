'use client'
import React from 'react'

import Image from 'next/image'

const Avatar = () => {
  return (
    <Image
      src={"/images/placeholder.jpeg"}
      width={35}
      height={35}
      className=' rounded-full'
      alt=''
      />
  )
}

export default Avatar