import { FC, useContext, useState } from "react"
import { Context } from "../../../main"
import { observer } from "mobx-react-lite"

import '../Forms.css'

interface ModalProps { 
  setActive: (active: boolean) => void;
}

const LoginForm: FC<ModalProps> = ({setActive}) => { 

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
      <label>Имя пользователя или e-mail</label>
      <input 
        className="forms_input"
        onChange={e => setEmail(e.target.value)}
        value={email}
        type='text' 
        placeholder='Email'
      />
      <label>Пароль</label>
      <input 
        className='forms_input'
        onChange={e => setPassword(e.target.value)}
        value={password}
        type='password' 
        placeholder='Пароль'
      />
      <label>Никнейм</label>
      <input 
        className='forms_input'
        onChange={e => setNickname(e.target.value)}
        value={nickname}
        type='text' 
        placeholder='Никнейм'
      />
      {errorMessage ? <p className='error_message'>{errorMessage}</p> : ''}
      <button id='forms_reg_btn' onClick = {handleReg}>Регистрация</button>
    </div>
  )
}

export default observer(LoginForm)