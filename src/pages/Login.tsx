import { Container, Paper, TextInput, PasswordInput, Button, Title } from '@mantine/core';
import { useState } from 'react';
import { apiStatus } from '../constant/api-status';
import useAuth from '../service/hooks/useAuth';
import { Cookies } from '../utility/cookies';

const Login = () => {
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {data,exec,status,error}=useAuth()

  const handleLogin = async() => {
    exec({username,password});
    if(data){
      Cookies.set("auth-token",data.data["accessToken"],1)
      Cookies.set("refresh-token",data.data["refreshToken"],1)
    }else if(error){
      console.log(error)
    }
  };

  return (
    <Container size="xs" mt="xl">
      {status === apiStatus["PENDING"] && <h1>Pending</h1>}
      <Paper shadow="md" radius="md" p="xl" withBorder>
        <Title order={2} mb="md">Login</Title>
        <TextInput
          label="Email"
          placeholder="you@example.com"
          value={username}
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
