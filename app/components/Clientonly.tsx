'use client'

import React,{useState,useEffect} from 'react'


interface ClientonlyProps{
    children:React.ReactNode
}
const Clientonly:React.FC<ClientonlyProps> = ({
   children
}) => {

 const [isMounted,setIsMounted] = useState(false)
  
 useEffect(()=>{
    setIsMounted(true)
 },[]) 

 if(!isMounted){
    return null
 }

  return (
   <>
   {children}
   </>
  )
}

export default Clientonly