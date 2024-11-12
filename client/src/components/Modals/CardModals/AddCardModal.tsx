import { FC } from 'react'
import { IInspectionCard } from '../../../models/ICardNew';
import AddCardForm from '../../Forms/CardForms/AddCardForm';

import './../Modal.css'
import { IUser } from '../../../models/IUser';

interface AddCardModal { 
  active: boolean;
  setActive: (active: boolean) => void;
  setHomes: (homes: IInspectionCard[]) => void;
  usersArr: IUser[];

}

const AddCardModal: FC<AddCardModal> = ({usersArr, active, setActive, setHomes}) => { 
  return( 
    <div className={active ? 'modal active' : 'modal'} onClick={() => {setActive(false)}}>
      <div className={active ? 'modal__content active' : 'modal__content'} onClick={e => e.stopPropagation()}>
        <AddCardForm usersArr={usersArr} setActive={setActive} setHomes={setHomes}/>
      </div>
    </div>
  )
}

export default AddCardModal