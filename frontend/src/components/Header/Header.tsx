import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { FiArrowRight } from "react-icons/fi"

function Header() {
  return (
    <div className='mx-auto my-4 max-w-7xl flex justify-center items-center'>
        <div className='py-4 px-4 w-1/2 my-10'>
        <h1 className='text-6xl font-bold tracking-tight'>One live Stream.<br/> Multiple destinations</h1>
        <p className='text-lg mt-4 mb-8'>
            A professional live streaming studio in your browser. Stream to Facebook , Twitch , Youtube , and other platforms together right from StreamSync.
        </p>
        <Button className='text-lg font-bold px-4' asChild size='lg'>
            <Link to="/auth">Get Started <FiArrowRight className="ml-2" /></Link>
        </Button>
        </div>
        <div className='w-1/2 h-[400px]'>
        <img className='object-cover w-full h-full' src="https://img.freepik.com/free-vector/doodle-social-influencer-background_23-2148012730.jpg?w=740&t=st=1703869694~exp=1703870294~hmac=d0ab5357c12b53f206cccb49f9fbe1eac40caaf56e64269597b22e16c35594d4" alt="placeholder header image"/>
        </div>
    </div>
  )
}

export default Header