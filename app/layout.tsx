"use client"

import './globals.css'
require('@solana/wallet-adapter-react-ui/styles.css')

import { Provider as StyletronProvider } from 'styletron-react';

import { DarkTheme, BaseProvider, styled } from 'baseui';

import WalletContextProvider from './components/WalletContextProvider'

import {styletron} from '../styletron';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <StyletronProvider value={styletron}>
          <BaseProvider theme={DarkTheme}>
            <WalletContextProvider>
              {children}
            </WalletContextProvider>
          </BaseProvider>
        </StyletronProvider>
      </body>
    </html>
  )
}

