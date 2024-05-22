// import trading chartData
import { candlesDataTwo, volumeData } from '@/data/static/trading-data';

import MinimalLayout from '@/layouts/minimal/layout';
import BotFilterTab from '@/components/trading-bot/bot-filter-tab';
import CoinBar from '@/components/trading-bot/coin-bar';
import CoinList from '@/components/trading-bot/coin-list';
import InvestForm from '@/components/trading-bot/invest-form';
import TradingChart from '@/components/trading-bot/trading-chart';
import InvestmentTab from '@/components/trading-bot/investment-tab';
import DcaForm from '@/components/trading-bot/dca-form';

export default function TradingBot() {
  return (
    <>
      {/* <BotFilterTab /> */}
      {/* <CoinBar /> */}
      <div className="mt-4 grid grid-cols-12 gap-6 lg:ml-44  lg:mr-44">
        <div className="order-2 col-span-full @4xl:col-span-6 @6xl:order-2 @7xl:order-2 @7xl:col-span-4 @[107.5rem]:order-3 @[107.5rem]:col-span-3">
          <DcaForm />
        </div>
      </div>
    </>
  );
}
