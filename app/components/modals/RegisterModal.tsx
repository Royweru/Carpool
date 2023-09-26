'use client'
import React,{useState,useCallback} from 'react'

import Modal from './Modal'
import useLoginModal from '@/app/hooks/useLoginModal'
import { useRouter } from 'next/navigation'
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Heading from '../Heading'
import Input from '@/app/inputs/Input'
import Button from '../Button'
import{FcGoogle} from 'react-icons/fc'
import axios from 'axios'
import {signIn} from 'next-auth/react'
import useRegisterModal from '@/app/hooks/useRegisterModal'

const RegisterModal = () => {
    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()
    const router = useRouter()
    const [isLoading,setIsLoading] = useState(false)
   
    const toggle = useCallback(()=>{
       registerModal.onClose()
       loginModal.onOpen()
    },[registerModal,loginModal])

    const {
        register,   
        handleSubmit,
        formState: { errors },
        reset
      } = useForm<FieldValues>({
        defaultValues: {
          email: "",
          name:"",
          password: "",
        },
      });

    const onSubmit:SubmitHandler<FieldValues> = (data)=>{
        setIsLoading(true)
        axios.post('/api/register',data).then(
            ()=>{
                reset
                registerModal.onClose()
                console.log('successful')
            }
        ).catch((err)=>{
            console.error('Err:', err)
        }).finally(()=>{
            setIsLoading(false)
        }
        )
        
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
        id='name'
        label='Name'
        register={register}
        required
        disabled={isLoading}
        errors={errors}
        />
        <Input
        id='password'
        label='Password'
        register={register}
        required
        disabled={isLoading}
        errors={errors}
        />
    </div>
   )

   const footerContent= (
    <div className=' flex flex-col gap-5 mt-2'>
        <hr />
     <Button
       outline
       label='Continue with google'
       icon={FcGoogle}
       disabled={isLoading}
       onClick={()=>{signIn('google')}}
       />
       <div onClick={toggle} className=' text 2xl text-rose-950 font-light text-center mt-3'>
        <div className=' flex flex-row items-center justify-center gap-x-1'>
             <div>
                Already have an account?
             </div>
             <div className=' underline hover:cursor-pointer hover:opacity-80  hover:font-bold'>
                Login
             </div>
        </div>

       </div>
    </div>
   )
   
  return (
   <Modal
    isOpen={registerModal.isOpen}
    onSubmit={handleSubmit(onSubmit)}
    onClose={registerModal.onClose}
    title='Register'
    subtitle='New here? sign up'
    body={bodyContent}
    actionLabel='Sign up'
    footer={footerContent}
    />
  )
}

export default RegisterModal