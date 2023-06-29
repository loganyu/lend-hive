"use client"

import { useEffect, useState } from 'react';

import NavBar from './components/NavBar';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

export default function Home() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [data, setData] = useState({});

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('/api/data?' + new URLSearchParams({publicKey: publicKey?.toBase58() as string}));
      const json = await response.json();
      console.log('data', json)
      setData(json);
    }

    if (!connection || !publicKey) { return }

    if (publicKey?.toBase58()) {
      getData()
    }
  }, [publicKey])

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
