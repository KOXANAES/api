import { FC, useContext, useState } from 'react'
import './Suggest.css'
import { Context } from '../../main'

interface SuggestForm { 
  active: boolean,
  setActive: (active:boolean) => void,
}

const SuggestForm:FC<SuggestForm> = ({active, setActive}) => { 

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
    <div className={active ? 'suggestForm active' : 'suggestForm'} onClick={() => setActive(false)}>
      <div className={active ? 'suggestForm_content active' : 'suggestForm_content'} onClick={e => e.stopPropagation()}>
          <p id='tech_header'>
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
          <button className='send_suggest_btn' onClick={() => handleTech(message)}>Отправить</button>
      </div>
    </div>
  )
}

export default SuggestForm