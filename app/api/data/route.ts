import { get } from 'http';
import { headers } from 'next/headers'

import { NextRequest } from "next/server";


 
export async function GET(request: NextRequest) {
  const publicKey = request.nextUrl.searchParams.get("publicKey")
  const headersList = headers()
  const referer = headersList.get('referer')
  const { RestClient, NftLoanSummaryRequest } = require("@hellomoon/api")
  const client = new RestClient(process.env.HELLOMOON_BEARER_TOKEN);
  const sharkyFiData = await client.send(new NftLoanSummaryRequest({
    "lender": "5hwJtfuFAVJMsVGkgk5k7UYh9o2hz1gDAtjXFKcpenGn"
  }))
  const nftAddresses = [...new Set(sharkyFiData.data.map((d: any) => d.collateralMint))].filter(m => m !== '')
  const metadata = await getMetadata(nftAddresses);

  const imageByMintAddress = {} as any
  metadata.forEach((m: any) => {
    imageByMintAddress[m.account] = m.offChainMetadata.metadata?.image
  })

  const json = JSON.stringify({sharkyFiData, imageByMintAddress}, null, 2);
 
  return new Response(json, {
    status: 200,
    headers: { referer: referer, "content-type": "application/json;charset=UTF-8" },
  })
}


const getMetadata = async (nftAddresses: any) => {
  const url = `https://api.helius.xyz/v0/token-metadata?api-key=${process.env.HELIUS_API_KEY}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      mintAccounts: nftAddresses,
      includeOffChain: true,
      disableCache: false,
    }),
  });

  const metadata = await response.json();

  return metadata
};

