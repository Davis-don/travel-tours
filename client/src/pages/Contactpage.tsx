import './contactpage.css'
import Contactform from '../components/Contactform/Contactform'
import ContactHero from '../components/Contact-hero/Hero'

function Contactpage() {
  return (
    <div>
      <ContactHero/>
        <Contactform/>
    </div>
  )
}

export default Contactpage