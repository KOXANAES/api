import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Context } from "../../../main";
import SuggestForm from "../../Suggest/Suggest";

import './LocalSettingsWindow.css'

const LocalSettingsWindow = () => { 

  const {authStore} = useContext(Context)

  const [suggestModalActive, setSuggestModalActive] = useState(false);

  const handleChangeNickname = async() => { 
    
  }

  return (
<div className='acc__settings'>
  <div className='profile-data'>
    <h2>Данные профиля</h2>
    <div className='acc__settings___option'>
      <h4>Имя пользователя <button onClick={handleChangeNickname} className='acc__change-btn'>Изменить</button></h4>
      <p>{authStore.user.nickname}</p>
    </div>
    <div className='acc__settings___option'>
      <h4>E-mail <button className='acc__change-btn'>Изменить</button></h4>
      <p>{authStore.user.email}</p>
    </div>
    <div className='acc__settings___option'>
      <h4>Пароль <button className='acc__change-btn'>Изменить</button></h4>
      <p>*******</p>
    </div>
    <div className='acc__settings___option'>
      <h4>Уровень доступа</h4>
      <p>{authStore.user.isActivated ? `${authStore.user.role}` : `Аккаунт не активирован` }</p>
    </div>
  </div>
  <div className='acc__support-section'>
    <button className='green-btn' onClick={() => setSuggestModalActive(true)}>Поддержка</button>
    <SuggestForm active={suggestModalActive} setActive={setSuggestModalActive}/>
  </div>

</div>
  );
};

export default observer(LocalSettingsWindow)