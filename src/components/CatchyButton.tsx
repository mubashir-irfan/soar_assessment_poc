import { Button } from '@mantine/core';
import { useState, useEffect } from 'react';

interface CatchyButtonProps {
  label: string;
  onClick: () => void;
}

function CatchyButton({ label, onClick }: CatchyButtonProps) {
  return (
    <Button
      onClick={onClick}
      className={`rounded-lg`}
      variant="gradient"
      gradient={{ from: 'indigo', to: 'cyan' }}
    >
      {label}
    </Button>
  );
}

export default CatchyButton;