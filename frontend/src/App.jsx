import React from 'react'
import { AuthProvider } from './features/auth.context.jsx'
import { RouterProvider } from 'react-router'
import { router } from './app.routes'
import { InterviewProvider } from './features/interview.context.jsx'

// Lauout Follow 4 layer Architecture UI,HOOK,STATE,API 
function App() {
  return (
    <AuthProvider>
      <InterviewProvider>
<RouterProvider router={router} />

      </InterviewProvider>
      
    </AuthProvider>
  )
}

export default App