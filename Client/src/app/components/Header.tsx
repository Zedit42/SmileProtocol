import Link from 'next/link';
import React from 'react';
import { CustomConnectButton } from './ConnectButton';

const Header = () => {
  return (
    <div className="bg-transparent px-10 mb-[5rem] pt-5">
        <div className="flex justify-between items-center">
          <Link href={'/'}>
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