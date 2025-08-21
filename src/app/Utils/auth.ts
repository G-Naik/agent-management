export const getToken = () => {
    if(typeof window !== undefined){
         return sessionStorage.getItem("token");
    }
    return null;
}

export const setToken = (token:string) => {
    if(typeof window !== undefined) {
        sessionStorage.setItem("token",token)
    }
}

export const removeToken = () => {
    if(typeof window !== undefined){
        sessionStorage.removeItem("token")
    }
}