import React from 'react'
import { AuthProvider } from './features/auth.context.jsx'
import { RouterProvider } from 'react-router'
import { router } from './app.routes'



// Lauout Follow 4 layer Architecture UI,HOOK,STATE,API 
function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App