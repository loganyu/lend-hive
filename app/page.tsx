"use client"

import NavBar from './components/NavBar'
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

export default function Home() {
  const { publicKey } = useWallet();

  return (
    <main>
      <NavBar />
      <div>
        {
          publicKey
          ?
          <div>{publicKey.toBase58()}</div>
          :
          <div>connect wallet</div>
        }
      </div>
    </main>
  )
}
