
import { RouterProvider } from 'react-router'
import { router } from "./app.routes.jsx"
import { AuthProvider } from './Features/auth/auth.context.jsx'
import { InterviewProvider } from './Features/interview/Interview.context.jsx'
 import { ToastContainer, toast } from 'react-toastify';
const App = () => {
  return (
    
    
    <AuthProvider>
      <ToastContainer />
      
      <InterviewProvider>
      <RouterProvider router={router}/>
      </InterviewProvider>

    </AuthProvider>
    
    
  )
}

export default App