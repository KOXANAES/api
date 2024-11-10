import { FC } from 'react'
import './../Modal.css'
import LoginForm from '../../Forms/AuthForms/LoginForm';

interface ModalProps { 
  active: boolean;
  setActive: (active: boolean) => void;
}

const LoginModal: FC<ModalProps> = ({active, setActive}) => { 
  return( 
    <div className={active ? 'modal active' : 'modal'} onClick={() => {setActive(false)}}>
      <div className={active ? 'modal__content active' : 'modal__content'} onClick={e => e.stopPropagation()}>
        <LoginForm setActive={setActive}/>
      </div>
    </div>
  )
}

export default LoginModal