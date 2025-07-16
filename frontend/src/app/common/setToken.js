"use client"
export default async function setToken(token){
    localStorage.setItem("auth_token",token)
}