import { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    type ?: HTMLInputTypeAttribute ;
    className ?: string ;
    id ?: string ; 
    title ?: string ; 
    placeHolder ?: string ; 
    required ?: boolean ; 
    desribedBy ?: string  ; 
    variant ?: 'default' | 'bordered' | 'custom'
}