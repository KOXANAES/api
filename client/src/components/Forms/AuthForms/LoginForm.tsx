import { FC, useContext, useState } from "react"
import { Context } from "../../../main"
import { observer } from "mobx-react-lite"

import '../Forms.css'

interface ModalProps { 
  setActive: (active: boolean) => void;
  changeForm: boolean
  handleChangeForm: (active: boolean) => void;
}

import { useNavigate } from "react-router-dom";
import { TABLE_ROUTE } from "../../../router/Consts";

const LoginForm: FC<ModalProps> = ({setActive, changeForm, handleChangeForm}) => { 

  const {authStore} = useContext(Context)

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null)

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')


  const handleLogin = async () => { 
    try { 
      await authStore.login(email, password)
      setErrorMessage(null)
      setActive(false)
      navigate(TABLE_ROUTE);
    } catch(e:any) { 
      setErrorMessage(e.response?.data?.message)
    }
  }

  return( 
    <div className='forms'>
      <h2>Авторизация</h2>
      <input 
        className="forms_input"
        onChange={e => setEmail(e.target.value)}
        value={email}
        type='text' 
        placeholder='Email'
      />
      <input 
        className="forms_input"
        onChange={e => setPassword(e.target.value)}
        value={password}
        type='password' 
        placeholder='Пароль'
      />
      {errorMessage ? <p className='error_message'>{errorMessage}</p> : ''}
      <button className='orange-btn' onClick = {handleLogin}>Войти!</button>
      <p className='select__form'>Если у вас нет аккаунта, вы можете <button className='change-btn' onClick={() => handleChangeForm(changeForm)}>перейти к окну регистрации</button></p>
    </div>
  )
}

export default observer(LoginForm)