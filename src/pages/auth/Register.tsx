import React, { useState, useEffect } from 'react';
import { Flex, Button, VStack, Stack, Text, useColorModeValue, Heading, Box, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter  } from '@chakra-ui/react';
import InputField from '@/components/InputField';
import axios from 'axios';
import { redirect } from 'react-router-dom';

// ...



interface RegisterFormData {
  email: string;
  password: string;
  name: string;
  password_confirmation: string;
}

interface RegisterProps {
  onRegister: (data: RegisterFormData) => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    password: '',
    name: '',
    password_confirmation: '',
  });
  const [isOpen, setIsOpen] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState<string | null>(null);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);


  const onDialogClose = () => {
    setIsOpen(false);
    setRegistrationStatus(null);
    setErrorMessages([]);
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    axios
      .post(
        'https://exampletravelapi.datacakra.com/api/register',
        new URLSearchParams({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          password_confirmation: formData.password_confirmation,
        }).toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          withCredentials: true,
        }
      )
      .then(response => {
        setRegistrationStatus('success');
        onRegister(formData);
        redirect('/dashboard');
      })
      .catch(error => {
        if (axios.isAxiosError(error)) {
          const errorData = error.response?.data.data;
          if (errorData) {
            setRegistrationStatus('error');
            const messages = Object.values(errorData).flat();
            setErrorMessages(messages.length > 0 ? messages : ['An error occurred during registration.']);
          }
        } else {
          console.error('An error occurred:', error);
          setErrorMessages(['An unexpected error occurred.']);
        }
      });
  };
  

  useEffect(() => {
    if(registrationStatus !== null){
      console.log('Registration status:', registrationStatus);
      setIsOpen(true);
    }
  }, [registrationStatus]);
  

  return (
    <Flex
      minH={'100vh'}
      w={'100%'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={'12'} px={'6'}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Mendaftar
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Daftarkan akun anda
          </Text>
        </Stack>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
        <VStack as="form" onSubmit={handleSubmit} spacing={4}>
            <InputField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <InputField
              label="Nama"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              minLength={8}
            />
            <InputField
              label="Konfirmasi Password"
              name="password_confirmation"
              type="password"
              value={formData.password_confirmation}
              onChange={handleInputChange}
              required
              minLength={8}
            />
            <Button type="submit">Daftar</Button>
          </VStack>
        </Box>
      </Stack>
      
      <AlertDialog isOpen={isOpen} onClose={onDialogClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              {registrationStatus === 'error' ? 'Registration Error' : 'Registration Success'}
            </AlertDialogHeader>
            <AlertDialogBody>
              {registrationStatus === 'success'
                ? 'Registration was successful!'
                : errorMessages.map((message, index) => (
                    <Text key={index} color="red.500">
                      {message}
                    </Text>
                  ))}
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={onDialogClose}>
                Close
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
    
  );
};

export default Register;
