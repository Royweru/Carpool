'use client'
import React,{useMemo, useState} from 'react'
import Modal from './Modal'
import useSellModal from '@/app/hooks/useSellModal'
import { useForm,FieldErrors,FieldValues } from 'react-hook-form'
import Heading from '../Heading'
import Input from '@/app/inputs/Input'


enum STEPS{
    SELLER = 0,
    LOCATION=1,
    INFO=2,
    IMAGES=3,
    PRICE=4
}
const SellModal = () => {
  const sellModal = useSellModal()

  const[step,setStep]= useState(STEPS.SELLER)
   const onBack = ()=>{
    setStep((value)=>value-1)
   }
   const onNext = ()=>{
    setStep((value)=>value+1)
   }
  
 const  actionLabel = useMemo(()=>{
      if (step == STEPS.PRICE){
        return 'SUBMIT'
      }

      return 'NEXT'
   }, [step])

const secondaryLabel = useMemo(()=>{
    if (step == STEPS.SELLER){
        return undefined
    }
    return 'BACK'
},[step])
const {
    register,   
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

let bodyContent;

if(step === STEPS.SELLER){

    bodyContent=(
        <div className=' flex flex-col gap-8'>
            <Heading
              title='Hey there our adored user, thank for choosing to trade on this platform'
              subtitle='please make sure to fill the forms with the correct information and in no time you will bea assured to find a buyer'
              />

              <hr />
            <Heading title='Please write your name in full'/>
            <Input
             id='seller'
             label='Name'
             register={register}
             required
             errors={errors}
             />
           
        </div>
    )
}
if(step===STEPS.LOCATION){
    bodyContent=(
    <div className=' flex flex-col gap-8'>
         <Heading title='Tell us your location' subtitle='Write the County,city'/>
         <Input
           id='location'
           label='Location'
           register={register}
           required
           errors={errors}
           />
    </div>
    )
}

  return (
    <Modal
      isOpen={sellModal.isOpen}
      onClose={sellModal.onClose}
      onSubmit={onNext}
      actionLabel={actionLabel}
      secondaryLabel={secondaryLabel}
      secondaryAction={step ==STEPS.SELLER ?undefined:onBack}
      title='Find a buyer for your car today!'
      body={bodyContent}
      />
  )
}

export default SellModal