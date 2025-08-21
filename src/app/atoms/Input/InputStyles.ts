import styled, { css } from "styled-components"
import { InputProps } from "./InputType"

export const getVariantStyles = (varaint ?: string) => {
    switch (varaint) {
        case "default" : 
            return css`
                background-color: #F2F2F2;
                color: var(--primary);

                &:focus {
                    outline : none ; 
                    border : 1px solid #269AD4 ; 
                }
            ` ; 
        case "bordered" : 
            return css`
                background-color: white;
                border:1px solid blue; 

                &:focus {
                    outline: none;
                    border: 1px solid orange;
                }
            `
        default :
                return  css`
                    &:focus {
                        outline:  none;
                    }
                `;
    }
}

export const InputWrapper = styled.input<InputProps>`
    height: 44px;
    width: 100% ;
    ${({ variant }) => getVariantStyles(variant)}
`