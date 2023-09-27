'use client'
import React,{useMemo, useState} from 'react'
import Modal from './Modal'
import useSellModal from '@/app/hooks/useSellModal'
import { useForm,FieldErrors,FieldValues } from 'react-hook-form'
import Heading from '../Heading'
import Input from '@/app/inputs/Input'


enum STEPS{
    SELLER = 0,
    INFO=1,
    IMAGES=2,
    PRICE=3
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
      seller:"",
      engineSize:"",
      fuelType:"",
      HP:"",
      transmission:"",
      torque:"",
      aspiration:"",
      acceleration:"",
      make:"",
      model:"",
      image:[],
      estimatedArrival:"",
      mileage:1
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
if(step===STEPS.INFO){
    bodyContent=(
       <div className=' flex flex-col gap-8'>
          <Heading title=' Provide us with the information of your car' subtitle='make sure you fill out the whole form'/>
          <hr />
          <Input
             id='YOM'
             type='text'
             label='Year of manufacture'
             register={register}
             required
             errors={errors}
             />
               <Input
             id='estimatedArrival'
             type='text'
             label='In which time will it be availbale'
             register={register}
             required
             errors={errors}
             />
               <Input
             id='drive'
             type='text'
             label='Drive'
             register={register}
             required
             errors={errors}
             />
               <Input
             id='mileage'
             type='nummber'
             label='Mileage'
             register={register}
             required
             errors={errors}
             />
               <Input
             id='engineSize'
             type='text'
             label='Engine size'
             register={register}
             required
             errors={errors}
             />
               <Input
             id='fuelType'
             label='Fuel type'
             register={register}
             required
             errors={errors}
             />
               <Input
             id='HP'
             type='text'
             label='Horse Power'
             register={register}
             required
             errors={errors}
             />
           
               <Input
             id='transmission'
             type='text'
             label='Transmission'
             register={register}
             required
             errors={errors}
             />
               <Input
             id='aspiration'
             
             label='Aspiration'
             register={register}
             required
             errors={errors}
             />
             <Input
             id='torque'
             
             label='Torque'
             register={register}
             required
             errors={errors}
             />
               <Input
             id='make'
             type='text'
             label='The make e.g Toyota'
             register={register}
             required
             errors={errors}
             />
               <Input
             id='model'
             type='text'
             label='The model e.g vitz'
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