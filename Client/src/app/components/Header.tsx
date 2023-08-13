import Link from 'next/link';
import React from 'react';
import { CustomConnectButton } from './ConnectButton';
// import { fetchBalance } from '@wagmi/core'



const Header = () => {
  // const balance =  fetchBalance({
  //   address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
  //   token: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
  // })



  
  return (
    <div className="bg-transparent px-10 mb-[5rem] pt-5">
        <div className="flex justify-between items-center">
          <Link href={'/'}>
            {/* {balance} */}
            <img src={'/smile.png'} alt="smile" className=' w-[14rem] max-md:rotate-[-90deg] max-md:scale-[1.75]' />
          </Link>
          {/* <Link href={'/profile/1'}>
            <div className=" hover:animate-jelly border-4 border-black flex px-[2rem] py-[0.5rem] my-auto bg-[#FFF9ED] cursor-pointer transition-all delay-75">
              <div className=' p-3 bg-black'></div>
              <p className='my-auto pl-2 cursor-pointer'>0xs21f35sd43fs1g...</p>
            </div>
          </Link> */}
              <CustomConnectButton/>


        </div>
    </div>
  );
};

export default Header;