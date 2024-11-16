import { FC, useContext, useEffect } from "react"
import { Context } from "./main"
import { observer } from "mobx-react-lite"

import Navbar from "./components/Navbar/Navbar"
import { BrowserRouter } from "react-router-dom"

import AppRouter from "./router/AppRouter"

import MySpinner from "./components/Spinner/Spinner"

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
    <>
      <BrowserRouter>
        <Navbar/>
        <AppRouter/>
      </BrowserRouter>
    </>
  )
}

export default observer(App)