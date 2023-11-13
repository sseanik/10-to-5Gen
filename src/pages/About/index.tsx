import { Box, List, Text } from '@mantine/core';

import lottie from '@/assets/lotties/dashboard.json';
import Container from '@/components/Container';
import Header from '@/components/Header';

export default function About() {
  return (
    <Box mr="10px">
      <Header heading="About" description="Telstra Innovation Hackathon 2023 Submission" lottie={lottie} />
      <Container>
        <Text>
          <b>Team Name</b>: 10 to 5Gen
        </Text>
        <Text>
          <b>Team Members</b>: Sean Smith, David Gailey, Jason Hong, Steven Yuen, Chris Qu
        </Text>

        <br />

        <Text>
          <b>Theme</b>: Use Generative AI (Gen AI) for enhancing customer and employee experiences
        </Text>
        <Text>
          <b>Entry</b>: Telstra Congregate
        </Text>
        <Text>
          <b>Description:</b> A dashboard portal with the ability to process past meetings and AI Generate useful
          Agile-related details and suggestions
        </Text>

        <br />

        <Text>
          <b>Frontend: </b>Custom Portal built on React JS, Vite, Mantine UI (customised). Deployed to Vercel.
        </Text>
        <Text>
          <b>Backend: </b>Flask rest API which integrates with a Firestore DB and OpenAI API (Model: gpt-3.5-turbo) for
          Generative data
        </Text>

        <br />

        <Text>
          <b>Design: </b>We have designed a Telstra Brand Refreshed Inspired UI, with a key focus on Mobile
          Responsiveness, Accessibility and Data Visualisation
        </Text>
        <Text>
          <b>Prototype: </b>We have built a working MVP prototype that takes in the Meetings Data, uploads the given
          data, NLP data and waits for the user to navigate to a section (e.g. Tickets, Agenda) in order to generate
          further data
        </Text>

        <br />

        <Text>
          <b>Instructions:</b>
        </Text>
        <List type="ordered">
          <List.Item>
            Upload a meeting transcript using the &apos;Upload Transcript&apos; Modal, located on the top right of the
            meetings page
          </List.Item>
          <List.Item>
            You will be then navigated to the meeting&apos;s page with the Transcript Uploaded shown
          </List.Item>
          <List.Item>Using the sidebar, choose an item you wish to view and generate further data</List.Item>
          <List.Item>
            Wait for the data to be generated. You will be able to see data being generated live. The bottom right
            &apos;Generating&apos; button, can view the JSON representation of the data being generated.
            <div>
              <b>
                NOTE: Do not navigate away from the page while the generating process is occurring (e.g. Do not interact
                with a different sidebar link while the data is generating)
              </b>
            </div>
          </List.Item>
          <List.Item>
            After generating Data, you can interact with our AI Assistant Modal, located on the top right of a meeting
            page
          </List.Item>
          <List.Item>Ask the AI any question or query hitting Enter and clicking the Submit button</List.Item>
        </List>

        <br />

        <Text>
          <b>Further Thoughts: </b>The next iterative process for our prototype is to connect our system to relevant
          APIs such as Microsoft Team&apos;s Graph API to schedule meetings, JIRA&apos;s Rest API to automatically
          generate tickets off a single click and connect to any Retro board service such as EasyRetro.
        </Text>
      </Container>
    </Box>
  );
}
