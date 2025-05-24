import './sidebar.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'
import useSidebarStore from '../../Store/sidebarstore'

function Sidebar() {
const navigate = useNavigate()
const toggleBar=useSidebarStore((state)=>state.toggleSidebar)
  return (
    <div className='overall-side-bar-component'>
      <ul className='list-unstyled'>
       <li onClick={()=>{toggleBar();navigate('/')}} className='text-light'>Home</li>
       <li onClick={()=>{toggleBar();navigate('/tours')}} className='text-light'>Tours</li>
       <li onClick={()=>{toggleBar();navigate('/about')}} className='text-light'>About</li>
       <li onClick={()=>{toggleBar();navigate('/contact')}} className='text-light'>Contact</li>
      </ul>
      <div className="getstarted-button-div">
        <button onClick={()=>{navigate('/login');toggleBar()}} className='btn btn-primary fs-2'>Get started</button>
      </div>
      </div>
  )
}

export default Sidebar