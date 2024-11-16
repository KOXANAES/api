import './Spinner.css'
import logo from '../../assets/images/fire.png'

const MySpinner = () => { 
  return(
    <div className="spinner">
      <div className='spinner_logo'>
        <img id='spinner_img' src={logo} alt='Загрузка...'/>
        <p id='spinner_name'>АПИ</p>
      </div>
      <div>
        <p id='spinner_load'>Загрузка приложения...</p>
      </div>
    </div>
  )
}

export default MySpinner