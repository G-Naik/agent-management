"use client"
import { forwardRef } from "react";
import { Icon, Input } from "../atoms";
import { InputProps } from "../atoms/Input/InputType";
import styled, { css } from "styled-components";

interface InputWithIconProps  extends InputProps {
    iconposition ?: 'left' | 'right' ; 
    variant ?: 'default' | 'bordered' | 'custom' ; 
    className ?: string ; 
    iconName ?: string ; 
    type ?: string ; 
    onIconClick ?:() => void;
    onChange ?: (event:React.ChangeEvent<HTMLInputElement>) => void; 
    onClick ?: () => void;
}



const InputWithIconWrapper = styled.div<InputWithIconProps>`
    display: flex;
    flex-grow: 1; 
    flex-direction: ${props => props.iconposition === 'right' && 'row-reverse'};
    width: 100% ; 
    background-color: ${props => {
        switch(props.variant) { 
            case "default" : 
                return '#F2F2F2';
            case "bordered" : 
                return '#269ADF' ; 
            default : 
                return ; 
        }
    }};
    align-items: center;
    gap : ${props => props.iconName === '' ?  "0px" : "8px"} ; 
    border-radius : 8px;
    padding: 0px 8px; 
    &:focus-within { 
        border: 0.015rem solid #269ADF;
    } ;
    transition: all ease-in;
`

const InputWithIcon = forwardRef<HTMLDivElement , InputWithIconProps >(({ iconposition = 'left' , variant = 'default' , className , iconName , type = 'text' , onChange, onClick, onIconClick, ...rest} : InputWithIconProps , ref) => {
    return (
        <InputWithIconWrapper iconposition={iconposition} className={className} variant={variant} onClick={onClick}>
            {
                    iconName && <Icon iconName={iconName} onIconClick={onIconClick}/>
                }               
            <Input ref={ref} type={type} onChange={onChange} {...rest} />
        </InputWithIconWrapper>
    )
})

export default InputWithIcon ; 