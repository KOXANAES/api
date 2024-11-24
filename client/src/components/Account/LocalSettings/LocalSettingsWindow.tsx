import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Context } from "../../../main";
import SuggestForm from "../../Suggest/Suggest";

import './LocalSettingsWindow.scss'
import DefaultModal from "../../Modals/Modal/DefaultModal";

const LocalSettingsWindow = () => { 

  const {authStore} = useContext(Context)

  const [suggestModalActive, setSuggestModalActive] = useState(false);

  return (
<div className='acc__settings'>
  <div className='profile-data'>
    <h2>Данные профиля</h2>
    <div className='acc__settings___option'>
      <h4>Имя пользователя <button className='change-btn'>Изменить</button></h4>
      <p>{authStore.user.nickname}</p>
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
  <div className='acc__support-section'>
    <button className='green-btn' onClick={() => setSuggestModalActive(true)}>Поддержка</button>
    <DefaultModal active={suggestModalActive} setActive={setSuggestModalActive}>
      <SuggestForm />
    </DefaultModal>
  </div>

</div>
  );
};

export default observer(LocalSettingsWindow)