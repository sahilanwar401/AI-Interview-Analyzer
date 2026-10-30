import { useContext,useEffect } from "react";
import { AuthContext } from "../auth.context";
import { getME, login, logout, register } from "../services/auth.api";
import { toast } from "react-toastify";
export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async ({ email, password }) => {
setLoading(true);

try {
const data = await login({ email, password });


setUser(data.user);
toast.success("Login successful!");

return true;


} catch (error) {
console.error("Login error:", error);

toast.error(
  error.response?.data?.message || "Invalid email or password"
);

return false;


} finally {
setLoading(false);
}
};

  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    try {
        const data = await register({ username, email, password });
        toast.success("Register successfully")
    setUser(data.user);
        
    } catch (error) {
        console.log(error);
        toast.error("something went wrong")
        
        
    } finally{
         setLoading(false);
    }
   
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      
        const data = await logout();
    setUser(null);
   
        
    } catch (error) {
        console.log(error);
            toast.error("Logout failed, please try again");

        
        
    }finally{
        setLoading(false);
    }
    
  };
  //   useEffect(()=>{
  //   const getAndSetUser = async()=>{
  //       try {
  //         const data = await getME()
  //       setUser(data.user)
          
  //       } catch (error) {
  //         console.log(error);
          
          
  //       }finally{
  //          setLoading(false)
  //       }
       
  //   }
  //   getAndSetUser()
  // },[])
  return { user, loading, handleLogin, handleLogout, handleRegister };
};
