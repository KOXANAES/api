import { FC, useContext, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom";
import { Context } from "../../main"
import { observer } from "mobx-react-lite"

import './Navbar.scss'

import Logo from "../Logo/Logo"

import { ACC_ROUTE, TABLE_ROUTE } from "../../router/Consts";

import DefaultModal from "../Modals/Modal/DefaultModal";
import LoginForm from "../Forms/AuthForms/LoginForm";
import RegForm from "../Forms/AuthForms/RegForm";

const Navbar: FC= () => { 

  const {authStore} = useContext(Context)

  const navigate = useNavigate();

  const [defaultModalActive, setDefautModalActive] = useState<boolean>(false)
  const [changeForm, setChangeForm] = useState(false)

  const handleChangeForm = async() => { 
    setChangeForm(!changeForm)
  }

  const handleOut = async() => { 
    await authStore.logout()
    navigate('/');
  }

  const handleActivate = async() => { 
    await authStore.activate(authStore.user.email)
  }

  return( 
    <div className='navbar'>
      <div className='navbar__left'>
        <Logo/>
      </div>  
        { authStore.isAuth && authStore.user.isActivated &&
          <div className='navigationMenu'>
            <NavLink 
             className={({ isActive }) => isActive ? 'navigationMenu__links active' : 'navigationMenu__links'} 
              to={TABLE_ROUTE}
             >
            Таблица
            </NavLink>
            <NavLink 
             className={({ isActive }) => isActive ? 'navigationMenu__links active' : 'navigationMenu__links'} 
              to={ACC_ROUTE}
            >
            Аккаунт
            </NavLink>
          </div>
        }
      <div className='navbar__right'>
        <div className='greeting'>
          <p>
            {authStore.isAuth ? 
              <span>Добро пожаловать, <span>{authStore.user.nickname}</span></span> 
                : 
              '> Для работы сервиса необходимо войти в аккаунт'
            }
          </p>
          <p>
            {authStore.isAuth && !authStore.user.isActivated && 
              <span className='error_message'>ВНИМАНИЕ! Сервис доступен только для авторизованных пользователей! <button id='activate_btn' onClick={handleActivate}>Активируйте</button> аккаунт по почте <span className='activate_message' id='user_mail_message'>{authStore.user.email}</span></span> 
            }
          </p>
        </div>
        {authStore.isAuth ?
          <button className='orange-btn' onClick={handleOut}>ВЫЙТИ</button> 
        : 
          <button className='orange-btn' onClick={() => setDefautModalActive(!defaultModalActive)}>ВОЙТИ</button>
        }
      </div>
      <DefaultModal active={defaultModalActive} setActive={setDefautModalActive}>
        {changeForm ? 
          <RegForm changeForm={changeForm} handleChangeForm={handleChangeForm} setActive={setDefautModalActive}/>
          :
          <LoginForm changeForm={changeForm} handleChangeForm={handleChangeForm} setActive={setDefautModalActive}/>
        }
      </DefaultModal>
    </div>
  )
}

export default observer(Navbar)