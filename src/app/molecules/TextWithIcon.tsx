import styled from "styled-components";
import { Icon, Text } from "../atoms";

interface TextWithIconProps {
    iconLeft ?:boolean ; 
    iconRight ?: boolean ;
    iconLeftName ?: string ; 
    iconRightName ?: string ; 
    title ?: string ; 
    label ?: string ; 
    onClick ?: () => void ; 
    className ?: string ;
}

const TextIconWrapper = styled.div`
        display: flex;
        width: 100%;
        height: 44px;
        gap:4px;
        justify-content: space-between;
        align-items: center;
        padding: 0px 8px;
`

const TextInnerWrapper = styled.div`
    display: flex;
    gap: 16px;
    justify-content: space-between;
    align-items: center ;
`

const TextWithIcon = ( { iconLeft , iconRight , iconRightName , iconLeftName , label , title , onClick , className} : TextWithIconProps) => {
  return (
    <TextIconWrapper onClick={onClick} className={className}>
            <TextInnerWrapper>
            {
                iconLeft && <Icon sizes="sm" iconName={iconLeftName} />
            }

            <Text title={title} label={label}/>
            </TextInnerWrapper>
            <div>
            {
                iconRight && <Icon sizes="sm" iconName={iconRightName} className="mt-2" />
            }
            </div>
            
    </TextIconWrapper>
  )
}

export default TextWithIcon