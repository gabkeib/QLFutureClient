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
  let message = {
    genome: "string",
    subgenome: "string"
  }
  let stringifiedMessage = JSON.stringify(message)
  console.log(stringifiedMessage)
  fetch('https://qlfuturebackend.onrender.com/genome',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: stringifiedMessage
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
}