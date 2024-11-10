import { FC } from 'react'
import { IInspectionCard } from '../../../models/ICardNew';
import CardProfile from '../../Profiles/CardProfile';
import './../Modal.css'

interface ProfileCardModal { 
  active: boolean;
  setActive: (active: boolean) => void;
  home: IInspectionCard;
  setHomes: (homes: IInspectionCard[]) => void;
}

const ProfileCardModal: FC<ProfileCardModal> = ({active, setActive, setHomes, home}) => { 
  return( 
    <div className={active ? 'modal active' : 'modal'} onClick={() => {setActive(false)}}>
      <div className={active ? 'modal__content active' : 'modal__content'} onClick={e => e.stopPropagation()}>
        <CardProfile setActive={setActive} setHomes={setHomes} home={home}/>
      </div>
    </div>
  )
}

export default ProfileCardModal