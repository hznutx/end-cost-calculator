'use client';

import { useState } from 'react';
import { Button, Input, Card, Autocomplete, AutocompleteItem } from '@heroui/react';
import { FaDeleteLeft } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';

type Item = {
  id: number;
  name: string;
  price: number;
  dailyBudget: number;
  debt: number;
  targetDays?: number;
};

const currencyList = ['USD', 'THB', 'EUR', 'JPY', 'GBP', 'AUD', 'CAD', 'CHF', 'CNY', 'HKD', 'SGD'];

export default function ValueCalculator() {
  const [items, setItems] = useState<Item[]>([{ id: 1, name: 'iPhone', price: 1000, dailyBudget: 2, debt: 0 }]);

  const [currency, setCurrency] = useState('THB');

  const addItem = () => {
    setItems([...items, { id: Date.now(), name: '', price: 0, dailyBudget: 1, debt: 0 }]);
  };

  const deleteItem = (id: number) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const updateItem = (id: number, field: keyof Item, value: any) => {
    setItems(items.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  };

  const currencySymbol =
    new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency,
    })
      .formatToParts(1)
      .find((p) => p.type === 'currency')?.value || currency;

  return (
    <div className='max-w-3xl mx-auto space-y-4'>
      <Card className='p-4'>
        <Autocomplete label='Currency' defaultItems={currencyList.map((c) => ({ key: c, label: c }))} selectedKey={currency} onSelectionChange={(key) => key && setCurrency(String(key))}>
          {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
        </Autocomplete>
      </Card>

      {items.map((item, index) => {
        const price = item.price;
        const daily = item.dailyBudget;
        const adjustedPrice = price * (1 + item.debt / 100);

        const totalDays = item.targetDays && item.targetDays > 0 ? item.targetDays : daily ? adjustedPrice / daily : 0;

        const costPerDay = item.targetDays && item.targetDays > 0 ? adjustedPrice / item.targetDays : daily;

        const months = totalDays / 30;
        const years = totalDays / 365;

        return (
          <Card key={item.id} className='p-4 space-y-3'>
            <div className='grid grid-flow-row md:grid-flow-col items-center gap-3'>
              <Input label='Item' value={item.name} onChange={(e) => updateItem(item.id, 'name', e.target.value)} />
              <Input type='number' label={`Price (${currencySymbol})`} value={String(item.price)} onChange={(e) => updateItem(item.id, 'price', Number(e.target.value))} />
              <div className='inline-flex items-center gap-3'>
                <Input type='number' label='Cost per day' value={String(item.dailyBudget)} onChange={(e) => updateItem(item.id, 'dailyBudget', Number(e.target.value))} />
                or
                <Input type='number' label='Uses day' value={item.targetDays ? String(item.targetDays) : ''} onChange={(e) => updateItem(item.id, 'targetDays', e.target.value ? Number(e.target.value) : undefined)} />
              </div>
              <Input type='number' label='Debt %' value={String(item.debt)} onChange={(e) => updateItem(item.id, 'debt', Number(e.target.value))} />
            </div>
            <div className='flex w-full justify-between items-end'>
              <div className='pt-2 text-sm space-y-1'>
                {item.debt ? (
                  <p>
                    💳 Price after debt: {adjustedPrice.toFixed(2)} {currencySymbol}
                  </p>
                ) : null}

                <p>📅 Need to use: {totalDays.toFixed(0)} days</p>
                <p>
                  💰 Cost per day: {costPerDay.toFixed(2)} {currencySymbol}
                </p>
                <p>📆 ≈ {months.toFixed(1)} months</p>
                <p>🗓 ≈ {years.toFixed(2)} years</p>
              </div>
              {index > 0 && (
                <Button color='danger' size='sm' onPress={() => deleteItem(item.id)}>
                  Delete
                </Button>
              )}
            </div>
          </Card>
        );
      })}

      <Button color='primary' onPress={addItem}>
        + Add Item
      </Button>
    </div>
  );
}
