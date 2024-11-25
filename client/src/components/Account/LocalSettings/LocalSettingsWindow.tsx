import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Context } from "../../../main";

import './LocalSettingsWindow.scss'

const LocalSettingsWindow = () => { 

  const {authStore} = useContext(Context)

  const [changeNicknameBar, setChangeNicknameBar] = useState<boolean>(false)
  const [newNickname, setNewNickname] = useState<string>('')


  const [nickErrorMessage, setNickErrorMessage] = useState<string | null>(null)


  const handleNewNickname = async() => { 
    const email = authStore.user.email
    const oldNickname = authStore.user.nickname
    try { 
      if(!newNickname) {
        setNickErrorMessage('Никнейм не может быть пустым!')
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

  const handleNicknameForm = async(e:any) => { 
    setNewNickname(e.target.value)
    setNickErrorMessage(null)
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
        <h4>E-mail <button className='change-btn'>Изменить</button></h4>
        <p>{authStore.user.email}</p>
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