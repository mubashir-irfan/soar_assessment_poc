import { Modal, Group } from '@mantine/core';
import { useState } from 'react';
import { WeeklyActivityUpdater } from '../shared/components';
import { CatchyButton } from '.';

function MockDataUpdater() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <div>
        <CatchyButton label="Mock Data Updater" onClick={() => setOpened(true)} />
      </div>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Mock Data Updaters"
        size="lg"
        className='bg-[lavender]'
      >
        <div className='p-4 bg-blue-200 border border-black border-solid my-4 rounded-lg flex flex-col gap-4'>
          <p className='text-justify'>
            This does not work right now because the API layer is relying on a mock simulated backend which is not behaving like a normal backend.
            It simply does not relay the effect of query invalidation.
          </p>
          <p>However, I have kept it here so that you can see the corresponding code to check how I normally handle refetching of stale data.</p>
        </div>
        <WeeklyActivityUpdater />
      </Modal>
    </>
  );
}

export default MockDataUpdater;