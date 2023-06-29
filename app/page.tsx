"use client"

import { useEffect, useState } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

import NavBar from './components/NavBar';
import LoanTable from './components/LoanTable';


export default function Home() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [data, setData] = useState({loans: [], metadataByMintAddress: {}} as any);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      const response = await fetch('/api/data?' + new URLSearchParams({publicKey: publicKey?.toBase58() as string}));
      const json = await response.json();
      console.log('data', json)
      setData(json);
      setLoading(false);
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
          loading
            ?
            <div>Loading...</div>
            :
            publicKey
              ?
                data.loans.length === 0
                  ?
                  <div>No loans</div>
                  :
                  <LoanTable loans={data.loans} metadataByMintAddress={data.metadataByMintAddress}/>
              :
            <div>Connect Wallet</div>
        }
      </div>
    </main>
  )
}
