import './Spinner.css'
import logo from '../../assets/images/fire.png'

const MySpinner = () => { 
  return(
    <div className="spinner">
      <div className='spinner_logo'>
        <img id='spinner_img' src={logo} alt='Загрузка...'/>
        <p id='spinner_name'>АПИ</p>
      </div>
      <div className='app_loading_message'>
        <div id='spinner_load'>Загрузка приложения...</div><div className="table__onload__message TestSpinner"></div>
      </div>
    </div>
  )
}

export default MySpinner