import { FC, useContext, useEffect, useState } from "react"
import { Context } from "../../main"
import { observer } from "mobx-react-lite"

import './Table.css'
import { IInspectionCard } from "../../models/ICardNew";

import AddCardModal from "../Modals/CardModals/AddCardModal"
import ProfileCardModal from "../Modals/CardModals/ProfileCardModal"
import FillCardModal from "../Modals/CardModals/FillCardModal"
import { IUser } from "../../models/IUser";

export interface ViolationVariant { 
  id: number; 
  name: string; 
  description: string
}

const Table: FC = () => { 

  const {cardStore} = useContext(Context)
  const {authStore} = useContext(Context)

  const [homes, setHomes] = useState<IInspectionCard[]>([])
  const [home, setHome] = useState<IInspectionCard>({} as IInspectionCard)

  const [addModalActive, setAddModalActive] = useState<boolean>(false)
  const [fillModalActive, setFillModalActive] = useState<boolean>(false)
  const [profileModalActive, setProfileModalActive] = useState<boolean>(false)

  const formatDate = (date: any) => { 
    if (!date) {return ''}
    const formattedDate = date.split('.')[0]
    return formattedDate
  }

  let [tableOnLoad, setTableOnLoad] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      setTableOnLoad(true);
      try {
        const cards = await cardStore.getCards();
        if (cards) {
          const updatedCards = cards.map(card => ({
            ...card,
            formattedInspectionDate: formatDate(card.inspectionDate),
            formattedCreationDate: formatDate(card.creationDate),     
            formattedInspectionDeadline: formatDate(card.inspectionDeadline)
          }));
          setHomes(updatedCards);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setTableOnLoad(false);
      }
    };

    fetchData();
  }, []);

  const handleGetCards = async() => {
    try { 
      await cardStore.getCards()
      .then((cards) => {if(cards) if (cards) {
        const updatedCards = cards.map(card => ({
          ...card,
          formattedInspectionDate: formatDate(card.inspectionDate),
          formattedCreationDate: formatDate(card.creationDate),     
          formattedInspectionDeadline: formatDate(card.inspectionDeadline)
        }));
        setHomes(updatedCards);
      }})  
    } catch(e) { 
      alert(e)
    } 
  } 

  const handleProfile = async(home:IInspectionCard) => { 
    if(authStore.user.role === 'INSPECTOR') { 
      setHome(home)
      setProfileModalActive(true)
      return
    }
    if(authStore.user.nickname === home.responsibleWorker) { 
      setHome(home)
      setProfileModalActive(true)
      return
    } else { 
      alert('Вы не имеете доступа к данной карточке!')
      return
    }

  }

  const handleFill = async(home:IInspectionCard) => { 
    setHome(home)
    setFillModalActive(true)
  }

  const handleDelete = async(home:IInspectionCard) => { 
    try { 
      await cardStore.deleteCard(home.id)
        .then(() => cardStore.getCards()
        .then((cards) => {if (cards) {
          const updatedCards = cards.map(card => ({
            ...card,
            formattedInspectionDate: formatDate(card.inspectionDate),
            formattedCreationDate: formatDate(card.creationDate),     
            formattedInspectionDeadline: formatDate(card.inspectionDeadline)
          }));
          setHomes(updatedCards);
        }}))
    } catch(e) { 
      alert(e)
    }
  }

  // получаем список тех, кому можно делегировать форму
  const [users, setUsers] = useState<IUser[]>([])
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userArray = await authStore.getUsers()
        const filteredUsers = userArray.map((userArray: { nickname: any; }) => ({
          nickname: userArray.nickname,
        }));
        setUsers(filteredUsers)
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
    }, []);


  // filters
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedResponsible, setSelectedResponsible] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value)
    setCurrentPage(1)
  }
  const handleResponsibleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedResponsible(event.target.value);
    setCurrentPage(1);
  };
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value);
    setCurrentPage(1);
  };

  // фильтр по городу (вводимый)
  const [selectedCity, setSelectedCity] = useState<string>('');


  // пагинация + фильтра + задаём кол-во карточек на странице
  const filteredHomes = homes.filter(home => {
    const categoryMatch = selectedCategory ? home.category === selectedCategory : true;
    const responsibleMatch = selectedResponsible ? home.responsibleWorker === selectedResponsible : true;
    const statusMatch = selectedStatus ? home.status === selectedStatus : true;
    const cityMatch = selectedCity ? home.adress.city.toLowerCase().includes(selectedCity.toLowerCase()) : true; // Фильтр по городу
    return categoryMatch && responsibleMatch && statusMatch && cityMatch; // Добавляем cityMatch
  });

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage, setItemsPerPage] = useState<number>(10)

  const totalPages = Math.ceil(filteredHomes.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredHomes.slice(indexOfFirstItem, indexOfLastItem);

  const handleSetItemsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => { 
    const selectedValue = Number(event.target.value);
    setItemsPerPage(selectedValue);
  };

  const handleNextPage = () => {if (currentPage < totalPages) {setCurrentPage(currentPage + 1)}}
  const handlePrevPage = () => {if (currentPage > 1) {setCurrentPage(currentPage - 1)}}
  
  const isInspectionDeadlineApproaching = (creationDate: Date, inspectionDeadline: Date) => {
    const creationDateObj = new Date(creationDate);
    const inspectionDeadLineObj = new Date(inspectionDeadline);
    const creationTime = creationDateObj.getTime();
    const inspectionTime = inspectionDeadLineObj.getTime();
    const timeDifference = inspectionTime - creationTime;
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
    if (daysDifference <= 0) return 'expired';
    if (daysDifference < 3) return 'approaching';
    if (daysDifference < 5) return 'warning';
    return 'normal';
    };

  const resetFilters = async() => { 
    setSelectedResponsible('');
    setSelectedCategory('')
    console.log(selectedResponsible)
  }

  return( 
    <>
      <main>
        <header>
          <div className='header__btns-settings'>
            <div><button className='orange-btn' onClick={handleGetCards}>Обновить</button></div>
            {
              authStore.isAuth && authStore.user.isActivated && authStore.user.role != 'USER' ? 
              <div><button className='orange-btn' onClick={() => setAddModalActive(true)}>Добавить</button></div>
              :
              ''
            } 
          </div>
          <div className='header__cards-settings'>
            <p>
              Выведено адресов: <span className='accent__orange'>{filteredHomes.length}.</span>
            </p>
            <p>
              Показывать по:
              <select className='my__select' value={itemsPerPage} onChange={handleSetItemsPerPage}>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={homes.length}>Все</option>
              </select>
            </p>
          </div>
        </header>
        <table className='main_table'>
          <thead>
            <tr className='table_headers'>
              <th>
                <div>
                  <label>Город: </label>
                  <input
                    type='text'
                    className='my__select'
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    placeholder='Введите город'
                  />
                </div>
              </th>
              <th><div>Улица</div></th>
              <th><div>Дом</div></th>
              <th><div>Квартира</div></th>
              <th><div>Обследовать до</div></th>
              <th>
              <div>Инспектор:
                <select className='my__select' value={selectedResponsible} onChange={handleResponsibleChange}>
                  <option className='my__select__option' value=''> Выбрать</option>
                  {users.map((user, index) => (<option className='my__select__option' value={user.nickname} key={index}>{user.nickname}</option>))}
                </select></div>
              </th>
              <th>
              <div>Статус:
                <select className='my__select' value={selectedStatus} onChange={handleStatusChange}>
                  <option className='my__select__option' value=''>Выбрать</option>
                  <option className='my__select__option' value="Посещено">Посещено</option>
                  <option className='my__select__option' value="Не посещено">Не посещено</option>
                </select></div>
              </th>
              <th>
              <div>Категория:
                <select className='my__select' value={selectedCategory} onChange={handleCategoryChange}>
                  <option className='my__select__option' value=''> Выбрать</option>
                  <option className='my__select__option' value="Одинокий">Одинокий</option>
                  <option className='my__select__option' value="Одиноко проживающий">Одиноко проживающий</option>
                  <option className='my__select__option' value="Инвалид">Инвалид</option>
                  <option className='my__select__option' value="1-2 ребёнка">Семья, воспитывающая 1-2 ребёнка</option>
                  <option className='my__select__option' value="Многодетная">Многодетная семья</option>
                  <option className='my__select__option' value="Иные">Иные</option>
                </select></div>
              </th>
              <th><button className='green-btn' onClick={() => resetFilters()}>Очистить фильтр</button></th>
            </tr>
          </thead>
            {tableOnLoad ? 
              <tbody> 
                <tr>
                  <td colSpan={10}>
                    <div className='table__onload__message'>Пожалуйста, дождитесь загрузки учетных форм<div className="table__onload__message TestSpinner"></div></div>
                    </td>
                </tr>
              </tbody>
            : 
            <tbody>
              {currentItems.map(homes =>
                <tr className='main_table_cards' key={homes.id}>  
                  <td onClick={() => handleProfile(homes)}>{homes?.adress?.city}</td>
                  <td onClick={() => handleProfile(homes)}>{homes?.adress?.street}</td>
                  <td onClick={() => handleProfile(homes)}>{homes?.adress?.home}</td>
                  <td onClick={() => handleProfile(homes)}>{homes?.adress?.apartment}</td>
                  <td className={homes?.status === 'Посещено' ? '' : 
                        isInspectionDeadlineApproaching(homes?.creationDate, homes?.inspectionDeadline) === 'expired' ? 'test1' : 
                        isInspectionDeadlineApproaching(homes?.creationDate, homes?.inspectionDeadline) === 'warning' ? 'warning-class' : 
                      isInspectionDeadlineApproaching(homes?.creationDate, homes?.inspectionDeadline) === 'approaching' ? 'test1' : ''} 
                      onClick={() => handleProfile(homes)}>
                    {homes?.status === 'Посещено' ?  '' : <p>{homes?.formattedInspectionDeadline}</p>}
                  </td>        
                  <td onClick={() => handleProfile(homes)}>{homes?.responsibleWorker}</td>
                  <td className={homes?.status === 'Посещено' ? 'highlight__green' : ''} onClick={() => handleProfile(homes)}>{homes?.status}</td>
                  <td onClick={() => handleProfile(homes)}>{homes?.category}</td>
                  <td><button className='tool_btns_btn btn_change' onClick={() => handleFill(homes)}>Изменить</button></td>
                    {
                      authStore.isAuth && authStore.user.isActivated && authStore.user.role != 'USER' ? 
                      <td><button className='tool_btns_btn btn_delete' onClick={() => handleDelete(homes)}>Удалить</button></td>
                      :
                      ''
                    } 
                </tr>
              )}
            </tbody>
            }
        </table>
        <div className="table__pagination">
          <button className={currentPage === 1 ? 'orange-btn table__pagination-disabled' : 'orange-btn'} onClick={handlePrevPage} disabled={currentPage === 1}>Назад</button>
          <span>Страница {currentPage} из {totalPages}</span>
          <button className={currentPage === totalPages ? 'orange-btn table__pagination-disabled' : 'orange-btn'} onClick={handleNextPage} disabled={currentPage === totalPages}>Вперед</button>
        </div>
        <AddCardModal usersArr={users} active={addModalActive} setActive={setAddModalActive} setHomes={setHomes}/>
        <ProfileCardModal active={profileModalActive} setActive={setProfileModalActive} setHomes={setHomes} home={home}/>
        <FillCardModal active={fillModalActive} setActive={setFillModalActive} setHomes={setHomes} home={home}/>
      </main>
    </>
    
  )
}
export default observer(Table)