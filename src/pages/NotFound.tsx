import { Container, Title, Text, Button } from '@mantine/core';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <Container size="sm" mt="xl">
    <Title order={2} c="red">404 - Page Not Found</Title>
    <Text mt="md">The page you’re looking for doesn’t exist.</Text>
    <Button mt="xl" component={Link} to="/">
      Back to Home
    </Button>
  </Container>
);

export default NotFound;
