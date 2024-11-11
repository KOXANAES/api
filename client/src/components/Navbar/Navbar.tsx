import { FC, useContext, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom";
import { Context } from "../../main"
import { observer } from "mobx-react-lite"
import RegModal from "../Modals/AuthModals/RegModal"
import LoginModal from "../Modals/AuthModals/LoginModal"
import './Navbar.css'

import Logo from "../Logo/Logo"

import logo from '../../assets/images/fire.png'
import { ACC_ROUTE, TABLE_ROUTE } from "../../router/Consts";
import SuggestForm from "../Suggest/Suggest";

interface Navbar { 
}

const Navbar: FC<Navbar> = ({}) => { 

  const {authStore} = useContext(Context)

  const navigate = useNavigate();

  const [loginModalActive, setLoginModalActive] = useState<boolean>(false)
  const [regModalActive, setRegModalActive] = useState<boolean>(false)

  const handleOut = async() => { 
    await authStore.logout()
    navigate('/');
  }
  

  const handleActivate = async() => { 
    await authStore.activate(authStore.user.email)
  }

  return( 
    <div className='navbar'>
      <div className='navbar_left'>
        <Logo/>
      </div>
      <div className='navigationMenu'>
        <NavLink 
            className={({ isActive }) => 
                isActive ? 'navigationMenu__links active' : 'navigationMenu__links'
            } 
            to={TABLE_ROUTE}
        >
            Таблица
            </NavLink>
            <NavLink 
            className={({ isActive }) => 
                isActive ? 'navigationMenu__links active' : 'navigationMenu__links'
            } 
            to={ACC_ROUTE}
        >
            Аккаунт
            </NavLink>
      </div>
      <div className='navbar_right'>
        <div className='greeting'>
          <p>{authStore.isAuth ? <span>Добро пожаловать, <span>{authStore.user.nickname}</span>. Нажмите на <img src={logo} alt='' style={{width:'15px', height:'15px'}}></img> чтобы открыть меню</span> : '> Для работы сервиса необходимо войти в аккаунт'}</p>
          <p>{authStore.isAuth && !authStore.user.isActivated ? <span className='activate_message'>ВНИМАНИЕ! Сервис доступен только для авторизованных пользователей! <button id='activate_btn' onClick={handleActivate}>Активируйте</button> аккаунт по почте <span className='activate_message' id='user_mail_message'>{authStore.user.email}</span></span> : ''}</p>
        </div>
        {authStore.isAuth ? '' : <button className='orange-btn' onClick={() => setLoginModalActive(true)}>ВОЙТИ</button>}
          <LoginModal active={loginModalActive} setActive={setLoginModalActive}/>
        {authStore.isAuth ? '' : <button className='orange-btn' onClick={() => setRegModalActive(true)}> РЕГИСТРАЦИЯ</button>}
          <RegModal active={regModalActive} setActive={setRegModalActive}/>
        {authStore.isAuth ? <button className='orange-btn' onClick={handleOut}>Выйти</button> : ''}
      </div>
    </div>
  )
}

export default observer(Navbar)