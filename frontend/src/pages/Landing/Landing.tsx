import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import Navbar from '@/components/Navbar/Navbar'
import { FaTowerBroadcast , FaUsers } from "react-icons/fa6";
import { FaCog } from "react-icons/fa";
import { BsChatLeftTextFill } from "react-icons/bs";
import { IoAnalyticsSharp } from "react-icons/io5";
import FeatureCard from '@/components/Card/FeatureCard';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useAuth } from '@/context/AuthContext';


type Feature = {
  title : string,
  desc : string,
  child : JSX.Element
}

function Landing() {

  const auth = useAuth();

  console.log(auth);

  const features : Feature[] = [
    {
      title : "Multistreaming",
      desc : "Amplify your impact by simultaneously streaming to multiple platforms, expanding your reach and connecting with diverse audiences worldwide.",
      child : <FaTowerBroadcast size='25'/>
    },
    {
      title : "Chat",
      desc : "Streamline your interactions with viewers by consolidating messages from various platforms into a single, easy-to-manage multichat interface.",
      child : <BsChatLeftTextFill size='25'/>
    },
    {
      title : "Analytics",
      desc : "Gain valuable insights into your live stream's performance across diverse platforms, enabling data-driven decisions and helping you refine your content strategy.",
      child : <IoAnalyticsSharp size='25'/>
    },
    {
      title : "Collaborate",
      desc : "Foster teamwork and creativity by inviting others to join your stream. Collaborative streaming enables multiple perspectives, enhancing the overall viewer experience.",
      child : <FaUsers size='25'/>
    },
    {
      title : "Customization",
      desc : "Tailor your streaming experience with customizable options, allowing you to brand your content, personalize layouts, and create a unique and memorable viewer experience.",
      child : <FaCog size='25'/>
    },

  ];

  return (
    <div>
        <Navbar />
        <Header/>

        <div className='my-6'>
          {/* Our Platforms */}
          <h3 className='text-center scroll-m-20 text-4xl font-semibold tracking-tight my-12'>Supported Platforms</h3>
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
          <h3 className='text-center scroll-m-20 text-4xl font-semibold tracking-tight my-12'>Our Features</h3>
          <div className='mx-auto max-w-7xl py-4 gap-x-3 gap-y-5 grid grid-cols-3 justify-center'>
            {features.map(feature => (
              <FeatureCard key={feature.title} title={feature.title} desc={feature.desc} child={feature.child} />
            ))}
          </div>
        </div>

          {/* Our Team */}
        {/* <div className='my-6'>
          <h3 className='text-center scroll-m-20 text-4xl font-semibold tracking-tight'>Our Team</h3>

        </div> */}

        <div className='my-6'>
          {/* Frequently asked questions */}
          <h3 className='text-center scroll-m-20 text-4xl font-semibold tracking-tight my-12'>Frequently Asked Questions</h3>
          <div className='max-w-7xl mx-auto my-6'>
            <Accordion type="single" collapsible className="w-1/2 mx-auto">
              <AccordionItem value="item-1">
                <AccordionTrigger>How does StreamSync work?</AccordionTrigger>
                <AccordionContent>
                StreamSync provides a user-friendly interface for live streaming. Simply log in, connect your accounts, set up your stream, and go live to multiple platforms with just a few clicks.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Can I stream to multiple platforms at the same time?</AccordionTrigger>
                <AccordionContent>
                Yes, StreamSync enables you to broadcast your live stream to multiple destinations concurrently. Expand your audience and engagement by reaching viewers on different platforms simultaneously.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Which platforms are supported by StreamSync?</AccordionTrigger>
                <AccordionContent>
                StreamSync supports popular streaming platforms such as Facebook, Twitch, YouTube, and more. It offers a versatile solution for content creators looking to maximize their online presence.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Can I customize my live stream on StreamSync?</AccordionTrigger>
                <AccordionContent>
                Yes, StreamSync provides customization options. You can personalize your stream by adding overlays, adjusting layouts, and incorporating other elements to create a unique and professional streaming experience.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <Footer />
    </div>
  )
}

export default Landing