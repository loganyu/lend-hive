"use client"

import './globals.css'

import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';

import { LightTheme, BaseProvider, styled } from 'baseui';

const engine = new Styletron();
const Centered = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <StyletronProvider value={engine}>
          <BaseProvider theme={LightTheme}>
            <Centered>
              {children}
            </Centered>
          </BaseProvider>
        </StyletronProvider>
      </body>
    </html>
  )
}

