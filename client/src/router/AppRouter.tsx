import { observer } from "mobx-react-lite"
import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRoutes } from './Routes'
import { useContext } from "react"
import { Context } from "../main"

const AppRouter = () => { 

  const {authStore} = useContext(Context)

  return( 
    <Routes>
    {authStore.isAuth && AuthRoutes.map(({ path, Component }) => (
      <Route key={path} path={path} element={<Component />} />
    ))}
  </Routes>
  )
}

export default observer(AppRouter)