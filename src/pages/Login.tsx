import { Container, Paper, TextInput, PasswordInput, Button, Title } from '@mantine/core';
import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    alert(`Logging in with: ${email}`);
  };

  return (
    <Container size="xs" mt="xl">
      <Paper shadow="md" radius="md" p="xl" withBorder>
        <Title order={2} mb="md">Login</Title>
        <TextInput
          label="Email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          required
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          mt="md"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          required
        />
        <Button fullWidth mt="xl" onClick={handleLogin}>
          Login
        </Button>
      </Paper>
    </Container>
  );
};

export default Login;
