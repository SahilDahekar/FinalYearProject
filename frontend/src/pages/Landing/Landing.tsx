import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import Navbar from '@/components/Navbar/Navbar'

function Landing() {
  return (
    <div>
        <Navbar />
        <Header/>
        <div className='my-6'>
          {/* Our Platforms */}
          <h3 className='text-center scroll-m-20 text-4xl font-semibold tracking-tight'>Supported Platforms</h3>
          <div className='flex mx-auto max-w-7xl px-10 py-4 gap-3 justify-evenly items-center'>
            <div className='flex flex-col gap-3 justify-center'>
              <img src="https://www.ohmystream.co/static/media/youtube.bdc1f583e488e2e672cff695a1c379d1.svg" alt="Youtube image" />
              <h4 className='text-2xl font-bold'>YouTube</h4>
            </div>
            <div className='flex flex-col gap-3 justify-center'>
              <img src="https://www.ohmystream.co/static/media/twitch.ad8ab2f2e67d7ee904a135ed5bcd2c1f.svg" alt="Twitch image" />
              <h4 className='text-2xl font-bold'>Twitch</h4>
            </div>
            <div className='flex flex-col gap-3 justify-center'>
              <img src="https://www.ohmystream.co/static/media/facebook.c3402e464658a657669832c282de64a7.svg" alt="Facebook image" />
              <h4 className='text-2xl font-bold'>Facebook</h4>
            </div>
          </div>
        </div>
        <div className='my-6'>
          {/* Our Features */}
          <h3 className='text-center scroll-m-20 text-4xl font-semibold tracking-tight'>Our Features</h3>
        </div>
        <div className='my-6'>
          {/* Our Team */}
          <h3 className='text-center scroll-m-20 text-4xl font-semibold tracking-tight'>Our Team</h3>
        </div>
        <div className='my-6'>
          {/* Frequently asked questions */}
          <h3 className='text-center scroll-m-20 text-4xl font-semibold tracking-tight'>Frequently Asked Questions</h3>
        </div>
        <Footer />
    </div>
  )
}

export default Landing