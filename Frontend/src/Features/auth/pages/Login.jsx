import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'
import { toast } from 'react-toastify'

const Login = () => {
  const navigate = useNavigate()
  const {loading,handleLogin}=useAuth()
  const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")


  const handleSubmit = async(e)=>{
  e.preventDefault()
const result= await handleLogin({email,password})
 if(result){
  navigate("/app")
 }
 
}
if(loading){
  return(<main><h1>Loading...</h1></main>)
}


  return (
    <main className=" relative flex min-h-screen items-center justify-center bg-[#121214] p-4 text-[#ececf0] sm:p-6">
      <div className="absolute left-4 top-4 sm:left-6 sm:top-6">
  <button
    type="button"
    onClick={() => navigate("/")}
    className="cursor-pointer rounded-lg border border-[#2b2b31] px-3 py-2 text-sm text-[#9a9aa6] transition hover:border-[#8b9cff] hover:text-white"
  >
    ← Back
  </button>
</div>
      <div className="w-full max-w-100 rounded-[14px] border border-[#2b2b31] bg-[#1a1a1d] px-5 py-8 shadow-[0_24px_60px_rgba(0,0,0,0.45)] sm:rounded-2xl sm:px-8 sm:py-10">
        <h1 className="mb-7 text-2xl font-semibold tracking-tight sm:text-[1.75rem]">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm text-[#9a9aa6]">Email</label>
            <input
              type="email"
              id='email'
              required
              placeholder='Enter email address'
              onChange={(e)=>setEmail(e.target.value)}
              value={email}
              className="w-full rounded-[10px] border border-[#2b2b31] bg-[#121214] px-4 py-3 text-base text-[#ececf0] placeholder:text-[#5f5f6b] transition hover:border-[#3a3a42] focus:border-[#8b9cff] focus:outline-none focus:ring-[3px] focus:ring-[#8b9cff]/20"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm text-[#9a9aa6]">Password</label>
            <input
              type="password"
              id='password'
              required
              onChange={(e)=>setPassword(e.target.value)}

              className="w-full rounded-[10px] border border-[#2b2b31] bg-[#121214] px-4 py-3 text-base text-[#ececf0] placeholder:text-[#5f5f6b] transition hover:border-[#3a3a42] focus:border-[#8b9cff] focus:outline-none focus:ring-[3px] focus:ring-[#8b9cff]/20"
            />
          </div>
          <button className="mt-2 cursor-pointer rounded-[10px] bg-[#8b9cff] px-4 py-3 font-semibold text-[#12131a] transition hover:brightness-110 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8b9cff]">
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-[#9a9aa6]">
  Don't have an account?{' '}
  <Link
    to={"/Register"}
    className="font-medium text-[#8b9cff] transition hover:underline hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8b9cff]"
  >
    Register
  </Link>
</p>
      </div>

    </main>
  )
}

export default Login