'use client';

import Button from '@/components/ui/button/button';
import { ethers } from 'ethers';
import InvestDay from './invest-day';
import AmountPerInvestment from './amount-per-investment';
import AdvanceSetting from './advance-setting';
import { useModal } from '@/components/modal-views/context';
import TokenInput from '@/components/ui/token-input';
import { SwapIcon } from '@/components/icons/swap-icon';
import { useState } from 'react';
import { coinList } from '@/data/static/coin-list';
import type { CoinTypes } from '@/types';

import { useMutation } from 'react-query';
import { getContract } from './dca';
import { usePrivy, useWallets } from '@privy-io/react-auth';

import { useLogin } from '@privy-io/react-auth';
import Input from '@/components/ui/forms/input';

export default function DcaForm() {
  const { ready, authenticated, user, logout } = usePrivy();
  const { wallets } = useWallets();
  const wallet = wallets[0];

  const { login } = useLogin({
    onError: (error) => {
      console.log(error);
    },
  });

  let [toggleCoin, setToggleCoin] = useState(false);

  const [selectedCoinCode, setSelectedCoinCode] = useState(coinList[0].code);

  const handleCoinCodeUpdate = (coinCode: any) => {
    setSelectedCoinCode(coinCode);
  };

  return (
    <>
      <form
        noValidate
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col rounded-lg bg-white p-4 shadow-card dark:bg-light-dark sm:p-6 lg:h-full 2xl:px-8"
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          className="rounded-md p-4 border-2"
        >
          <div>
            <span className="mb-1.5 ml-2 block text-xs uppercase text-gray-600 dark:text-gray-400">
              Deposit from
            </span>
            <TokenInput
              label={'depositeFrom'}
              exchangeRate={0.0}
              defaultCoinIndex={0}
              getCoinValue={(data) => console.log('From coin value:', data)}
              onCoinSelect={handleCoinCodeUpdate}
            />
          </div>

          {/* <div className="rounded-full bg-gray-100 shadow-large dark:bg-gray-600"> */}
          <button
            className="flex items-center font-medium  mt-5  rounded-full dark:text-gray-100  px-4 "
            onClick={() => setToggleCoin(!toggleCoin)}
          >
            <img
              src="https://i.imgur.com/vID9zVi.png"
              alt="arrow"
              className="transition-transform duration-4000 ease-in-out hover:transform hover:rotate-180 h-9 w-9"
            ></img>
          </button>
          {/* </div> */}

          <div>
            <span className="mb-1.5 mr-3 text-right block text-xs uppercase text-gray-600 dark:text-gray-400">
              To receive
            </span>
            <TokenInput
              label={'toReceive'}
              exchangeRate={0.0}
              defaultCoinIndex={1}
              getCoinValue={(data) => console.log('From coin value:', data)}
              // onCoinSelect={handleCoinCodeUpdate}
            />
          </div>
        </div>

        <div className="flex-grow mt-5">
          <div className="grid grid-cols-1 gap-6">
            {/* <InvestDay /> */}
            <AmountPerInvestment selectedCoinCode={selectedCoinCode} />
          </div>

          <div className="flex-grow mt-5">
            <div className="grid grid-cols-1 gap-6">
              <Input placeholder={'Address'}></Input>
            </div>
          </div>

          {ready && authenticated ? (
            <Button
              type="submit"
              shape="rounded"
              className="mt-8 w-full !font-bold uppercase dark:bg-blue-800"
            >
              Create
            </Button>
          ) : (
            <Button
              type="submit"
              shape="rounded"
              className="mt-8 w-full !font-bold uppercase dark:bg-blue-800"
              onClick={login}
            >
              {' '}
              Login
            </Button>
          )}
        </div>
      </form>
    </>
  );
}
