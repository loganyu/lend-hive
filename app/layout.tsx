"use client"

import './globals.css'
require('@solana/wallet-adapter-react-ui/styles.css')

import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';

import { DarkTheme, BaseProvider, styled } from 'baseui';

import WalletContextProvider from './components/WalletContextProvider'

const engine = new Styletron();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <StyletronProvider value={engine}>
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

