import React from 'react'
import Image from 'next/image'
import aboutimg from '../../public/Image Placeholder.png'

function page() {
  return (
    <div className='w-full h-full bg-[#FAFAFA] md:px-24 sm:px-4 py-24 flex flex-col space-y-16'>
        <div className='flex flex-col items-center space-y-4'>
            <h4 className="text-secondarygray text-base tracking-wider font-semibold font-Roboto">ABOUT US</h4>
            <h3 className="text-secondary font-bold text-center leading-tight max-md:hidden ">
            Creative Blog Writting and <br/>publishing site
            </h3>
            <h3 className="text-secondary font-bold text-center leading-tight max-md:text-3xl md:hidden">
            Creative Blog Writting and publishing site
            </h3>
            <h4 className="text-secondarygray text-base  font-normal text-center md:px-44 sm:px-0">
            Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.
            </h4>
        </div>
        <div className='w-full relative items-center '>
            <Image
            src={aboutimg}
            alt="About Us Image"
            width={1500}
            height={608}
            />
        </div>
        <div className='flex flex-col items-start space-y-8'>
            <h4 className="text-secondarygray text-base tracking-wider font-bold font-Roboto">HOW WE WORK</h4>
            <h3 className="text-secondary font-bold text-start leading-tight max-md:text-3xl">
            I will show you how <br/> our team works
            </h3>
        </div>
        <div className='grid sm:grid-cols-1 md:grid-cols-3 max-md:gap-4'>
            <div className='md:w-[400px] md:h-[408px] sm:w-full sm:h-full bg-main p-6 rounded-md flex flex-col justify-between    hover:scale-105'>
                <div className='flex flex-col space-y-2'>
                <h1 className='text-7xl font-bold '>01</h1>
                <h6 className='font-bold'>Brainstorming</h6>
                <h6 className='text-base pt-2 font-Roboto'>Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated</h6>
                </div>
                <div>
                    <h6 className='font-Roboto text-base font-semibold max-md:pt-4'>Learn More</h6>
                </div>
            </div>
            <div className='md:w-[400px] md:h-[408px] sm:w-full sm:h-full bg-transparent p-6 rounded-md flex flex-col justify-between hover:scale-105'>
                <div className='flex flex-col space-y-2'>
                <h1 className='text-7xl font-bold  text-main'>02</h1>
                <h6 className='font-bold text-main'>Analysing</h6>
                <h6 className='text-base pt-2 font-Roboto text-secondarygray'>Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line solely on the bottom line.</h6>
                </div>
                
            </div>
            <div className='md:w-[400px] md:h-[408px] sm:w-full sm:h-full bg-transparent p-6 rounded-md flex flex-col justify-between hover:scale-105'>
                <div className='flex flex-col space-y-2'>
                <h1 className='text-7xl font-bold  text-main'>03</h1>
                <h6 className='font-bold text-main'>News Publishing</h6>
                <h6 className='text-base pt-2 font-Roboto text-secondarygray'>Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.</h6>
                </div>
                
            </div>

        </div>
    </div>
  )
}

export default page