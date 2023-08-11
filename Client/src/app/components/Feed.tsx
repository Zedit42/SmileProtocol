import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

const Feed = () => {
    interface Posts {
        id: number;
        src: string;
        title: string;
        href: string;
        percent: number;
        nftOwner: number;
        totalSupply: number;
      }
      
      const posts: Posts[] = [
        { id: 1, src: '/smileprotocol.gif', title: 'Smile Protocol', href:'/project/1', percent:90, nftOwner:20, totalSupply:100,},
        { id: 1, src: '/smileprotocol.gif', title: 'Smile Protocol', href:'/project/1', percent:90, nftOwner:20, totalSupply:100,},
        { id: 1, src: '/smileprotocol.gif', title: 'Smile Protocol', href:'/project/1', percent:90, nftOwner:20, totalSupply:100,},
        { id: 1, src: '/smileprotocol.gif', title: 'Smile Protocol', href:'/project/1', percent:90, nftOwner:20, totalSupply:100,},
        { id: 1, src: '/smileprotocol.gif', title: 'Smile Protocol', href:'/project/1', percent:90, nftOwner:20, totalSupply:100,},
        { id: 1, src: '/smileprotocol.gif', title: 'Smile Protocol', href:'/project/1', percent:90, nftOwner:20, totalSupply:100,},
        { id: 1, src: '/smileprotocol.gif', title: 'Smile Protocol', href:'/project/1', percent:90, nftOwner:20, totalSupply:100,},
        { id: 1, src: '/smileprotocol.gif', title: 'Smile Protocol', href:'/project/1', percent:90, nftOwner:20, totalSupply:100,},
        { id: 1, src: '/smileprotocol.gif', title: 'Smile Protocol', href:'/project/1', percent:90, nftOwner:20, totalSupply:100,},
        { id: 1, src: '/smileprotocol.gif', title: 'Smile Protocol', href:'/project/1', percent:90, nftOwner:20, totalSupply:100,},
        { id: 1, src: '/smileprotocol.gif', title: 'Smile Protocol', href:'/project/1', percent:90, nftOwner:20, totalSupply:100,},
        { id: 1, src: '/smileprotocol.gif', title: 'Smile Protocol', href:'/project/1', percent:90, nftOwner:20, totalSupply:100,},

      ];
  return (
    <div className=' flex flex-wrap w-[80vw] mx-auto h-full gap-8 justify-center'>
        {posts.map((posts, index) => (
            <Link href={posts.href} key={posts.id} className=' flex flex-col border-8 justify-between border-black bg-[#FFF9ED] max-w-[20rem] min-h-[15rem] w-full h-full' >
                <div>
                    <Image
                        src={posts.src}
                        width={800}
                        height={600}
                        alt={posts.title}
                        className=' border-b-8 border-black'
                    />
                </div>
                <div className=' flex flex-col m-4'>
                    <div className=' flex justify-between'>
                        <div className=' text-2xl'>{posts.title}</div>
                        <div className=' flex'>
                            <Image
                                src={'/deubc.png'}
                                width={48}
                                height={24}
                                alt='owner photo'
                            />
                            <div className=' text-lg'>BlockchainDEU</div>
                        </div>
                    </div>
                    <div className=' flex justify-between'>
                        <div className=' text-xl'>
                            🙂 % {posts.percent}
                        </div>
                        <div>
                            {posts.nftOwner}/{posts.totalSupply}
                        </div>
                    </div>
                </div>
            </Link>
        ))}
    </div>
  )
}

export default Feed