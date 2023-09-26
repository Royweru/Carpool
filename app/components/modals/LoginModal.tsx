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
import useRegisterModal from '@/app/hooks/useRegisterModal'
import {signIn} from 'next-auth/react'

const LoginModal = () => {
    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()
    const router = useRouter()
    const [isLoading,setIsLoading] = useState(false)
   
    const toggle = useCallback(()=>{
        loginModal.onClose()
        registerModal.onOpen()
    },[registerModal,loginModal])
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
      const onSubmit: SubmitHandler<FieldValues> = (data:any) => {
        setIsLoading(true);
    
        signIn('credentials',{
            ...data,
            redirect:false,
            
        }).then((callback)=>{
            setIsLoading(false)
    
            if(callback?.ok){
                reset
                router.refresh()
                loginModal.onClose()

            }
            if(callback?.error){
                console.error(callback.error)
            }
        }).finally(()=>{
          setIsLoading(false)
        })
      };

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
    <div className=' flex flex-col gap-5 mt-4'>
        <hr />
     <Button
       outline
       label='Login using google'
       icon={FcGoogle}
       disabled={isLoading}
       onClick={()=>{signIn('google')}}
       />
        <div className=' text 2xl text-rose-950 font-light text-center mt-3'>
        <div className=' flex flex-row items-center justify-center'>
             <div>
                 First time using carpool?
             </div>
             <div onClick={toggle}  className=' underline hover:cursor-pointer hover:opacity-80  hover:font-bold'>
                Sign Up
             </div>
        </div>

       </div>
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