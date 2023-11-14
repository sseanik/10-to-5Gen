import { Button, Group, LoadingOverlay, Modal, Textarea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';

import { URL_CONFIG } from '@/assets/config';

export default function RegenerateModal({ meetingId }: { meetingId?: string }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [opened, { open, close }] = useDisclosure(false);
  const [value, setValue] = useState('');
  const [isQueryEnabled, setIsQueryEnabled] = useState(false);

  const regenerateData = async () => {
    const response = await fetch(`${URL_CONFIG}/regenerate`, {
      method: 'PUT',
      body: JSON.stringify({ prompt: value, path: pathname.split('/')[1], meetingId }),
    });
    const json = await response.json();
    return json;
  };

  const { isFetching } = useQuery({
    queryKey: ['regenerate'],
    queryFn: regenerateData,
    retry: 1,
    enabled: isQueryEnabled,
    onSuccess() {
      navigate(0);
    },
  });

  const handleSubmit = () => {
    setIsQueryEnabled(true);
  };

  return (
    <Group>
      <Modal opened={opened} onClose={close} title="Regenerate Data">
        <LoadingOverlay
          visible={isFetching}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 1 }}
          loaderProps={{ color: 'blue', type: 'bars', children: 'Regenerating...' }}
        />
        <Textarea
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
          label="Provide a prompt to use to adjust the generated data"
          placeholder="Enter your prompt"
          mb="md"
        />

        <Button fullWidth onClick={handleSubmit}>
          Submit
        </Button>
      </Modal>

      <Button onClick={open}>Regenerate</Button>
    </Group>
  );
}
