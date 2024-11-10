import { FC } from 'react'
import FillCardForm from '../../Forms/CardForms/FillCardForm';
import { IInspectionCard } from '../../../models/ICardNew';
import './../Modal.css'


interface FillCardModal { 
  active: boolean;
  setActive: (active: boolean) => void;
  setHomes: (homes: IInspectionCard[]) => void;
  home: IInspectionCard
}

const FillCardModal: FC<FillCardModal> = ({active, setActive, setHomes, home}) => { 
  return( 
    <div className={active ? 'modal active' : 'modal'} onClick={() => {setActive(false)}}>
      <div className={active ? 'modal__content active' : 'modal__content'} onClick={e => e.stopPropagation()}>
        <FillCardForm setActive={setActive} setHomes={setHomes} homeProps={home}/> 
      </div>
    </div>
  )
}

export default FillCardModal