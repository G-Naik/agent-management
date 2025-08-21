"use client";

import { Button } from "@/app/atoms";
import InputWithIcon from "@/app/molecules/InputWithIcon";
import { ChangeEvent,useCallback, useEffect, useState } from "react";
import Joi from "joi"
import { getToken } from "@/app/Utils/auth";

const agentValidationSchema = Joi.object({
    name : Joi.string().min(2).required().messages({
        "string.min":"Username should be atleast 2 Characters",
        "string.empty":"Username cannot be empty"
    }),
    email : Joi.string().email().required().messages({
        "string.empty" : "Email cannot be empty",
        "string.email" : "Ivalid Email address",        
    }),
    mobile : Joi.string().min(10).messages({
        "string.empty"  : "Mobile number cannot be empty",
        "string.min"  : "Mobile number should be atleast 10 digits"
    }),
    password : Joi.string().min(8).required().messages({
        "string.min" : "Password should be atleast 8 Characters",
        "string.empty" :"Password cannot be empty"
    })
})

export default function page() {

    const [agentData , updateAgentData] = useState({
        name : "",
        email : "",
        mobile : "",
        password : ""
    })

    const [visbility , updateVisibility] = useState<boolean>(false)
    const [token , updateToken] = useState<string | null>(null)

    const [errors , updateErrors] = useState<{[key:string]:string}>({})

    const handleInputChange = useCallback((event : ChangeEvent<HTMLInputElement>) => {
        const {name , value} = event.target ; 

        updateAgentData((prev) => ({
            ...prev, 
            [name] : value
        }))
    },[])

   const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    const { error } = agentValidationSchema.validate(agentData);

    if (error) {
        const formattedErrors: { [key: string]: string } = {};
        error.details.forEach((err) => {
            formattedErrors[err.path[0]] = err.message;
        });
        updateErrors(formattedErrors);
        return;
    }

    try {
        const agentResponse = await fetch(`${process.env.NEXT_PUBLIC_LOGIN_API}/agent`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                ...(token ? { authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify(agentData),
        });

        if (!agentResponse.ok) {
            updateErrors({ message: "Response Failed" });
            return;
        }

        const results = await agentResponse.json();
        if (!results) {
            updateErrors({ message: "Failed to post Data" });
            return;
        }

        updateAgentData({
            email: "",
            name: "",
            mobile: "",
            password: "",
        });
        updateErrors({});
        alert(results.message);
    } catch (err) {
        updateErrors({ message: "Something went wrong. Try again!" });
    }
}, [agentData, token]);

    useEffect(() => {
        const token = getToken();
        updateToken(token)
    },[])

  return (
    <div className="md:w-xl w-full m-auto">
        <div className="text-center">
            <h1 className="text-2xl"> 👨‍💼 Agent Management</h1>
            <p className="text-[14px] py-2">Add and manage agents who will handle the distributed tasks. You can create new agent profiles, update their details, and assign responsibilities.</p>
        </div>
      <form onSubmit={handleSubmit}>
        <div className="py-1">
          <label htmlFor="name" className="py-1 block px-1 text-[#202020]">
            User Name
          </label>
          <InputWithIcon
            type="text"
            required
            iconName="person"
            iconposition="right"
            aria-label="name"
            className="text-[#202020ce]"
            name="name"
            onChange={handleInputChange}
            value={agentData.name}
          />
          {
            errors.name && 
            <span className="text-red-500">{errors.name}</span>
          }
        </div>
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
            name="email"
            onChange={handleInputChange}
            value={agentData.email}
          />
          {
            errors.email && 
            <span className="text-red-500">{errors.email}</span>
          }
        </div>
        <div className="py-1">
          <label htmlFor="mobile" className="py-1 block px-1 text-[#202020]">
            Mobile
          </label>
          <InputWithIcon
            type="text"
            required
            iconName="phone"
            iconposition="right"
            aria-label="mobile"
            className="text-[#202020ce]"
            name="mobile"
            onChange={handleInputChange}
            value={agentData.mobile}
          />
          {
            errors.mobile && 
            <span className="text-red-500">{errors.mobile}</span>
          }
        </div>
        <div className="py-1">
          <label htmlFor="password" className="py-1 block px-1 text-[#202020]">
            Password
          </label>
          <InputWithIcon
            type={!visbility ? "password" : "text"}
            required
            iconName={visbility ? "visibility" : "visibility_off"}
            iconposition="right"
            aria-label="password"
            className="text-[#202020ce]"
            name="password"
            onChange={handleInputChange}
            onIconClick={() => updateVisibility((prev) => !prev)}
            value={agentData.password}
          />
          {
            errors.password && 
            <span className="text-red-500">{errors.password}</span>
          }
        </div>
        {
            errors.message && 
            <span>{errors.message}</span>
        }
        <div className="pt-8">
            <Button>
                Add Agent
            </Button>
        </div>

      </form>
    </div>
  );
}
