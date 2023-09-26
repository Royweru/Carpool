'use client'
import React from 'react'
import Modal from './Modal'
import useSellModal from '@/app/hooks/useSellModal'


enum STEPS{
    
}
const SellModal = () => {
    const sellModal = useSellModal()
  return (
    <Modal
      isOpen={sellModal.isOpen}
      onClose={sellModal.onClose}
      onSubmit={()=>{}}
      actionLabel='Next'
      title='Find a buyer for your car today!'
      />
  )
}

export default SellModal