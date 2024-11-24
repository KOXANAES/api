import { FC } from 'react'

import './DefaultModal.css'

interface DefaultModal { 
  active: boolean;
  setActive: (active: boolean) => void;
  children: any
}

const DefaultModal: FC<DefaultModal> = ({active, setActive, children}) => { 
  return( 
    <div className={active ? 'modal active' : 'modal'} onClick={() => {setActive(false)}}>
      <div className={active ? 'modal__content active' : 'modal__content'} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default DefaultModal