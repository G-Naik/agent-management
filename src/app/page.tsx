"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { getToken } from "./Utils/auth"

export default function page() {

  const router = useRouter()

  useEffect(() => {
    const token = getToken();

    if(!token){
      router.replace("/login")
    } else {
      router.replace('/dashboard')
    }
  },[])

  return (
    <></>
  )
}
