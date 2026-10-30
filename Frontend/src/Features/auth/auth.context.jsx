
// import { createContext,  useState } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
    
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);


//   return (
//     <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
import { createContext, useEffect, useState } from "react";
import { getME } from "./services/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAndSetUser = async () => {
      try {
        const data = await getME();
        setUser(data?.user || null);
      } catch (error) {
        console.log(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getAndSetUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};