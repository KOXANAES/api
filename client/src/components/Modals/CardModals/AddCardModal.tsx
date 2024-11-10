import { FC } from 'react'
import { IInspectionCard } from '../../../models/ICardNew';
import AddCardForm from '../../Forms/CardForms/AddCardForm';

import './../Modal.css'

interface AddCardModal { 
  active: boolean;
  setActive: (active: boolean) => void;
  setHomes: (homes: IInspectionCard[]) => void;
}

const AddCardModal: FC<AddCardModal> = ({active, setActive, setHomes}) => { 
  return( 
    <div className={active ? 'modal active' : 'modal'} onClick={() => {setActive(false)}}>
      <div className={active ? 'modal__content active' : 'modal__content'} onClick={e => e.stopPropagation()}>
        <AddCardForm setActive={setActive} setHomes={setHomes}/>
      </div>
    </div>
  )
}

export default AddCardModal