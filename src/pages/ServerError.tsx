import { Container, Title, Text, Button } from '@mantine/core';
import { Link } from 'react-router-dom';

const ServerError = () => (
  <Container size="sm" mt="xl">
    <Title order={2} c="red">500 - Internal Server Error</Title>
    <Text mt="md">Something went wrong on our end. Please try again later.</Text>
    <Button mt="xl" component={Link} to="/">
      Back to Home
    </Button>
  </Container>
);

export default ServerError;
