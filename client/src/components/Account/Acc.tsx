import { FC, useContext } from 'react'
import { Context } from '../../main'
import { observer } from 'mobx-react-lite'

import './Acc.css'

const Account:FC = () => { 

  const {authStore} = useContext(Context)

  return(
    <div className='acc_content'>
      <h1>{authStore.user.nickname}</h1>
      <p>Уровень доступа: {authStore.user.role}</p>
      <p>Почта: {authStore.user.email}</p>
    </div>
  )
}

export default observer(Account)