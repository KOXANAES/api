import { FC, useContext, useState } from "react"
import { Context } from "../../../main"
import { observer } from "mobx-react-lite"

import '../Forms.css'

interface ModalProps { 
  setActive: (active: boolean) => void;
}

import { useNavigate } from "react-router-dom";
import { TABLE_ROUTE } from "../../../router/Consts";

const LoginForm: FC<ModalProps> = ({setActive}) => { 

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
      <label>E-mail</label>
      <input 
        className="forms_input"
        onChange={e => setEmail(e.target.value)}
        value={email}
        type='text' 
        placeholder='Email'
      />
      <label>Пароль</label>
      <input 
        className="forms_input"
        onChange={e => setPassword(e.target.value)}
        value={password}
        type='password' 
        placeholder='Пароль'
      />
      {errorMessage ? <p className='error_message'>{errorMessage}</p> : ''}
      <div className='forms_down'>
        <p className='forms_suggest'>Нет аккаунта? Зарегистрируйся!</p>
        <button id='forms_login_btn' onClick = {handleLogin}>Войти!</button>
      </div>
    </div>
  )
}

export default observer(LoginForm)