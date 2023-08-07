import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <div className="bg-transparent px-10 mb-[5rem] pt-5">
        <div className="flex justify-between items-center">
          <Link href={'/'}>
            <img src={'/smile.png'} alt="smile" className=' w-[13vw]' />
          </Link>
          <div className=" border-4 border-black flex px-[2rem] py-[0.5rem] my-auto bg-[#FFF9ED] hover:bg-black hover:text-[#FFF9ED] transition-all delay-75">
            <div className=' p-3 bg-black'></div>
            <p className='my-auto pl-2'>0xs21f35sd43fs1g...</p>
          </div>
        </div>
    </div>
  );
};

export default Header;