import { Affix, Box, Button, Code, Collapse, Loader, ScrollArea, Text, Transition } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';

import { Action, Agenda, Minutes, MockAllData, Tickets } from '@/types/Data';

export default function Progress({
  mounted,
  text,
}: {
  mounted: boolean;
  text: string | Action | Agenda | Minutes | Tickets | MockAllData;
}) {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <Affix position={{ bottom: 20, right: 20 }}>
      <Transition transition="slide-up" mounted={mounted}>
        {(transitionStyles) => (
          <>
            <Button
              leftSection={!opened ? <IconChevronUp /> : <IconChevronDown />}
              rightSection={<Loader color="white" type="dots" size="sm" />}
              style={transitionStyles}
              onClick={toggle}
              color="black"
              radius={0}
              w={opened ? '30vw' : undefined}
            >
              Generating Data
            </Button>

            <Collapse in={opened} transitionTimingFunction="ease" transitionDuration={250}>
              <Box bg="gray.9" w="30vw" h="40vh" px="md" py="sm">
                <Text c="white" size="sm" mb="xs">
                  Note: Do not navigate away while data is generating
                </Text>
                <ScrollArea c="white" w="100%" bg="gray.9" h="90%">
                  <Code color="black" c="white" block w="100%">
                    {JSON.stringify(text, null, 2)}
                  </Code>
                </ScrollArea>
              </Box>
            </Collapse>
          </>
        )}
      </Transition>
    </Affix>
  );
}
