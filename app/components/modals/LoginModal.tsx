'use client'
import React,{useState} from 'react'

import Modal from './Modal'
import useLoginModal from '@/app/hooks/useLoginModal'
import { useRouter } from 'next/navigation'
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Heading from '../Heading'
import Input from '@/app/inputs/Input'
import Button from '../Button'
import{FcGoogle} from 'react-icons/fc'

const LoginModal = () => {
    const loginModal = useLoginModal()
    const router = useRouter()
    const [isLoading,setIsLoading] = useState(false)
   
    const {
        register,   
        handleSubmit,
        formState: { errors },
      } = useForm<FieldValues>({
        defaultValues: {
          email: "",
          password: "",
        },
      });

    const onSubmit = ()=>{

    }

   const bodyContent = (
    <div className=' flex flex-col gap-3'>
      <Heading title='Hey there welcome to Carpool' subtitle='Meet the car of your dreams'/>
      <Input
        id='email'
        label='Email'
        register={register}
        required
        disabled={isLoading}
        errors={errors}
        />
        <Input
        id='email'
        label='Email'
        register={register}
        required
        disabled={isLoading}
        errors={errors}
        />
    </div>
   )

   const footerContent= (
    <div className=' flex flex-row gap-5'>
     <Button
       outline
       label='Login using google'
       icon={FcGoogle}
       disabled={isLoading}
       onClick={()=>{}}
       />
    </div>
   )
   
  return (
   <Modal
    isOpen={loginModal.isOpen}
    onSubmit={handleSubmit(onSubmit)}
    onClose={loginModal.onClose}
    title='Login'
    subtitle='Welcome back to carpool'
    body={bodyContent}
    actionLabel='Sign In'
    footer={footerContent}
    />
  )
}

export default LoginModal