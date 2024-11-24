import { FC, useContext, useEffect, useState } from "react"
import { Context } from "../../../main"
import { observer } from "mobx-react-lite"
import { IInspectionCard } from "../../../models/ICardNew"
import '../TableForms.scss'

interface FillCardProps { 
  setActive: (active: boolean) => void;
  setHomes: (homes: IInspectionCard[]) => void;
  homeProps: IInspectionCard
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

export interface ViolationVariant { 
  id: number; 
  name: string; 
  description: string
}

const FillCardForm: FC<FillCardProps> = ({setActive, setHomes, homeProps}) => {

  const {cardStore} = useContext(Context)

  const [rooms, setRooms] = useState<string>('')
  const [APIs, setAPIs] = useState<string>('')
  const [faultyAPIs, setFaultyAPIs] = useState<string>('')
  const [noBatteryAPIs, setNoBatteryAPIs] = useState<string>('')
  const [ovens, setOvens] = useState<string>('')
  const [faultyOvens, setFaultyOvens] = useState<string>('')
  const [repairNeededOvens, setRepairNeededOvens] = useState<string>('')

  const [residents, setResidents] = useState<Resident[]>([]);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [paternity, setPaternity] = useState('');
  const [birth, setBirth] = useState('');


  const [violationId, setViolationId] = useState<number>()
  const [violations, setViolation] = useState<Violation[]>([])


  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const [violationErrorMessage, setViolationErrorMessage] = useState<string | null>(null)
  const [residentsErrorMessage, setResidentsErrorMessage] = useState<string | null>(null)

  // подгружаем все возможные нарушения
  const [violationVariants, setViolationVariants] = useState<any>([])
  useEffect(() => {
    cardStore.getViolations().then(violations => { 
      if(violations) {setViolationVariants(violations)}
    });
  }, []);

  const formatDate = (date: any) => { 
    if (!date) {
      return '';
    }
    const formattedDate = date.split('.')[0];
    return formattedDate;
  }

  const handleFill = async(id:number) => {
    try { 
      const changeStatus = 'Посещено'
      const fillDate = new Date()
      if(!fillDate || !rooms || !APIs || !faultyAPIs || !noBatteryAPIs || !ovens || !faultyOvens || !repairNeededOvens || !residents || !violations || !changeStatus) {
        const test = 'Не все необходимые поля формы заполнены'
        setErrorMessage(test)
        return
      }
      await cardStore.fillCard(id, rooms, APIs, faultyAPIs, noBatteryAPIs, ovens, faultyOvens, repairNeededOvens, residents, violations, changeStatus, fillDate)
      await cardStore.getCards().then((cards) => {
        if (cards) {
          const updatedCards = cards.map(card => ({
            ...card,
            formattedInspectionDate: formatDate(card.inspectionDate),
            formattedCreationDate: formatDate(card.creationDate),     
            formattedInspectionDeadline: formatDate(card.inspectionDeadline)
          }));
    
          setHomes(updatedCards);
          console.log(updatedCards);
        }
      })
      setErrorMessage(null)
      setActive(false)
    } catch(e:any) { 
      if(e.response.data.errors != 0) { 
        const errorMessages = e.response?.data?.errors.map((error:any) => error.msg )
        setErrorMessage(errorMessages.join(' '))
      } else {
        setErrorMessage(e.response?.data?.message)
      }
    } 
  }

  const handleResidents = async() => { 
    if(residents.length >= 14) { 
      setResidentsErrorMessage('15 проживающих по одному адресу человек - предельно допустимое количество')
      return
    }
    if(!name || !surname || !paternity || !birth) { 
      setResidentsErrorMessage('Укажите имя и фамилию перед добавлением проживающего!')
      return
    }
    const allowedSymbols = /^[А-Яа-яЁё]+$/;
    if (!allowedSymbols.test(name) || !allowedSymbols.test(surname) || !allowedSymbols.test(paternity)) {
      setResidentsErrorMessage('Имя, фамилия и отчество могут содержать только кириллицу, цифры, запятые и тире.');
      return;
    }
    const newResident = {
      name,
      surname,
      paternity,
      birth
    };
    setResidents([...residents, newResident]);
    setName('');
    setSurname('');
    setPaternity('');
    setBirth('');
    setResidentsErrorMessage(null)
  }

  const handleViolations = async () => {
    if (violationId !== undefined) {
      const existingViolation = violations.find(violation => violation.id === violationId);
      if (!existingViolation) {
        const newViolation: Violation = { id: violationId };
        setViolation([...violations, newViolation]);
        setViolationErrorMessage(null)
      } else {
        setViolationErrorMessage('Невозможно добавить 2 одинаковых нарушения!')
      }
    }
  }

  return( 
    <div className='table_cardProfile'>
    <div className='table_cardProfile_header'>
      <h1>Учетная №{homeProps.id}</h1>
    </div>
    <div className='table_cardProfile_creation'>
      <div  className='table_cardProfile_form_inner'>
        <label htmlFor='creationDate_inp_fill'>Дата создания:</label>
        <p>{homeProps.formattedCreationDate}</p>
      </div>
      <div  className='table_cardProfile_form_inner'>
        <label htmlFor='inspectionDeadline_inp_fill'>Срок проверки:</label>
        <p>{homeProps.formattedInspectionDeadline}</p>
      </div>
      <div  className='table_cardProfile_form_inner'>
        <label htmlFor='responsibleWorker_inp_fill'>Ответственный работник:</label>
        <p>{homeProps.responsibleWorker}</p>
      </div>
      <div  className='table_cardProfile_form_inner'>
        <label htmlFor='inspectionDate_inp_fill'>Проверено:</label>
        <p>{homeProps.formattedInspectionDate}</p>
      </div>
      <div  className='table_cardProfile_form_inner'>
        <label htmlFor='status_inp_fill'>Статус:</label>
        {homeProps.status}
      </div>
    </div>
    <div className='table_cardProfile_info'>
      <div  className='table_cardProfile_form_inner'>
        <label htmlFor='homeType_inp_fill'>Тип:</label>
        { homeProps && homeProps.char && homeProps.adress && ( 
          <p>{homeProps.char.homeType}</p>
        )
        }
      </div>
      <div  className='table_cardProfile_form_inner'>
        <label htmlFor='city_inp_fill'>Город:</label>
        { homeProps && homeProps.char && homeProps.adress && ( 
          <p>{homeProps.adress.city}</p>
        )
        }
      </div>
      <div  className='table_cardProfile_form_inner'>
        <label htmlFor='street_inp_fill'>Улица:</label>
        { homeProps && homeProps.char && homeProps.adress && ( 
          <p>{homeProps.adress.street}</p>
        )
        }
      </div>
      <div  className='table_cardProfile_form_inner'>
        <label htmlFor='home_inp_fill'>Дом:</label>
        { homeProps && homeProps.char && homeProps.adress && ( 
          <p>{homeProps.adress.home}</p>
        )
        }
      </div>
      <div  className='table_cardProfile_form_inner'>
        <label htmlFor='apartment_inp_fill'>Квартира:</label>
        { homeProps && homeProps.char && homeProps.adress && ( 
          <p>{homeProps.adress.apartment}</p>
        )
        }
      </div>
      <div  className='table_cardProfile_form_inner'>
        <label htmlFor='rooms_inp_fill'>Кол-во комнат:</label>
        <input id='rooms_inp_fill' className="table_forms_input" onChange={e => setRooms(e.target.value)} value={rooms} type='text'/>
      </div>
      <div  className='table_cardProfile_form_inner'>
        <label htmlFor='APIs_inp_fill'>Кол-во АПИ:</label>
        <input id='APIs_inp_fill' className="table_forms_input" onChange={e => setAPIs(e.target.value)} value={APIs} type='text'/>
      </div>
      <div  className='table_cardProfile_form_inner'>
        <label htmlFor='APIs_inp_fill'>из них неисправны:</label>
        <input id="table_forms_inp_fillut" onChange={e => setFaultyAPIs(e.target.value)} value={faultyAPIs} type='text'/>
      </div>
      <div  className='table_cardProfile_form_inner'>
        <label htmlFor='noBatteryAPIs_inp_fill'>требуют замены питания:</label>
        <input id='noBatteryAPIs_inp_fill' className="table_forms_input" onChange={e => setNoBatteryAPIs(e.target.value)} value={noBatteryAPIs} type='text'/>
      </div>
      <div  className='table_cardProfile_form_inner'>
        <label htmlFor='ovens_inp_fill'>Кол-во печей:</label>
        <input id='ovens_inp_fill' className="table_forms_input" onChange={e => setOvens(e.target.value)} value={ovens} type='text'/>
      </div>
      <div  className='table_cardProfile_form_inner'>
        <label htmlFor='faultyOvens_inp_fill'>из них неисправны:</label>
        <input id='faultyOvens_inp_fill' className="table_forms_input" onChange={e => setFaultyOvens(e.target.value)} value={faultyOvens} type='text'/>
      </div>
      <div  className='table_cardProfile_form_inner'>
        <label htmlFor='repairNeededOvens_inp_fill'>требуют ремонта:</label>
        <input id="repairNeededOvens_inp_fill" onChange={e => setRepairNeededOvens(e.target.value)} value={repairNeededOvens} type='text'/>
      </div>
    </div>
    <div className='table_cardProfile_owner'>
      <div  className='table_cardProfile_form_inner'>
        <label htmlFor='owner_inp'>Владелец:</label>
        { homeProps && homeProps.char && homeProps.adress && ( 
          <p>{homeProps.char.owner}</p>
        )
        }
      </div>
      <div  className='table_cardProfile_form_inner' id='residents_form'>
        <label htmlFor='owner_inp'>Проживающие в доме (с указанием даты рождения):</label>
        <input className="name_inp" onChange={e => setName(e.target.value)} value={name} type='text' placeholder='Имя'/>
        <input className="surname_inp" onChange={e => setSurname(e.target.value)} value={surname} type='text' placeholder='Фамилия'/>
        <input className="paternity_inp" onChange={e => setPaternity(e.target.value)} value={paternity} type='text' placeholder='Отчество'/>
        <input className="birth_inp" onChange={e => setBirth(e.target.value)} value={birth} type='date'/>
        <button onClick={handleResidents}>Добавить</button>
      </div>
      <div  className='table_cardProfile_form_inner'>
        <ul id='residents_list'>
          {residents.map((resident, index) => (
            <li key={index}>{resident.name} {resident.surname} {resident.paternity}, {resident.birth}</li>
          ))}
        </ul>
          {residentsErrorMessage ? <p className='error_message'>{residentsErrorMessage}</p> : ''}
       </div>
      <div  className='table_cardProfile_form_inner'>
        <label htmlFor='category_inp_fill'>Категория:</label>
        { homeProps && homeProps.char && homeProps.adress && ( 
          <p>{homeProps.category}</p>
        )
        }
      </div>
      <div  className='table_cardProfile_form_inner'>
        <label htmlFor='otherInfo_inp_fill'>Иные сведения:</label>
        { homeProps && homeProps.char && homeProps.adress && ( 
          <p>{homeProps.otherInfo}</p>
        )
        }
      </div>
    </div>
    <div className='table_cardProfile_violations'>
      <label>Нарушения:</label>
      <select value={violationId} onChange={e => setViolationId(Number(e.target.value))}>
          <option value=''>Выбрать</option>
          {violationVariants.map((variant: ViolationVariant) => <option key={variant.id} value={variant.id}>{variant.name}</option>)}
      </select>
      <button onClick={handleViolations}>Добавить</button>
      <div  className='table_cardProfile_form_inner'>
        <ul id='violations_list'>
          {violations.map((violation, index) => (
            <li key={index}>{violation.id}</li>
          ))}
        </ul>
      </div>
      {violationErrorMessage ? <p className='error_message'>{violationErrorMessage}</p> : ''}
    </div>
    <div className='table_cardProfile_addForm'>
      <button className='orange-btn' onClick = {() => handleFill(homeProps.id)}>Добавить</button>
    </div>
    <div className='table_profile_error'>
      {errorMessage ? <p className='error_message'>{errorMessage}</p> : ''}
    </div>
  </div>
  )
}

export default observer(FillCardForm)