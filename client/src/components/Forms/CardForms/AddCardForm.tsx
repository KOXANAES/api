import { FC, useContext, useState } from "react"
import { Context } from "../../../main"
import { observer } from "mobx-react-lite"
import { IInspectionCard } from '../../../models/ICardNew';
import '../TableForms.css'
import { IUser } from "../../../models/IUser";


interface AddCardFormProps { 
  setActive: (active: boolean) => void;
  setHomes: (homes: IInspectionCard[]) => void;
  usersArr: IUser[];

}

const AddCardForm: FC<AddCardFormProps> = ({usersArr, setActive, setHomes}) => {

  const {cardStore} = useContext(Context)

  const [inspectionDate, setInspectionDate] = useState<string>('')
  const [inspectionDeadline, setInspectionDeadline] = useState<Date>(new Date())
  const [responsibleWorker, setResponsibleWorker] = useState<string>('')
  const [otherInfo, setOtherInfo] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [street, setStreet] = useState<string>('')
  const [home, setHome] = useState<string>('')
  const [apartment, setApartment] = useState<string>('')
  const [homeType, setHomeType] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [owner, setOwner] = useState<string>('')

  const [errorMessage, setErrorMessage] = useState(null)

  const handleAdd = async() => { 
    const creationDate = new Date()
    console.log(creationDate)
    try { 
      await cardStore.addCard(creationDate, inspectionDate, inspectionDeadline, responsibleWorker, otherInfo, city, street, home, apartment, homeType, category, owner)
      await cardStore.getCards().then((cards) => {
        if (cards) {
          setHomes(cards);
        }
      })
      setErrorMessage(null)
      // setActive(false)
    } catch(e:any) { 
      setErrorMessage(e.response?.data?.message)
    }
  }

  // функция для отображения выбранной даты в самом input'e
  const formatDateToInput = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  
  const handleDeadlineDate = async(e:string) => {
    const inspectionDeadline = new Date(e)
    setInspectionDeadline(inspectionDeadline)
    console.log(inspectionDate)
  }

  return( 
    <div className='table_cardProfile'>
    <div className='table_cardProfile_header'>
      <h1>Создать учетную форму</h1>
    </div>
    <div className='table_cardProfile_creation'>
      <div  className='table_cardProfile_form_inner'>
        <label htmlFor='inspectionDeadline_inp'>Срок проверки:</label>
          <input id='inspectionDeadline_inp' className="table_forms_input" onChange={e => handleDeadlineDate(e.target.value)} value={formatDateToInput(inspectionDeadline)} type='datetime-local'/>
      </div>
      <div  className='table_cardProfile_form_inner'>
        <label htmlFor='responsibleWorker_inp'>Ответственный работник:</label>
        <select className="table_forms_input" id="category_inp" value={category} onChange={e => setResponsibleWorker(e.target.value)}>
          <option value=''>Выбрать</option>
          {usersArr.map((user, index) => (<option value={user.nickname} key={index}>{user.nickname}</option>))}
        </select>
      </div>
      <div  className='table_cardProfile_form_inner'>
        <label htmlFor='inspectionDate_inp'>Проверено:</label>
        <input id='inspectionDate_inp' className="table_forms_input" onChange={e => setInspectionDate(e.target.value)} value={inspectionDate} type='text'/>
      </div>
    </div>
    <div className='table_cardProfile_info'>
      <div  className='table_cardProfile_form_inner'>
        <label htmlFor='homeType_inp'>Тип:</label>
        <input id='homeType_inp' className="table_forms_input" onChange={e => setHomeType(e.target.value)} value={homeType} type='text'/>
      </div>
      <div  className='table_cardProfile_form_inner'>
        <label htmlFor='city_inp'>Город:</label>
        <input id='city_inp' className="table_forms_input" onChange={e => setCity(e.target.value)} value={city} type='text'/>
      </div>
      <div  className='table_cardProfile_form_inner'>
        <label htmlFor='street_inp'>Улица:</label>
        <input id='street_inp' className="table_forms_input" onChange={e => setStreet(e.target.value)} value={street} type='text'/>
      </div>
      <div  className='table_cardProfile_form_inner'>
        <label htmlFor='home_inp'>Дом:</label>
        <input id='home_inp' className="table_forms_input" onChange={e => setHome(e.target.value)} value={home} type='text'/>
      </div>
      <div  className='table_cardProfile_form_inner'>
        <label htmlFor='apartment_inp'>Квартира:</label>
        <input id='apartment_inp' className="table_forms_input" onChange={e => setApartment(e.target.value)} value={apartment} type='text'/>
      </div>
    </div>
    <div className='table_cardProfile_owner'>
      <div  className='table_cardProfile_form_inner'>
        <label htmlFor='owner_inp'>Владелец:</label>
        <input className="owner_inp" onChange={e => setOwner(e.target.value)} value={owner} type='text'/>
      </div>  
      <div  className='table_cardProfile_form_inner'>
        <label htmlFor='category_inp'>Категория:</label>
        <select className="table_forms_input" id="category_inp" value={category} onChange={e => setCategory(e.target.value)}>
        <option value="">Выбрать категорию</option>
        <option value="Одинокий">Одинокий</option>
        <option value="Одиноко проживающий">Одиноко проживающий</option>
        <option value="Инвалид">Инвалид</option>
        <option value="1-2 ребёнка">Семья, воспитывающая 1-2 ребёнка</option>
        <option value="Многодетная">Многодетная семья</option>
        <option value="Иные">Иные</option>
      </select>
      </div>  
      <div  className='table_cardProfile_form_inner'>
        <label htmlFor='otherInfo_inp'>Иные сведения:</label>
        <input id='otherInfo_inp' className="table_forms_input" onChange={e => setOtherInfo(e.target.value)} value={otherInfo} type='text'/>
      </div>
    </div>
    <div className='table_cardProfile_addForm'>
      <button className='orange-btn' onClick = {handleAdd}>Добавить</button>
    </div>
  </div>
  )
}

export default observer(AddCardForm)