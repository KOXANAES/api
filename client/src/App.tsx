import { FC, useContext, useEffect, useState } from "react"
import { Context } from "./main"
import { observer } from "mobx-react-lite"

import Navbar from "./components/Navbar/Navbar"
import { BrowserRouter } from "react-router-dom"

import AppRouter from "./router/AppRouter"

import MySpinner from "./components/Spinner/Spinner"
import Menu from "./components/Menu/Menu"

const App: FC = () => {

  const {authStore} = useContext(Context)

  const [menuActive, setMenuActive] = useState(false)

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
        <Navbar active={menuActive} setActive={setMenuActive}/>
        {authStore.isAuth && authStore.user.isActivated ? 
        <div>
          <Menu active={menuActive} setActive={setMenuActive}/>
        </div>
          : 
        ''
      }  
        <AppRouter/>
      </BrowserRouter>
    </>
  )
}

export default observer(App)