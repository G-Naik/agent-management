"use client"
import { forwardRef } from "react";
import { InputProps } from "./InputType";
import { InputWrapper } from "./InputStyles";


const Input = forwardRef<HTMLInputElement , InputProps>(( {type = "text" , className ,
    title , 
    placeHolder , 
    required , 
    desribedBy , 
    variant='custom', 
    ...rest } : InputProps , ref ) => {
    return (
        <InputWrapper
        ref={ref}
        type={type} className={`${className ?? ""}`}
        variant={variant} 
        aria-label={title}
        placeholder={placeHolder}
        aria-describedby={desribedBy}
        required={required}
        {...rest}
        ></InputWrapper>
    )
})

export default Input
Input.displayName = "Input"