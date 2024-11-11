import { FC, useContext, useEffect, useState } from "react"
import { Context } from "../../main"
import { observer } from "mobx-react-lite"

import './Table.css'
import { IInspectionCard } from "../../models/ICardNew";

import AddCardModal from "../Modals/CardModals/AddCardModal"
import ProfileCardModal from "../Modals/CardModals/ProfileCardModal"
import FillCardModal from "../Modals/CardModals/FillCardModal"

const Table: FC = () => { 

  const {cardStore} = useContext(Context)

  const [homes, setHomes] = useState<IInspectionCard[]>([])
  const [home, setHome] = useState<IInspectionCard>({} as IInspectionCard)

  const [addModalActive, setAddModalActive] = useState<boolean>(true)
  const [fillModalActive, setFillModalActive] = useState<boolean>(false)
  const [profileModalActive, setProfileModalActive] = useState<boolean>(false)

  useEffect(() => {
    cardStore.getCards().then((cards) => {
      if (cards) {
        setHomes(cards);
        console.log(cards)
      }
    })
  }, []);

  const handleGetCards = async() => {
    try { 
      await cardStore.getCards()
      .then((cards) => {if(cards) {setHomes(cards)}})  
    } catch(e) { 
      alert(e)
    } 
  } 

  const handleProfile = async(home:IInspectionCard) => { 
    setHome(home)
    setProfileModalActive(true)
  }

  const handleFill = async(home:IInspectionCard) => { 
    setHome(home)
    setFillModalActive(true)
  }

  const handleDelete = async(home:IInspectionCard) => { 
    try { 
      await cardStore.deleteCard(home.id)
        .then(() => cardStore.getCards()
        .then((cards) => {if(cards) {setHomes(cards)}}))
    } catch(e) { 
      alert(e)
    }
  }

  return( 
    <>
      <main>
        <header>
            <button className='tool_btns_btn_down' onClick={handleGetCards}>Обновить</button>
            <button className='tool_btns_btn_down' onClick={() => setAddModalActive(true)}>Добавить</button>
            <button className='tool_btns_btn_down'>Поиск</button>
        </header>
        <table className='main_table'>
          <thead>
            <tr className='table_headers'>
              <th>Город</th>
              <th>Улица</th>
              <th>Дом</th>
              <th>Квартира</th>
              <th>Обследовать до</th>
              <th>Ответственный</th>
              <th>Статус</th>
              <th>Категория</th>
              <th>Дополнительно</th>
            </tr>
          </thead>
          <tbody>
            {homes.map(homes =>
              <tr className='main_table_cards' key={homes.id}>  
                <td onClick={() => handleProfile(homes)}>{homes?.adress?.city}</td>
                <td onClick={() => handleProfile(homes)}>{homes?.adress?.street}</td>
                <td onClick={() => handleProfile(homes)}>{homes?.adress?.home}</td>
                <td onClick={() => handleProfile(homes)}>{homes?.adress?.apartment}</td>
                <td onClick={() => handleProfile(homes)}>{homes?.inspectionDeadline}</td>
                <td onClick={() => handleProfile(homes)}>{homes?.responsibleWorker}</td>
                <td onClick={() => handleProfile(homes)}>{homes?.status}</td>
                <td onClick={() => handleProfile(homes)}>{homes?.category}</td>
                <td onClick={() => handleProfile(homes)}>{homes?.otherInfo}</td>
                <td><button className='tool_btns_btn btn_change' onClick={() => handleFill(homes)}>Изменить</button></td>
                <td><button className='tool_btns_btn btn_delete' onClick={() => handleDelete(homes)}>Удалить</button></td>
              </tr>
            )}
          </tbody>
        </table>
        <AddCardModal active={addModalActive} setActive={setAddModalActive} setHomes={setHomes}/>
        <ProfileCardModal active={profileModalActive} setActive={setProfileModalActive} setHomes={setHomes} home={home}/>
        <FillCardModal active={fillModalActive} setActive={setFillModalActive} setHomes={setHomes}  home={home}/>
      </main>
    </>
    
  )
}
export default observer(Table)