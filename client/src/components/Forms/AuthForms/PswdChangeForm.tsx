import { FC, useContext, useState } from "react"
import { Context } from "../../../main"
import { observer } from "mobx-react-lite"

import '../Forms.scss'

const PswdChangeForm: FC = () => { 

  const {authStore} = useContext(Context)

  const [oldPassword, setOldPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string | null>('')
  const [passwordSuccessMessage, setPasswordSuccessMessage] = useState<string | null>('')

  const handleOldPswdForm = async(e:any) => { 
    setOldPassword(e.target.value)
    setPasswordErrorMessage(null)
    setPasswordSuccessMessage(null)
  }
  const handleNewPswdForm = async(e:any) => { 
    setNewPassword(e.target.value)
    setPasswordErrorMessage(null)
    setPasswordSuccessMessage(null)
  }
  const handleConfirmPswdForm = async(e:any) => { 
    setConfirmPassword(e.target.value)
    setPasswordErrorMessage(null)
    setPasswordSuccessMessage(null)
  }
  const handleChangePassword = async() => { 
    if(!oldPassword || !newPassword || !confirmPassword) {
        setPasswordErrorMessage('Заполните все поля формы!')
        return
    }
    if(newPassword != confirmPassword) {
        setPasswordErrorMessage('Новый и подтверждающий пароли не совпадают!')
        return
    }
    const email = authStore.user.email
    try {
      await authStore.changePassword(email, oldPassword, newPassword, confirmPassword)
      setPasswordSuccessMessage('Пароль был успешно изменён. Используйте его при входе в систему')
    } catch(e:any) { 
        if(e.response.data.errors != 0) { 
          const errorMessages = e.response?.data?.errors.map((error:any) => error.msg )
          setPasswordErrorMessage(errorMessages.join(' '))
        } else {
            setPasswordErrorMessage(e.response?.data?.message)
        }
      }
  }
  return( 
    <div className='forms'>
        <h2>Изменение пароля</h2>
        <input 
            className='forms_input' 
            type='text' 
            placeholder='Введите старый пароль'
            onChange={e => handleOldPswdForm(e)}
            value={oldPassword}
        />
        <input 
            className='forms_input' 
            type='text' 
            placeholder='Введите новый пароль'
            onChange={e => handleNewPswdForm(e)}
            value={newPassword}
        />
        <input 
            className='forms_input' 
            type='text' 
            placeholder='Подтвердите новый пароль'
            onChange={e => handleConfirmPswdForm(e)}
            value={confirmPassword}
        />
        <button className='changeUserParams-btn' onClick={() => handleChangePassword()}>Изменить</button>
        <span>{passwordErrorMessage ? <p className='error_message'>{passwordErrorMessage}</p> : ''}</span>
        <span>{passwordSuccessMessage ? <p className='tech_message'>{passwordSuccessMessage}</p> : ''}</span>
    </div>
  )
}

export default observer(PswdChangeForm)