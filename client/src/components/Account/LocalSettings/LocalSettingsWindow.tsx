import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Context } from "../../../main";

import './LocalSettingsWindow.scss'

const LocalSettingsWindow = () => { 

  const {authStore} = useContext(Context)

  const [changeNicknameBar, setChangeNicknameBar] = useState<boolean>(false)
  const [changeEmailBar, setChangeEmailBar] = useState<boolean>(false)
  const [newNickname, setNewNickname] = useState<string>('')
  const [newEmail, setNewEmail] = useState<string>('')


  const [nickErrorMessage, setNickErrorMessage] = useState<string | null>(null)
  const [emailErrorMessage, setEmailErrorMessage] = useState<string | null>(null)


  const handleNewNickname = async() => { 
    const email = authStore.user.email
    const oldNickname = authStore.user.nickname
    try { 
      if(!newNickname) {
        setNickErrorMessage('Никнейм не может быть пустым!')
        return
      }
      if(oldNickname === newNickname) { 
        setNickErrorMessage('Текущий и новый никнеймы совпадают!')
        return
      }
      await authStore.updateNickname(email, oldNickname, newNickname)
    } catch(e:any) { 
      if(e.response.data.errors != 0) { 
        const errorMessages = e.response?.data?.errors.map((error:any) => error.msg )
        setNickErrorMessage(errorMessages.join(' '))
      } else {
        setNickErrorMessage(e.response?.data?.message)
      }
    }
  }

  const handleNewEmail = async() => { 
    const email = authStore.user.email
    try { 
      if(!newEmail) {
        setEmailErrorMessage('Email не может быть пустым!')
        return
      }
      if(email === newEmail) { 
        setEmailErrorMessage('Текущая и новая почты совпадают!')
        console.log('123')
        return
      }
      await authStore.updateEmail(email, newEmail)
    } catch(e:any) { 
      if(e.response.data.errors != 0) { 
        const errorMessages = e.response?.data?.errors.map((error:any) => error.msg )
        setEmailErrorMessage(errorMessages.join(' '))
      } else {
        setEmailErrorMessage(e.response?.data?.message)
      }
    }
  }

  const handleNicknameForm = async(e:any) => { 
    setNewNickname(e.target.value)
    setNickErrorMessage(null)
  }
  const handleEmailForm = async(e:any) => { 
    setNewEmail(e.target.value)
    setEmailErrorMessage(null)
  }

  return (
    <div className='acc__settings'>
      <h2>Данные профиля</h2>
      <div className='acc__settings___option'>
        <h4>Имя пользователя <button className='change-btn' onClick={() => setChangeNicknameBar(!changeNicknameBar)}>Изменить</button></h4>
        <div className='acc__settings___option__info'>
          <div>{authStore.user.nickname}</div>
          {changeNicknameBar && 
          <div className='changeUserParam__container'>
            <input 
              className='forms__change' 
              type='text' 
              placeholder='Введите новый никнейм'
              onChange={e => handleNicknameForm(e)}
              value={newNickname}
            />
            <button className='changeUserParams-btn' onClick={() => handleNewNickname()}>Изменить</button>
            <span>{nickErrorMessage ? <p className='error_message'>{nickErrorMessage}</p> : ''}</span>
          </div>   
          }
        </div>
      </div>
      <div className='acc__settings___option'>
      <h4>Имя пользователя <button className='change-btn' onClick={() => setChangeEmailBar(!changeEmailBar)}>Изменить</button></h4>
        <div className='acc__settings___option__info'>
          <div>{authStore.user.email}</div>
          {changeEmailBar && 
          <div className='changeUserParam__container'>
            <input 
              className='forms__change' 
              type='text' 
              placeholder='Введите новую почту'
              onChange={e => handleEmailForm(e)}
              value={newEmail}
            />
            <button className='changeUserParams-btn' onClick={() => handleNewEmail()}>Изменить</button>
            <span>{emailErrorMessage ? <p className='error_message'>{emailErrorMessage}</p> : ''}</span>
          </div>   
          }
        </div>
      </div>
      <div className='acc__settings___option'>
        <h4>Пароль <button className='change-btn'>Изменить</button></h4>
        <p>*******</p>
      </div>
      <div className='acc__settings___option'>
        <h4>Уровень доступа</h4>
        <p>{authStore.user.isActivated ? `${authStore.user.role}` : `Аккаунт не активирован` }</p>
      </div>

    </div>
  );
};

export default observer(LocalSettingsWindow)