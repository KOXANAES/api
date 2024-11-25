import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../../main";
import { IInspectionCard } from "../../../models/ICardNew";



const LocalStatsWindow = () => { 

  const {cardStore} = useContext(Context)
  const {authStore} = useContext(Context)


  const [totalUserCards, setTotalUserCards] = useState<IInspectionCard[]>([])
  const [totalInspectionedCards, setTotalInspectionedCards] = useState<IInspectionCard[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cards = await cardStore.getCards();
        const totalUserCards = cards?.filter(card => card.responsibleWorker === authStore.user.nickname) || [];
        const totalCompletedCards = totalUserCards?.filter(card => card.status === 'Посещено') || [];
        setTotalUserCards(totalUserCards)
        setTotalInspectionedCards(totalInspectionedCards)
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      Моя Статистика
      <p>Всего назначено адресов: {totalUserCards.length}, из них пройдено: {totalInspectionedCards.length}</p>
    </div>
  );
};

export default observer(LocalStatsWindow)