import  {useState } from 'react';
import { Flex, VStack, Text, useColorModeValue, Heading, Box, Button, Input } from '@chakra-ui/react';
import axios from 'axios';
import { redirect } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleInputChange = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'https://exampletravelapi.datacakra.com/api/login',
        new URLSearchParams({
          email: formData.email,
          password: formData.password,
        }).toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          withCredentials: true,
        }
      );

      console.log('Login successful:', response.data);

      // Redirect to dashboard after successful login
      redirect('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Login failed. Please check your credentials.');
    }
  };

  return (
    <Flex
      minH={'100vh'}
      w={'100%'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <VStack spacing={8} mx={'auto'} maxW={'lg'} py={'12'} px={'6'}>
        <VStack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Masuk
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Silakan masuk ke akun Anda
          </Text>
        </VStack>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
          <VStack spacing={4} align="stretch">
            <Input
              placeholder="Email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
            />
            <Input
              placeholder="Password"
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              required
            />
            <Button onClick={handleLogin}>Masuk</Button>
            {loginError && <Text color="red.500">{loginError}</Text>}
          </VStack>
        </Box>
      </VStack>
    </Flex>
  );
};

export default Login;
