import { Button, Select, TextInput } from '@mantine/core';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { usePost } from '../hooks/apiQueryHooks';
import { APIEndpoints } from '../services';

function WeeklyActivityUpdater() {
  const [amount, setAmount] = useState(0);
  const [isDeposit, setIsDeposit] = useState(true);
  const queryClient = useQueryClient();

  const { mutate: updateActivity, isPending } = usePost(
    '/weekly-activity/update',
    () => {
      queryClient.invalidateQueries({
        queryKey: [APIEndpoints.weeklyActivity.getWeeklyActivity()],
        refetchType: 'active',
        predicate: (query) => query.queryKey.includes('weekly-activity'),
      });
    },
    () => { }
  );

  const handleUpdate = () => {
    updateActivity({
      amount,
      isDeposit,
    });
  };

  return (
    <div className='px-4 flex flex-col gap-4'>
      <p className='text-text-secondary'>
        Update Weekly Activity
      </p>
      <div className='w-full flex justify-between items-center gap-4'>
        <TextInput
          type="number"
          value={amount}
          onChange={(event) => setAmount(Number(event.currentTarget.value))}
          placeholder="Amount"
          label="Amount"
          min={0}
        />
        <Select
          label="Transaction Type"
          value={isDeposit.toString()}
          onChange={(value) => setIsDeposit(value === 'true')}
          data={[
            { value: 'true', label: 'Deposit' },
            { value: 'false', label: 'Withdrawal' },
          ]}
        />
        <Button
          onClick={handleUpdate}
          loading={isPending}
          variant="filled"
          color="black"
          className='mt-auto'
        >
          Update
        </Button>
      </div>


    </div>
  );
}

export default WeeklyActivityUpdater;