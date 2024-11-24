import { FC, useContext, useState } from 'react'
import { Context } from '../../main'
import './Suggest.scss'

const SuggestForm:FC = () => { 

  const {authStore} = useContext(Context)

  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [techMessage, setTechMessage] = useState(null)

  const handleTech = async (message:string) => { 
    try { 
      const response = await authStore.sendTechMessage(authStore.user.email, message)
      setErrorMessage(null)
      setTechMessage(response)
    } catch(e:any) { 
      setErrorMessage(e.response?.data?.message)
    }
  }

  return(
    <div>
      <p>
        <span id='tech_header_username'>{authStore.user.nickname}</span>, если Вы обнаружили сбои в работе приложения, некорректные ответы сервисов, 
        или же у Вас есть предложения по улучшению и развитию проекта, свяжитеcь с технической поддержкой сайта. 
        Ваша обратная связь очень важна для нас!
      </p>
      <textarea
        className='message_input'
        onChange={e => setMessage(e.target.value)}
        placeholder='Введите ваше сообщение здесь'
        value={message}
      />
      {techMessage ? <p className='tech_message'>{techMessage}</p> : ''}
      {errorMessage ? <p className='error_message'>{errorMessage}</p> : ''}
      <button className='green-btn' onClick={() => handleTech(message)}>Отправить</button>
    </div>
  )
}

export default SuggestForm