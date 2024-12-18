import { FC, useContext, useEffect } from "react"
import { Context } from "./main"
import { observer } from "mobx-react-lite"

import Navbar from "./components/Navbar/Navbar"
import { BrowserRouter } from "react-router-dom"

import AppRouter from "./router/AppRouter"

import MySpinner from "./components/Spinner/Spinner"
import TechRouter from "./router/TechRouter"

const App: FC = () => {

  const {authStore} = useContext(Context)

  useEffect(() => { 
    if(localStorage.getItem('token')) { 
      authStore.checkAuth()
    }
  }, [])

  if(authStore.isLoading) { 
    return(
      <MySpinner/>
    )
  }

  return (
    <BrowserRouter
      future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      }}
    >
      <Navbar/>
      <AppRouter/>
      <TechRouter/>
    </BrowserRouter>
  )
}

export default observer(App)