import { Box, Text } from '@mantine/core';

import lottie from '@/assets/lotties/dashboard.json';
import Container from '@/components/Container';
import Header from '@/components/Header';

export default function About() {
  return (
    <Box mr="10px">
      <Header heading="About" description="Telstra Innovation Hackathon 2023 Submission" lottie={lottie} />
      <Container>
        <Text>
          <b>Team</b>: 10 to 5 Gen
        </Text>
        <Text>
          <b>Names</b>: David Gailey, Steven Yuen, Jason Hong, Sean Smith, Chris Qu
        </Text>
        <Text>
          <b>Summary:</b> We have built a functioning prototype that can upload meeting transcripts and produce
          AI-Generated details
        </Text>
        <Text>
          <b>Frontend: </b>We are using a custom made frontend built on top of React JS, Vite and deployed to Vercel
        </Text>
        <Text>
          <b>Backend: </b>We are using a Flask rest API, for our backend that integrates with a Firestore DB and OpenAI
          APIs for Generative AI
        </Text>
        <Text>
          <b>Design: </b>We have put a tremendous amount of effort into building a Mobile Responsive, Telsta Brand
          Refreshed Inspired UI.
        </Text>
        <Text>
          <b>API: </b>We have put a tremendous amount of effort building our prototype into a working product, where
          anyone can upload a transcript and generate meeting details for themselves
        </Text>
        <Text>
          <b>Instructions: </b>1. Simply upload a meeting transcript using the Upload Transcript Modal, 2. Go through
          each section as it generates details (NOTE: Do not navigate away when you see the bottom right Generating
          Button) 3. View Content 4. Interact with the Action Items and Suggested Tickets 5. Ask any question to the AI
          assistant on a meeting topic
        </Text>
        <Text>
          <b>Further Thoughts: </b>With more time and resources, we will connect our system to Microsoft Team&apos;s
          Graph API to schedule meetings, JIRA&apos;s Rest API to automatically generate tickets off a single click and
          connect to any Retro board service such as EasyRetro
        </Text>
      </Container>
    </Box>
  );
}
