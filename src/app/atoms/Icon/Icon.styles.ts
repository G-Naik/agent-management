import styled, { css } from "styled-components";
import { IconProps } from "./IconTypes";


const getVariantSizes = (sizes: string) => {
    switch(sizes){
        case "md" : 
            return css`
                width :28px;
                height: 28px;
            `;
        case "lg" : 
            return css`
                width: 32px;
                height: 32px;
            `;
        default : 
            return css`
                width: 24px;
                height: 24px;
            `
    }   
}

export const IconWrapper = styled.div<IconProps>`
    background-color: inherit;
    ${({sizes}) => getVariantSizes(sizes = 'sm')}
`