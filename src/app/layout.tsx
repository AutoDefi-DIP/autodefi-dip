import { Suspense } from 'react';
import { Fira_Code } from 'next/font/google';
import cn from 'classnames';
import { QueryClientProvider } from '@/app/shared/query-client-provider';
import { ThemeProvider } from '@/app/shared/theme-provider';
// import WagmiConfig from '@/app/shared/wagmi-config';
import ModalsContainer from '@/components/modal-views/container';
import DrawersContainer from '@/components/drawer-views/container';
import SettingsButton from '@/components/settings/settings-button';
import SettingsDrawer from '@/components/settings/settings-drawer';
// base css file
import 'overlayscrollbars/overlayscrollbars.css';
import 'swiper/css';
import 'swiper/css/pagination';
import '@/assets/css/scrollbar.css';
import '@/assets/css/globals.css';
import '@/assets/css/range-slider.css';

// import { Web3Provider } from "../config/Web3";

// import { WagmiConfig, createConfig } from 'wagmi';
// import {
//   ConnectKitProvider,
//   getDefaultConfig,
// } from 'connectkit';

// const config = createConfig(
//   getDefaultConfig({
//     // Required API Keys
//     alchemyId: process.env.ALCHEMY_ID, // or infuraId
//     walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,

//     // Required
//     appName: 'AutoDCA',

//     // Optional
//     appDescription: 'Decentralized Investment Planner',
//     appUrl: 'https://family.co', // your app's url
//     appIcon: 'https://family.co/logo.png', // your app's icon, no bigger than 1024x1024px (max. 1MB)
//   }),
// );

const fira_code = Fira_Code({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'AutoDCA',
  description: 'AutoDCA is one stop dapp for investment',
};

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
        <QueryClientProvider>
          <ThemeProvider>
            {/* <WagmiConfig> */}
            {/* <Web3Provider> */}
            {/* <SettingsButton />
                <SettingsDrawer /> */}

            <Suspense fallback={null}>
              <ModalsContainer />
              <DrawersContainer />
            </Suspense>
            {children}
            {/* </Web3Provider> */}
            {/* </WagmiConfig> */}
            {/* </ConnectKitProvider>
              </ WagmiConfig> */}
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
