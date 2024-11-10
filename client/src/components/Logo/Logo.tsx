import './Logo.css'
import logo from '../../assets/images/fire.png'
import { FC } from 'react'
import { Link } from 'react-router-dom';

interface Logo { 
  active: boolean; 
  setActive: (active: boolean) => void;
}

const Logo:FC<Logo> = ({active, setActive}) => { 
  return(
    <div className="logo">
      <img id='logo_img' src={logo} alt='logo' onClick={() => setActive(!active)}/>
      <div>
        <p id='logo_name'><Link to='/'>HOMES</Link></p>
        <p id='logo_decs'>Cистема учёта проведения пожарно-профилактической работы</p>
      </div>
    </div>
  )
}

export default Logo