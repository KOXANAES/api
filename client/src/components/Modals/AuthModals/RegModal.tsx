import { FC } from 'react'
import './../Modal.css'
import RegForm from '../../Forms/AuthForms/RegForm';

interface ModalProps { 
  active: boolean;
  setActive: (active: boolean) => void;
}

const RegModal: FC<ModalProps> = ({active, setActive}) => { 
  return( 
    <div className={active ? 'modal active' : 'modal'} onClick={() => {setActive(false)}}>
      <div className={active ? 'modal__content active' : 'modal__content'} onClick={e => e.stopPropagation()}>
        <RegForm setActive={setActive}/>
      </div>
    </div>
  )
}

export default RegModal