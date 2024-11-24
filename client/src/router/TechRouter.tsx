import { observer } from "mobx-react-lite"
import { Route, Routes } from "react-router-dom"
import { TechRoutes } from './Routes'
import { useContext } from "react"
import { Context } from "../main"

const TechRouter = () => { 
  const { authStore } = useContext(Context);

  return ( 
    <>
      <Routes>
        {authStore.isAuth && authStore.user.isActivated && TechRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))} 
      </Routes>
    </>
  );
}

export default observer(TechRouter)