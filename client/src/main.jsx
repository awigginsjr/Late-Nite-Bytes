// import React from 'react'
// import ReactDOM from 'react-dom/client'

// import './index.css'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )

import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


import App from './App.jsx'
import "./App.css"
import Register from "./components/Register.jsx"
import Login from "./components/Login.jsx"
import Homepage from "./components/Homepage.jsx"

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className="display-2">Wrong page!</h1>,
    children: [
     {
       index: true,
        element: <Homepage />,
      },
      {
       path: '/signup',
      element: <Register />,
        
      },
       {
        path: '/login',
        element: <Login />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
