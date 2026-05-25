import '../css/WindowsShutdown.css';
import windowsshut from '../assets/shuttingdownbg.png'

function WindowsShutdown() {

  return (
    <div className='shitdown_bg_container'>
        <img src={windowsshut} alt="windowsShutdown" />
        <h1 className='text_1_shutdown'>Please wait while your computer  <br /> shuts down.</h1>
        <h1 className='text_2_shutdown'>  <br /> </h1>
           
    </div>
  )
}

export default WindowsShutdown
