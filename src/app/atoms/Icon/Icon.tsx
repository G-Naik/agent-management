import { IconProps } from "./IconTypes";

const Icon = ( {sizes = "sm" , iconName = '', className = '' , onIconClick} : IconProps ) => {
    const finalClass = `material-icons ${sizes}`

    return (
        <span aria-hidden="true" className={`${finalClass} ${className} global-icon-default`} 
        onClick={onIconClick}
        >
            {iconName}
        </span>
    )
}

export default Icon ; 