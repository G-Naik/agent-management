"use client";
import { ChangeEvent, FormEvent, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import InputWithIcon from "../molecules/InputWithIcon";
import { Button } from "../atoms";
import Link from "next/link";
import { LoginProps } from "../Types/Login";
import Joi from "joi";

 const validationSchema = Joi.object({
      email : Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email address",
  }),
      password : Joi.string().min(8).required().messages({
        "string.min" :"Password should have atleast 8 characters"
      })
     })


export default function Login() {


  const [visibility, updateVisiblity] = useState<boolean>(false);

  const targetElement = useRef<HTMLInputElement | null>(null);

  const [ userLoginData , updateUserLoginData ] = useState<LoginProps>({
    email : "",
    password: "",
  })

  const [ LoginError , updateLoginError] = useState<{[key:string]:string}>({})

  
  //! TagretInputElement and update input data 
  const handleInputChange = useCallback(( event : ChangeEvent<HTMLInputElement>) => {
      const {name , value } = event.target
      updateUserLoginData((prev) => ({
        ...prev,
        [name]:value
      }))
  },[])

  //! Submit Data 
  const handleSubmit = useCallback(async (event : FormEvent<HTMLFormElement>) => {
      event.preventDefault() ; 
      const {error} = validationSchema.validate(userLoginData , {
        abortEarly : false
      })
      if(error){
        const formattedErrors:{[key:string]:string} = {};
        error.details.forEach((err) => {
          formattedErrors[err.path[0]] = err.message;
        })
        updateLoginError(formattedErrors);
        return ;
      } else {
        const loginResponse =  await fetch(`${process.env.NEXT_PUBLIC_LOGIN_API}/login`,{
          method : "POST",
          headers : {
            "content-type":"application/json",
          },
          body: JSON.stringify(userLoginData)
        })
        
        if(loginResponse.status !== 200){
          alert("login Failed")
          updateUserLoginData({
            email:"",
            password:""
          })
          return ; 
        } else {
          const results = await loginResponse.json();

          if(results.token){
              sessionStorage.setItem("token",results.token)
              window.location.href = "/"
          } else {
            updateLoginError({
              general : "Invalid Credentials"
            })
          }

          updateLoginError({});
          alert(results?.message)
        }
      }
  },[userLoginData])

//! Highlight Input after Loading the page 
  useLayoutEffect(() => {
    targetElement.current?.focus();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen px-4 md:px-0">
      <div className="w-[23rem]">
        <div className="text-center mb-6">
            <h1 className="font-semibold text-2xl">Admin login</h1>
            <p className="text-[14px] py-1">“Access your dashboard to manage agents, upload contact lists, and distribute tasks effectively.”</p>
        </div>
        <form className="md:w-[23rem]" onSubmit={handleSubmit}>
          <div className="py-1">
            <label htmlFor="email" className="py-1 block px-1 text-[#202020]">
              Email
            </label>
            <InputWithIcon
              type="email"
              required
              iconName="mail"
              iconposition="right"
              aria-label="email"
              className="text-[#202020ce]"
              ref={targetElement}
              name="email"
              onChange={handleInputChange}
              value={userLoginData.email}
            />
            {
              LoginError.email && 
              <p className="text-red-500">{LoginError.email}</p>
            }
          </div>
          <div className="py-1">
            <label htmlFor="password" className="py-1 block px-1 text-[#202020]">
              Password
            </label>
            <InputWithIcon
              type={!visibility ? "password" : "text"}
              aria-label="password"
              required
              iconName={visibility ? "visibility" : "visibility_off"}
              iconposition="right"
              onIconClick={() => updateVisiblity((prev) => !prev)}
              className="text-[#202020ce]"
              name="password"
              onChange={handleInputChange}
              value={userLoginData.password}
            />
             {
              LoginError.password && 
              <p className="text-red-500">{LoginError.password}</p>
            }
          </div>
          <div className="pt-5">
            <Button
            role="submit"
            >Login</Button>
          </div>
          {LoginError.general && 
            <p className="text-red-500">{LoginError.general}</p>
          }
        </form>
        <div className="py-6 text-center">
            <span className="pr-1">Don’t have an account?</span>
            <span className="text-blue-600">Contact us</span>
        </div>
      </div>
    </div>
  );
}
