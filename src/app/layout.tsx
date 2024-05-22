'use client';
import { Suspense } from 'react';
import { Fira_Code } from 'next/font/google';
import cn from 'classnames';
import { QueryClientProvider } from '@/app/shared/query-client-provider';
import { ThemeProvider } from '@/app/shared/theme-provider';
import ModalsContainer from '@/components/modal-views/container';
import DrawersContainer from '@/components/drawer-views/container';
import SettingsButton from '@/components/settings/settings-button';
import SettingsDrawer from '@/components/settings/settings-drawer';
import 'overlayscrollbars/overlayscrollbars.css';
import 'swiper/css';
import 'swiper/css/pagination';
import '@/assets/css/scrollbar.css';
import '@/assets/css/globals.css';
import '@/assets/css/range-slider.css';
import { NextUIProvider } from '@nextui-org/react';
// import { Web3Provider } from "../config/Web3Provider";
import { PrivyProvider } from '@privy-io/react-auth';
import { opBNBTestnet, bscTestnet } from 'viem/chains';

const fira_code = Fira_Code({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" className={cn('light', fira_code.className)}>
      <head>
        {/* maximum-scale 1 meta tag need to prevent ios input focus auto zooming */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1 maximum-scale=1"
        />
      </head>
      <body>
        <NextUIProvider>
          <QueryClientProvider>
            <ThemeProvider>
              <PrivyProvider
                appId="clwhmjvlq00st4bziz8ya9wdv"
                config={{
                  // Configures email, wallet, Google, Apple, and Farcaster login
                  loginMethods: ['farcaster', 'wallet'],
                  appearance: {
                    // Defaults to true
                    showWalletLoginFirst: true,
                  },
                  // Replace this with your desired default chain
                  defaultChain: opBNBTestnet,
                  // Replace this with a list of your desired supported chains
                  supportedChains: [opBNBTestnet, bscTestnet],
                }}
                // onSuccess={ () => ( window.location.href = "/" )
                onSuccess={() => console.log('login success')}
              >
                <Suspense fallback={null}>
                  <ModalsContainer />
                  <DrawersContainer />
                </Suspense>
                {children}
              </PrivyProvider>
            </ThemeProvider>
          </QueryClientProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
