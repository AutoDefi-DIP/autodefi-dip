'use client';
import type { CoinTypes } from '@/types';
import { ChangeEvent, useState } from 'react';
import { useModal } from '@/components/modal-views/context';
import Input from '@/components/ui/forms/input';
import { Plus } from '@/components/icons/plus';
import Text from '../../ui/text';
import { coinList } from '@/data/static/coin-list';
import dynamic from 'next/dynamic';
const CoinSelectView = dynamic(
  () => import('@/components/ui/coin-select-view'),
);
import { investFormData } from '@/data/static/trading-data';
import cn from 'classnames';
import { Listbox } from '@/components/ui/listbox';
import InputLabel from '@/components/ui/input-label';
import { Transition } from '@/components/ui/transition';
import { ChevronDown } from '@/components/icons/chevron-down';
import { DatePicker } from '@nextui-org/react';
import { now, getLocalTimeZone } from '@internationalized/date';

export default function AmountPerInvestment({ selectedCoinCode }) {
  const { openModal } = useModal();
  let [state, setState] = useState(0);
  let [frequency, setFrequency] = useState(investFormData[0]);
  const [hmt, setHmt] = useState(0);
  const [amount, setAmount] = useState(0);

  return (
    <>
      <div className="flex md:flex-row justify-between items-center rounded-md p-4 border-2 space-y-4 md:space-y-0 md:space-x-4">
        <div>
          <span className="mb-1.5 ml-1 block text-xs uppercase text-gray-600 dark:text-gray-400">
            Stack <b>{selectedCoinCode}</b> Every
          </span>
          <div className="relative">
            <Listbox value={frequency} onChange={setFrequency}>
              <Listbox.Button className="flex h-10 w-full  items-center justify-between rounded-lg border border-[#E2E8F0] bg-gray-200/50 px-4 text-sm font-medium text-gray-900 outline-none transition-shadow duration-200 hover:border-gray-900 hover:ring-1 hover:ring-gray-900 dark:border-gray-700 dark:bg-light-dark dark:text-gray-100 dark:hover:border-gray-600 dark:hover:ring-gray-600 sm:h-12 sm:px-5">
                <div className="flex items-center mr-3">{frequency.name}</div>
                <ChevronDown />
              </Listbox.Button>
              <Transition
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute left-0 z-10 mt-1 w-full origin-top-right grid gap-0.5 rounded-lg border border-gray-200 bg-white p-1 shadow-large outline-none dark:border-gray-700 dark:bg-light-dark xs:p-2">
                  {investFormData.map((option) => (
                    <Listbox.Option key={option.id} value={option}>
                      {({ selected }) => (
                        <div
                          className={cn(
                            'flex cursor-pointer items-center rounded-md px-3 py-2 text-sm text-gray-900 transition dark:text-gray-100',
                            selected
                              ? 'bg-gray-200/70 font-medium dark:bg-gray-600/60'
                              : 'hover:bg-gray-100 dark:hover:bg-gray-700/70',
                          )}
                        >
                          {option.name}
                        </div>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </Listbox>
          </div>
        </div>
        <div className="border-x-2 h-11 mt-4 hidden md:block"></div>
        <div>
          <span className="mb-1.5 mr-2 block text-right text-xs uppercase text-gray-600 dark:text-gray-400">
            <b>{selectedCoinCode}</b> Per {frequency.value}{' '}
          </span>
          <div className="relative">
            <input
              className="flex h-10 w-full md:w-32 text-right items-center justify-between rounded-lg border border-[#E2E8F0] bg-gray-200/50 px-4 text-sm font-medium text-gray-900 outline-none transition-shadow duration-200 hover:border-gray-900 hover:ring-1 hover:ring-gray-900 dark:border-gray-700 dark:bg-light-dark dark:text-gray-100 dark:hover:border-gray-600 dark:hover:ring-gray-600 sm:h-12 sm:px-5"
              type="text"
              name="amount"
              id="1"
              placeholder="0"
              onChange={(e) => setHmt(parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center rounded-md p-4 border-2 space-y-4 md:space-y-0 md:space-x-4 mt-4">
        <div className="w-full md:w-auto">
          <DatePicker
            label="Starting From"
            variant="bordered"
            hideTimeZone
            color="default"
            showMonthAndYearPickers
            defaultValue={now(getLocalTimeZone())}
            className="w-full"
          />
        </div>
        <div className="border-x-2 h-11 mt-4 hidden md:block"></div>
        <div className="w-full md:w-auto">
          <DatePicker
            label="Until"
            variant="bordered"
            hideTimeZone
            color="default"
            showMonthAndYearPickers
            defaultValue={now(getLocalTimeZone())}
            className="w-full"
          />
        </div>
      </div>
    </>
  );
}
