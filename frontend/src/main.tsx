import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import About from './pages/About/About'
import Home from './pages/Home/Home'
import Login from './components/Login/Login.tsx'
import Register from './components/Register/Register.tsx'
import ErrorPage from './pages/ErrorPage/ErrorPage.tsx'
import { RouterProvider , createBrowserRouter , createRoutesFromElements , Route } from 'react-router-dom'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route path='' element={<App/>}/>
      <Route path='about' element={<About/>}/>
      <Route path='broadcast' element={<Home/>} />
      <Route path='login' element={<Login/>}/>
      <Route path='register' element={<Register/>}/>
      <Route path='*' element={<ErrorPage/>}/>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
