import './Logo.scss'
import logo from '../../assets/images/fire.png'
import { useNavigate } from 'react-router-dom';
import { FC, useContext } from 'react';
import { Context } from '../../main';
import { observer } from 'mobx-react-lite';

const Logo:FC = ({}) => { 

  const {authStore} = useContext(Context)

  const navigate = useNavigate()

  const handleNavigate = async() => { 
    if(authStore.isAuth) { 
      navigate('/tech')
    }
  }

  return(
    <div className="logo">
      <img id='logo_img' src={logo} alt='logo' onClick={() => handleNavigate()}/>
      <div>
        <p id='logo_name' onClick={() => handleNavigate()}>EMBERA</p>
        <p id='logo_decs'>Cистема учёта проведения пожарно-профилактической работы</p>
      </div>
    </div>
  )
} 

export default observer(Logo)