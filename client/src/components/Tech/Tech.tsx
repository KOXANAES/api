import './Tech.scss';
import logo from '../../assets/images/fire.png';
import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';
import { ABOUT_ROUTE, FAQ_ROUTE, SUPPORT_ROUTE } from '../../router/Consts';

const Tech: FC = () => { 
  return (
    <div className='tech'>
      <div className='tech_header'>
        <div>
          <img id='logo_img' src={logo} alt='' />
          <span>EMBERA Project</span>
        </div>
        <div className='tech__menu'>
          <NavLink 
            className={({ isActive }) => isActive ? 'orange-btn techActive' : 'orange-btn'} 
            to={ABOUT_ROUTE}
          > О проекте
          </NavLink>
          <NavLink 
            className={({ isActive }) => isActive ? 'orange-btn techActive' : 'orange-btn'} 
            to={FAQ_ROUTE}
          > Часто задаваемые вопросы
          </NavLink>
          <NavLink 
            className={({ isActive }) => isActive ? 'orange-btn techActive' : 'orange-btn'} 
            to={SUPPORT_ROUTE}
          > Поддержка
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default observer(Tech);