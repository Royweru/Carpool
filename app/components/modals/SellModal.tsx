"use client";
import React, { useMemo, useState } from "react";
import Modal from "./Modal";
import useSellModal from "@/app/hooks/useSellModal";
import { useForm, FieldErrors, FieldValues, SubmitHandler } from "react-hook-form";
import Heading from "../Heading";
import Input from "@/app/inputs/Input";
import ImageUpload from "@/app/inputs/ImageUpload";
import axios from "axios";
import { useRouter } from "next/navigation";

enum STEPS {
  SELLER = 0,
  INFO = 1,
  IMAGES = 2,
  PRICE = 3,
}


const SellModal = () => {
  const sellModal = useSellModal();

  const [step, setStep] = useState(STEPS.SELLER);
  const [isLoading,setIsLoading] = useState(false)
  const router = useRouter()
  const onBack = () => {
    setStep((value) => value - 1);
  };
  const onNext = () => {
    setStep((value) => value + 1);
  };

  const actionLabel = useMemo(() => {
    if (step == STEPS.PRICE) {
      return "SUBMIT";
    }

    return "NEXT";
  }, [step]);


  const setCustomValue = (id:string,value:any)=>{
     setValue(id,value,{
      shouldValidate:true,
      shouldTouch:true,
      shouldDirty:true
     })
  }


  const onSubmit:SubmitHandler<FieldValues>= (d) => {
    if (step!==STEPS.PRICE){
      return onNext()
    }
    setIsLoading(true)
    axios.post('/api/selling',d)
    .then(()=>{
      console.log('success!')
      reset()
      router.refresh()
      setStep(STEPS.SELLER)
      sellModal.onClose()
    }).catch((err)=>{
      console.error(err)
    }).finally(()=>{
      setIsLoading(false)
    })
  }
 
  const secondaryLabel = useMemo(() => {
    if (step == STEPS.SELLER) {
      return undefined;
    }
    return "BACK";
  }, [step]);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      seller: "",
      engineSize: "",
      availability:true,
      fuelType: "",
      HP: "",
      transmission: "",
      torque: "",
      aspiration: "",
      acceleration: "",
      make: "",
      model: "",
      image:[],
      estimatedArrival: "",
      mileage: 1,
      price:0,
    },
  });

  const image = watch('image')


  let bodyContent;

  if (step === STEPS.SELLER) {
    bodyContent = (
      <div className=" flex flex-col gap-8">
        <Heading
          title="Hey there our adored user, thank for choosing to trade on this platform"
          subtitle="please make sure to fill the forms with the correct information and in no time you will bea assured to find a buyer"
        />

        <hr />
        <Heading title="Please write your name in full" />
        <Input
          id="seller"
          label="Name"
          register={register}
          required
          errors={errors}
        />
      </div>
    );
  }
  if (step === STEPS.INFO) {
    bodyContent = (
      <div className=" flex flex-col gap-8">
        <Heading
          title=" Provide us with the information of your car"
          subtitle="make sure you fill out the whole form"
        />
        <hr />
        <Input
          id="YOM"
          label="Year of manufacture"
          register={register}
          required
          errors={errors}
          disabled={isLoading}
        />
        <Input
          id="estimatedArrival"
          label="In which time will it be availbale"
          register={register}
          required
          errors={errors}
          disabled={isLoading}
        />
        <Input
          id="drive"
          type="text"
          label="Drive"
          register={register}
          required
          errors={errors}
          disabled={isLoading}
        />
        <Input
          id="mileage"
          label="Mileage"
          register={register}
          required
          errors={errors}
          disabled ={isLoading}
        />
        <Input
          id="engineSize"
          label="Engine size"
          register={register}
          required
          errors={errors}
        />
        <Input
          id="fuelType"
          label="Fuel type"
          register={register}
          required
          errors={errors}
        />
        <Input
          id="HP"
          label="Horse Power"
          register={register}
          required
          errors={errors}
        />

        <Input
          id="transmission"
          label="Transmission"
          register={register}
          required
          errors={errors}
        />
        <Input
          id="aspiration"
          label="Aspiration"
          register={register}
          required
          errors={errors}
        />
        <Input
          id="torque"
          label="Torque"
          register={register}
          required
          errors={errors}
        />
        <Input
          id="make"
          label="The make e.g Toyota"
          register={register}
          required
          errors={errors}
        />
        <Input
          id="type"
          label="The type e.g sedan"
          register={register}
          required
          errors={errors}
        />
        <Input
          id="acceleration"
          label="Acceleration from 0-100km/hr"
          register={register}
          required
          errors={errors}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className=" flex flex-col gap-8">
         <Heading title="Image uploads" subtitle="upload max of 3 images" />
         <ImageUpload onChange={(value)=>{setCustomValue('image',value)}} value={image} />
      </div>
    )
  }


  if (step === STEPS.PRICE){
    bodyContent=(
    <div className=" flex flex-col gap-8">
        <Heading title="Price" subtitle="give the price you are willing to sell your car at"/>
        <Input
          id="price"
          register={register}
          required
          label="Price"
          errors={errors}
          disabled={isLoading}
          type="number"
          />
    </div>)
  }

  return (
    <Modal
      isOpen={sellModal.isOpen}
      onClose={sellModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryLabel={secondaryLabel}
      secondaryAction={step == STEPS.SELLER ? undefined : onBack}
      title="Find a buyer for your car today!"
      body={bodyContent}
      disabled={isLoading}
    />
  );
};

export default SellModal;
