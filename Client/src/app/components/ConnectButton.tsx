"use client"
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { CgProfile } from 'react-icons/cg'
import Image from 'next/image';

export const CustomConnectButton = () => {
  
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');
        return (
          <div>
              <div
                {...(!ready && {
                  'aria-hidden': true,
                  'style': {
                    opacity: 0,
                    pointerEvents: 'none',
                    userSelect: 'none',
                  },
                })}
              >
                {(() => {
                  if (!connected) {
                    return (
                      <div className=" hover:animate-jelly border-4 border-black flex px-[2rem] py-[0.5rem] my-auto bg-[#FFF9ED] cursor-pointer transition-all delay-75">
                        <button onClick={openConnectModal} type="button">
                          Connect Wallet
                        </button>
                      </div>
                    );
                  }
                  if (chain.unsupported) {
                    return (
                      <div className=" hover:animate-jelly border-4 border-black flex px-[2rem] py-[0.5rem] my-auto bg-[#FFF9ED] cursor-pointer transition-all delay-75">
                        <button onClick={openChainModal} type="button">
                          Wrong network
                        </button>
                      </div>
                    );
                  }
                  return (
                    <div className=' flex flex-row gap-3 flex-wrap'>
                      <Link href={'/stake'} className=" hover:animate-jelly border-4 border-black flex px-[2rem] py-[0.4rem] text-xl my-auto bg-[#FFF9ED] cursor-pointer transition-all delay-75">Stake <Image src='/token.png' width={24} height={24} alt='coin logo' className=' ml-4 '/> </Link>
                      <Link href={'/profile/1'} className=" hover:animate-jelly border-4 border-black flex p-[0.74rem] my-auto bg-[#FFF9ED] cursor-pointer transition-all delay-75"> <CgProfile className=' scale-[1.75]'/> </Link>
                      <div className=" hover:animate-jelly border-4 border-black flex px-[2rem] py-[0.5rem] my-auto bg-[#FFF9ED] cursor-pointer transition-all delay-75">
                        <div style={{ display: 'flex', gap: 12 }}>
                          <button
                            onClick={openChainModal}
                            style={{ display: 'flex', alignItems: 'center' }}
                            type="button"
                          >
                            {chain.hasIcon && (
                              <div
                                style={{
                                  background: chain.iconBackground,
                                  width: 12,
                                  height: 12,
                                  borderRadius: 999,
                                  overflow: 'hidden',
                                  marginRight: 4,
                                  scale: 2,
                                }}
                              >
                                {chain.iconUrl && (
                                  <img
                                    alt={chain.name ?? 'Chain icon'}
                                    src={chain.iconUrl}
                                    style={{ width: 12, height: 12,}}
                                  />
                                )}
                              </div>
                            )}
                            <div className=' border-r-4 px-2 border-dashed border-black'>
                            {chain.name}
                            </div>
                          </button>
                          <button onClick={openAccountModal} type="button">
                            {account.displayName}
                            {account.displayBalance
                              ? ` (${account.displayBalance})`
                              : ''}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
        );
      }}
    </ConnectButton.Custom>
  );
};