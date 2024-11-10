import { FC, useState } from 'react'
import SuggestForm from '../Suggest/Suggest'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import './Menu.css'

interface Menu { 
  active: boolean,
  setActive: (active:boolean) => void,
}

const Menu:FC<Menu> = ({active, setActive}) => { 

  const [suggestModalActive, setSuggestModalActive] = useState(false)

  return(
    <div className={active ? 'menu active' : 'menu'} onClick={() => setActive(false)}>
      <div className="blur">
        <div className="menu__content" onClick={(e) => e.stopPropagation()}>
          <Link onClick={() => setActive(false)} className='menu__tiles' to='/table'>Таблица</Link>
          <Link onClick={() => setActive(false)} className='menu__tiles' to='/stats'>Статистика</Link>
          <Link onClick={() => setActive(false)} className='menu__tiles tech_btn' to='/account'>Личный кабинет</Link>
          <button onClick={() => setSuggestModalActive(true)} className='menu__tiles tech_btn'>Поддержка</button>
          <SuggestForm active={suggestModalActive} setActive={setSuggestModalActive}/>
        </div>
      </div>
    </div>
  )
}

export default observer(Menu)