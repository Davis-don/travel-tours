import './homepage.css'
import Hero from '../components/homepageHero/Hero'
import Featuredtours from '../components/feaaturedtours/Featuredtours'
import AboutusPreview from '../components/Aboutuspreview/AboutusPreview'
// import Testimonials from '../components/Testimonials/Testimonials'
import Services from '../components/Services/Services'

function Homepage() {
  return (
    <div className="overall-homepage-container">
        <Hero/>
        <Featuredtours/>
        <Services/>
        <AboutusPreview/>
        {/* <Testimonials/> */}
        </div>
  )
}

export default Homepage