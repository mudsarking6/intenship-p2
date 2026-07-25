export type AuthUser = { id:string; name:string; email:string; role:string; organization:string; phone?:string; jobTitle?:string; permissions:string[] };
type AuthResponse = { token:string; user:AuthUser };
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const TOKEN_KEY = "spacesync_session";

export async function apiRequest<T>(path:string, options:RequestInit={}):Promise<T>{
  const token=typeof window!=="undefined"?localStorage.getItem(TOKEN_KEY):null;
  const response=await fetch(`${API_URL}${path}`,{...options,headers:{"Content-Type":"application/json",...(token?{Authorization:`Bearer ${token}`}:{ }),...options.headers}});
  const data=await response.json().catch(()=>({}));
  if(!response.ok) throw new Error(data.message||"Something went wrong.");
  return data;
}
export async function login(email:string,password:string){const data=await apiRequest<AuthResponse>("/auth/login",{method:"POST",body:JSON.stringify({email,password})});localStorage.setItem(TOKEN_KEY,data.token);return data.user}
export async function register(input:{name:string;email:string;password:string;organization:string}){const data=await apiRequest<AuthResponse>("/auth/register",{method:"POST",body:JSON.stringify(input)});localStorage.setItem(TOKEN_KEY,data.token);return data.user}
export async function getCurrentUser(){if(!localStorage.getItem(TOKEN_KEY))return null;try{return(await apiRequest<{user:AuthUser}>("/auth/me")).user}catch{localStorage.removeItem(TOKEN_KEY);return null}}
export async function forgotPassword(email:string){return apiRequest<{message:string}>("/auth/forgot-password",{method:"POST",body:JSON.stringify({email})})}
export function logout(){localStorage.removeItem(TOKEN_KEY)}
