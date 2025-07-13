import type { LoginForm } from "../types/Login";
import { Cookies } from "../utility/cookies";
import api  from "./apiLayer"


export const Login=async({username,password}:LoginForm)=>{
    return  await api.post("/auth/login",{
        username,
        password
    });
}
export const getAuthUser=async()=>{
    return await api.get("/auth/me",{
        headers:{
            Authorization:`Bearer ${Cookies.get("auth-token")}`
        },
    })
}

