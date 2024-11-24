import { FC, useContext, useEffect, useState } from "react"
import { Context } from "../../main"
import { observer } from "mobx-react-lite"

import './Table.css'
import { IInspectionCard } from "../../models/ICardNew";

import { IUser } from "../../models/IUser";

import DefaultModal from "../Modals/Modal/DefaultModal";
import AddCardForm from "../Forms/CardForms/AddCardForm";
import CardProfile from "../Profiles/CardProfile";
import FillCardForm from "../Forms/CardForms/FillCardForm";

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

  const [tableOnLoad, setTableOnLoad] = useState<boolean>(false)

  const formatDate = (date: any) => { 
    if (!date) {return ''}
    const formattedDate = date.split('.')[0]
    return formattedDate
  }


  // получаем карточки
  const updateCards = (cards:IInspectionCard[] | undefined) => {
    if (cards) {
      const updatedCards = cards.map(card => ({
        ...card,
        formattedInspectionDate: formatDate(card.inspectionDate),
        formattedCreationDate: formatDate(card.creationDate),     
        formattedInspectionDeadline: formatDate(card.inspectionDeadline)
      }));
      setHomes(updatedCards);
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      setTableOnLoad(true);
      try {
        const cards = await cardStore.getCards();
        updateCards(cards);
      } catch (e) {
        console.log(e);
      } finally {
        setTableOnLoad(false);
      }
    };
    fetchData();
  }, []);
  
  const handleGetCards = async () => {
    try { 
      const cards = await cardStore.getCards();
      updateCards(cards);
    } catch (e) { 
      alert(e);
    } 
  };
  
  const handleDelete = async (home: IInspectionCard) => { 
    try { 
      await cardStore.deleteCard(home.id);
      const cards = await cardStore.getCards();
      updateCards(cards);
    } catch (e) { 
      alert(e);
    }
  };

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

  // filters
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedResponsible, setSelectedResponsible] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');

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

  // пагинация + фильтра + задаём кол-во карточек на странице
  const filteredHomes = homes.filter(home => {
    const categoryMatch = selectedCategory ? home.category === selectedCategory : true;
    const responsibleMatch = selectedResponsible ? home.responsibleWorker === selectedResponsible : true;
    const statusMatch = selectedStatus ? home.status === selectedStatus : true;
    const cityMatch = selectedCity ? home.adress.city.toLowerCase().includes(selectedCity.toLowerCase()) : true;
    return categoryMatch && responsibleMatch && statusMatch && cityMatch;
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
    setSelectedStatus('')
    setSelectedCity('')
  }

  const deleteAll = async() => { 
    let result = confirm('Удалить всю базу данных?');
    alert(result)
  }

  const cardsShown = [10, 20, 50, 100, homes.length];
  const categories = [
    { value: '', label: 'Категория (все)' },
    { value: 'Одинокий', label: 'Одинокий' },
    { value: 'Одиноко проживающий', label: 'Одиноко проживающий' },
    { value: 'Инвалид', label: 'Инвалид' },
    { value: '1-2 ребёнка', label: 'Семья, воспитывающая 1-2 ребёнка' },
    { value: 'Многодетная', label: 'Многодетная семья' },
    { value: 'Иные', label: 'Иные' },
  ];
  const statuses = [
    { value: '', label: 'Статус (все)' },
    { value: 'Посещено', label: 'Посещено' },
    { value: 'Не посещено', label: 'Не посещено' },
  ];

  return( 
    <main>
      <header>
        <div className='header__btns-settings'>
          <div><button className='orange-btn' onClick={handleGetCards}>Обновить</button></div>
          {authStore.isAuth && authStore.user.isActivated && authStore.user.role !== 'USER' && (
            <div><button className='orange-btn' onClick={() => setAddModalActive(true)}>Добавить</button></div>
          )}
        </div>
        <div className='header__cards-settings'>
          <p>Выведено адресов: <span className='accent__orange'>{filteredHomes.length}.</span></p>
          <p>Показывать по:
          <select className='my__select' value={itemsPerPage} onChange={handleSetItemsPerPage}>
            {cardsShown.map((param) => (
              <option key={param} value={param}>{param === homes.length ? 'Все' : param}</option>
             ))}
           </select>
          </p>
        </div>
      </header>
      <table className='main_table'>
        <thead>
          <tr className='table_headers'>
            <th>
              <div>
                <input
                  type='text'
                  className='my__select'
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  placeholder='Город (все)'
                />
              </div>
            </th>
            <th>Улица</th>
            <th>Дом</th>
            <th>Квартира</th>
            <th>Обследовать до</th>
            <th>
              <div>
                <select className='my__select' value={selectedResponsible} onChange={handleResponsibleChange}>
                  <option className='my__select__option' value=''>Инспектор (все)</option>
                  {users.map((user, index) => (<option className='my__select__option' value={user.nickname} key={index}>{user.nickname}</option>))}
                </select>
              </div>
            </th>
            <th>
            <div>
              <select className='my__select' value={selectedStatus} onChange={handleStatusChange}>
                {statuses.map((status) => (
                  <option key={status.value} className='my__select__option' value={status.value}>{status.label}</option>
                ))}
              </select>
            </div>
            </th>
            <th>
              <div>
                <select className='my__select' value={selectedCategory} onChange={handleCategoryChange}>
                  {categories.map((category) => (
                    <option key={category.value} className='my__select__option' value={category.value}>{category.label}</option>
                   ))}
                  </select>
              </div>
            </th>
            <th><button className='green-btn' onClick={() => resetFilters()}>Очистить фильтр</button></th>
            {authStore.user.isActivated && authStore.user.role === 'ADMIN' && 
              <th><button className='red-btn' onClick={() => deleteAll()}>Удалить все</button></th>
            }
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
                {authStore.isAuth && authStore.user.isActivated && authStore.user.role != 'USER' &&
                  <td><button className='tool_btns_btn btn_delete' onClick={() => handleDelete(homes)}>Удалить</button></td>
                } 
              </tr>
            )}
          </tbody>
          }
      </table>
      <div className='table__pagination'>
        <button className={currentPage === 1 ? 'orange-btn table__pagination-disabled' : 'orange-btn'} onClick={handlePrevPage} disabled={currentPage === 1}>Назад</button>
        <span>Страница {currentPage} из {totalPages}</span>
        <button className={currentPage === totalPages ? 'orange-btn table__pagination-disabled' : 'orange-btn'} onClick={handleNextPage} disabled={currentPage === totalPages}>Вперед</button>
      </div>
      <DefaultModal active={addModalActive} setActive={setAddModalActive} >
        <AddCardForm usersArr={users} setActive={setAddModalActive} setHomes={setHomes}/>
      </DefaultModal> 
      <DefaultModal active={profileModalActive} setActive={setProfileModalActive} >
        <CardProfile home={home}/>
      </DefaultModal>
      <DefaultModal active={fillModalActive} setActive={setFillModalActive} >
        <FillCardForm setActive={setFillModalActive} setHomes={setHomes} homeProps={home}/>
      </DefaultModal>
    </main>
  )
}
export default observer(Table)