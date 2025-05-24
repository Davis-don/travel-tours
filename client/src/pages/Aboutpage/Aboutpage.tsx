import './aboutpage.css'
import Companystory from '../../components/Companystory/Companystory'
import Valuessection from '../../components/Valuessection/Valuessection'
import Hero from '../../components/About-hero/Hero'
function Aboutpage() {
  return (
    <div>
      <Hero/>
        <Companystory/>
        <Valuessection/>
        </div>
  )
}

export default Aboutpage