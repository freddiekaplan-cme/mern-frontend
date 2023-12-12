import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Index from './routes/index.tsx'

const router = createBrowserRouter([
{
  path: "/",
  element: <App />,
  children: [
    {
      index:true,
      element: <Index />
      
    },
    {
      path: "login",
      element: <p>Login</p>
    },
    {
      path: "sign-up",
      element: <p>Sign up page</p>
    }
    
  ]
}

])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
