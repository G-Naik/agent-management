import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    role ?:string;
    className ?: string ; 
    onClick ?: () => void; 
    children ?: React.ReactNode
}

const  Button = ({ role , className , onClick , children , ...rest} : ButtonProps) => {
    return (
        <button
            role={role}
            className={`${className} w-full h-[44px] bg-[#202020] text-white rounded-md`}
            onClick={onClick}
            {...rest}
        >{children}</button>
    )
}

export default Button;