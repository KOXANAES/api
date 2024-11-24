import { FC, useContext, useState } from 'react';
import { Context } from '../../main';
import { observer } from 'mobx-react-lite';

import logo from '../../assets/images/fire.png'

import './Acc.scss';

import defaultAvatar from '../../assets/images/avatar_default.png'

import LocalSettingsWindow from './LocalSettings/LocalSettingsWindow';
import LocalStatsWindow from './LocalStats/LocalStatsWindow';
import LocalCardsWindow from './LocalCards/LocalCardsWindow';

const Account: FC = () => { 
  const { authStore } = useContext(Context);
  
  const [activeWindow, setActiveWindow] = useState<string | null>('');

  const showWindow = (windowName: string) => {
    setActiveWindow(activeWindow === windowName ? null : windowName);
  };

  return (
    <div className='acc'>
      <div className='acc__face'>
        <div className='acc__face__avatar'>
          <p><img  src={defaultAvatar} width={100} alt='avatar'/></p>
          {authStore.user.nickname}
        </div>
        <div className='acc__face__options'>
          <button onClick={() => showWindow('cards')} className='orange-btn'>В работе</button>
          <button onClick={() => showWindow('stats')} className='orange-btn'>Статистика</button>
          <button onClick={() => showWindow('settings')} className='orange-btn'>Настройки</button>
        </div>
      </div>
      <div className='acc__info'>
        {activeWindow === 'cards' && <LocalCardsWindow />}
        {activeWindow === 'stats' && <LocalStatsWindow />}
        {activeWindow === 'settings' && <LocalSettingsWindow />}
        {!activeWindow && 
          <div id='settings_logo_img_wrapper'>
            <img id='settings_logo_img' src={logo} alt='logo'/>
          </div>
        }
      </div>
    </div>
  );
};

export default observer(Account);