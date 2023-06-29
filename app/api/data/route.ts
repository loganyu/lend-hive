import { get } from 'http';
import { headers } from 'next/headers'

import { NextRequest } from "next/server";


 
export async function GET(request: NextRequest) {
  const publicKey = request.nextUrl.searchParams.get("publicKey")
  const headersList = headers()
  const referer = headersList.get('referer')
  const { RestClient, NftLoanSummaryRequest } = require("@hellomoon/api")
  const client = new RestClient(process.env.HELLOMOON_BEARER_TOKEN);
  const response = await client.send(new NftLoanSummaryRequest({
    "lender": "5hwJtfuFAVJMsVGkgk5k7UYh9o2hz1gDAtjXFKcpenGn"
  }))
  const loans = response.data;
  const nftAddresses = [...new Set(loans.map((l: any) => l.collateralMint))].filter(m => m !== '')
  const metadata = await getMetadata(nftAddresses);

  const metadataByMintAddress = {} as any
  metadata.forEach((m: any) => {
    metadataByMintAddress[m.account] = {
      image: m.offChainMetadata.metadata?.image,
      symbol: m.offChainMetadata.metadata?.symbol,
      name: m.offChainMetadata.metadata?.name
    }
  })

  const json = JSON.stringify({loans, metadataByMintAddress, metadata}, null, 2);
 
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

