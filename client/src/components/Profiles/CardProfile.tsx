import './CardProfile.css'
import { FC, useContext, useState } from 'react'
import { IInspectionCard } from '../../models/ICardNew';
import { Context } from '../../main';
import edit from '../../assets/images/edit.png'

interface CardProfile { 
  setActive: (active: boolean) => void;
  setHomes: (homes: IInspectionCard[]) => void;
  home: IInspectionCard
}

export interface Resident {
  name: string;
  surname: string;
  paternity: string;
  birth: string;
}

export interface Violation {
  id: number;
}

const CardProfile:FC<CardProfile> = ({setActive, setHomes, home}) => { 

  const {cardStore} = useContext(Context)

  const [errorMessage, setErrorMessage] = useState(null)
  
  console.log(home)
  
  const handleEdit = async() => { 
    alert('123')
  }


  return(
  <div className='cardProfile'>
    <div className='cardProfile_header'>
      <h1>Учетная форма №{home.id}</h1>
      <p>По результатам посещения объекта жилищного фонда</p>
    </div>
    <div className='cardProfile_creation'>
      {home && (
        <ul className='profile_list'>
          <li><p>Дата создания:</p><p>{home.creationDate}<img className='edit_img' src={edit} alt='edit' onClick={() => handleEdit()}/></p></li>
          <li>Срок проверки: {home.inspectionDeadline}</li>
          <li>Ответственный работник: {home.responsibleWorker}</li>
          <li>Проверено: {home.inspectionDate}</li>
          <li>Статус: {home.status}</li>
        </ul>
      )}
    </div>
    <div className='cardProfile_info'>
      {home && home.char && home.adress && (
        <ul className='profile_list'>
          <li>Тип: {home.char.homeType}</li>
          <li>Адрес: {`${home.adress.city} ${home.adress.street} ${home.adress.home} ${home.adress.apartment}`}</li>
          <li>Кол-во комнат: {home.char.rooms}</li>
          <li>Кол-во АПИ: {home.char.APIs}</li>
          <li>из них неисправны: {home.char.faultyAPIs}</li>
          <li>требуют замены питания: {home.char.noBatteryAPIs}</li>
          <li>Кол-во печей: {home.char.ovens}</li>
          <li>из них неисправны: {home.char.faultyOvens}</li>
          <li>требуют ремонта: {home.char.repairNeededOvens}</li>
        </ul>
      )}
    </div>
    <div className='cardProfile_owner'>
      {home && home.char && home.residents && (
        <ul className='profile_list'>
          <li>Владелец: {home.char.owner}</li>
          <li>Фактически проживающие в доме:</li>
          {home.residents.map((resident, index) => (
            <li key={index}>{resident.name} {resident.surname} {resident.paternity}</li>
          ))}
          <li>Категория: {home.category}</li>
          <li>Иные сведения: {home.otherInfo}</li>
        </ul>
      )}
    </div>
    <div className='cardProfile_violations'>
      {home && home.violations && home.violations.length > 0 && (
        <ul className='profile_list'>
          {home.violations.map((violation, index) => (
            <li key={index}>{violation.name} {violation.description}</li>
          ))}
        </ul>
      )}
    </div>
  </div>
  )
}

export default CardProfile