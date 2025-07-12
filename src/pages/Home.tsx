import { Container, Title, Text, Button } from '@mantine/core';
import { Link } from 'react-router-dom';

const Home = () => (
  <Container size="sm" mt="xl">
    <Title order={1}>Welcome to the Home Page</Title>
    <Text mt="md">This is the main landing page of the app.</Text>
    <Button mt="xl" component={Link} to="/login">
      Go to Login
    </Button>
  </Container>
);

export default Home;
