import { observer } from 'mobx-react-lite'
import './About.scss'
import { FC } from 'react'

const About:FC = () => { 

  return(
    <div className='tech__content'>
      <ul className='tech__docs'>
        <li>
            <span className='tech__second__header'>Что такое EMBERA?</span>
            <p className='root__answer'>
            EMBERA - электронная система учёта проведения пожарно-профилактической работы.
            </p>
          </li>
          <li>
            <span className='tech__second__header'>Что такое EMBERA?</span>
            <p className='root__answer'>EMBERA - это</p>
          </li>
          <li>
            <span className='tech__second__header'>Что такое EMBERA?</span>
            <p className='root__answer'>EMBERA - это</p>
          </li>
          <li>
            <span className='tech__second__header'>Что такое EMBERA?</span>
            <p className='root__answer'>EMBERA - это</p>
          </li>
          <li>
            <span className='tech__second__header'>Что такое EMBERA?</span>
            <p className='root__answer'>EMBERA - это</p>
          </li>
      </ul>
        
    </div>
  )
}

export default observer(About)