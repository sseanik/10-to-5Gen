import { Box, Button, Code, Flex, ScrollArea, Stack, Text, Textarea } from '@mantine/core';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { useState } from 'react';

import { URL_CONFIG } from '@/assets/config';

export default function Assistant({ meetingId }: { meetingId: string }) {
  const [messages, setMessages] = useState<Array<{ user: string; message: string }>>([
    {
      user: 'ai',
      message:
        "Hello, I'm your AI Meeting Assistant. I can help you understand more about your meetings and the data generated. Feel free to ask me any questions you might have about your recent meetings, summaries, action items, tickets, or agendas. For example, you can ask about specific details of a meeting, clarifications on action items, updates on ticket statuses, or insights from the meeting summaries. Just type your question below, and I'll provide the information you need.",
    },
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [aiMessage, setAiMessage] = useState('');

  const fetchData = async () => {
    setCurrentMessage((prev) => {
      setMessages((prevMsgs) => [...prevMsgs, { user: 'user', message: prev }]);
      return '';
    });
    await fetchEventSource(`${URL_CONFIG}/assistant`, {
      method: 'POST',
      headers: { Accept: 'text/event-stream' },
      body: JSON.stringify({ meetingId, message: currentMessage }),
      onmessage(event) {
        setAiMessage((prev) => prev + event.data);
      },
      onclose() {
        if (aiMessage) {
          setAiMessage((prev) => {
            setMessages((prevMsgs) => [...prevMsgs, { user: 'ai', message: prev }]);
            return '';
          });
        }
      },
    });
  };

  return (
    <Box
      bg="#343541"
      w="100%"
      h="70vh"
      p="sm"
      display="flex"
      style={{ justifyContent: 'center', alignItems: 'center' }}
    >
      <Stack w="100%" justify="space-between" h="100%">
        <ScrollArea>
          <Stack h="100%" display="flex" justify="flex-end">
            {messages.map((message, idx) =>
              message.user === 'ai' ? (
                <Code
                  key={idx}
                  color="#181c20"
                  c="white"
                  bg="#272831"
                  w="auto"
                  block
                  fs="xl"
                  style={{ fontSize: '1rem', display: 'inline-flex', whiteSpace: 'pre-wrap' }}
                  ta="left"
                >
                  {message.message}
                </Code>
              ) : (
                <Box key={idx} bg="#343541" w="100%" p="sm" ta="right" h="auto">
                  <Text c="white" w="auto" fs="xl" style={{ fontSize: '1rem', display: 'inline-flex' }} ta="right">
                    {message.message}
                  </Text>
                </Box>
              ),
            )}
            {aiMessage && (
              <Code
                color="#181c20"
                c="white"
                bg="#272831"
                w="auto"
                block
                fs="xl"
                style={{ fontSize: '1rem', display: 'inline-flex', whiteSpace: 'pre-wrap' }}
                ta="left"
              >
                {aiMessage}
              </Code>
            )}
          </Stack>
        </ScrollArea>
        <Flex wrap="nowrap" gap="xs" className="override-textarea">
          <Textarea
            id="textarea-override"
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchData()}
            fs="large"
            placeholder="Message AI Assistant"
            w="90%"
            value={currentMessage}
            className="override-textarea"
            classNames={{
              label: '.assistant-text-area',
            }}
          />
          <Button w="10%" h="100%" color="black" onClick={() => fetchData()}>
            Submit
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
}
