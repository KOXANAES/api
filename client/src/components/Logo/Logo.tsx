import './Logo.css'
import logo from '../../assets/images/fire.png'
import { Link, useNavigate } from 'react-router-dom';

const Logo = ({}) => { 

  const navigate = useNavigate()

  return(
    <div className="logo">
      <img id='logo_img' src={logo} alt='logo' onClick={() => navigate('/')}/>
      <div>
        <p id='logo_name'><Link to='/'>АПИ</Link></p>
        <p id='logo_decs'>Cистема учёта проведения пожарно-профилактической работы</p>
      </div>
    </div>
  )
} 

export default Logo