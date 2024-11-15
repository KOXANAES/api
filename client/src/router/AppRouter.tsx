import { observer } from "mobx-react-lite"
import { Route, Routes } from "react-router-dom"
import { AuthRoutes, PublicRoutes } from './Routes'

const AppRouter = () => { 

  return( 
    <Routes>
    {AuthRoutes.map(({ path, Component }) => (
      <Route key={path} path={path} element={<Component />} />
    ))}
    {PublicRoutes.map(({ path, Component }) => (
      <Route key={path} path={path} element={<Component />} />
    ))}
  </Routes>
  )
}

export default observer(AppRouter)