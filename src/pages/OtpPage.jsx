import { useEffect, useRef } from "react";
import { OtpComponent } from "../components/otp/otp"

export const OtpPage = () => {

   let  timeoutRef = useRef(null);

   const onComplationHandle  =(val) => {
      timeoutRef.current = setTimeout(() =>  alert(val), 100)
   }

   useEffect(() => {
      return () => {
         clearTimeout(timeoutRef.current)
      }
   }, [])

   return (
      <>
      <h2 style={{textAlign:"center"}}>Enter OTP Here</h2>
      <OtpComponent count={4} onOtpComplete={onComplationHandle}/>
      </>
   )
}   