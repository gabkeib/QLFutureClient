'use client';

import { Button, Group, useMantineColorScheme } from '@mantine/core';

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();

  return (
    <Group justify="center" mt="xl">
      <Button onClick={() => setColorScheme('light')}>Light</Button>
      <Button onClick={() => setColorScheme('dark')}>Dark</Button>
      <Button onClick={() => setColorScheme('auto')}>Auto</Button>
      <Button onClick={() => calculateSubgenomes()}>Click me</Button>
    </Group>
  );
}

function calculateSubgenomes() {
  const message = {
    genome: 'string',
    subgenome: 'string',
  };
  const stringifiedMessage = JSON.stringify(message);
  fetch('https://qlfuturebackend.onrender.com/genome',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: stringifiedMessage,
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    });
}
