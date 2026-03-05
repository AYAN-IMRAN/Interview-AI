import React from 'react'
import { AuthProvider } from './features/auth.context.jsx'
import { RouterProvider } from 'react-router'
import { router } from './app.routes'

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App