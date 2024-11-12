import { FC, useContext, useState } from "react"
import { Context } from "../../../main"
import { observer } from "mobx-react-lite"

import '../Forms.css'

interface ModalProps { 
  setActive: (active: boolean) => void;
  changeForm: boolean
  handleChangeForm: (active: boolean) => void;
}

const LoginForm: FC<ModalProps> = ({setActive, changeForm, handleChangeForm}) => { 

  const {authStore} = useContext(Context)

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [nickname, setNickname] = useState<string>('')


  const [errorMessage, setErrorMessage] = useState<any>(null)

  const handleReg = async () => { 
    try { 
      await authStore.registration(email, password, nickname)
      setErrorMessage(null)
      setActive(false)
    } catch(e:any) { 
        setErrorMessage(e.response?.data?.message)
    }
  }

  return( 
    <div className='forms'>
      <h2>Регистрация</h2>
      <input 
        className="forms_input"
        onChange={e => setEmail(e.target.value)}
        value={email}
        type='text' 
        placeholder='Email'
      />
      <input 
        className='forms_input'
        onChange={e => setPassword(e.target.value)}
        value={password}
        type='password' 
        placeholder='Пароль'
      />
      <input 
        className='forms_input'
        onChange={e => setNickname(e.target.value)}
        value={nickname}
        type='text' 
        placeholder='Ваше имя'
      />
      {errorMessage ? <p className='error_message'>{errorMessage}</p> : ''}
      <button className='orange-btn' onClick = {handleReg}>Регистрация</button>
      <p className='select__form'><button className='change-btn' onClick={() => handleChangeForm(changeForm)}>перейти к окну авторизации</button></p>
    </div>
  )
}

export default observer(LoginForm)