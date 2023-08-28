import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  FormErrorMessage,
} from '@chakra-ui/react';
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (name: string, value: string) => void;
  required?: boolean;
  minLength?: number;
  pattern?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  required,
  minLength,
  pattern,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  const handlePasswordVisibilityToggle = () => {
    setShowPassword((prevValue) => !prevValue);
  };

  return (
    <FormControl isRequired={required}>
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        <Input
          type={type === 'password' && showPassword ? 'text' : type}
          name={name}
          value={value}
          onChange={handleInputChange}
          pattern={pattern}
          minLength={minLength}
        />
        {type === 'password' && (
          <InputRightElement width="4.5rem">
            <button onClick={handlePasswordVisibilityToggle}>
              {showPassword ? <AiOutlineEyeInvisible></AiOutlineEyeInvisible> : <AiOutlineEye></AiOutlineEye>}
            </button>
          </InputRightElement>
        )}
      </InputGroup>
      {/* Tampilkan pesan kesalahan jika ada */}
      <FormErrorMessage>Error Message Here</FormErrorMessage>
    </FormControl>
  );
};

export default InputField;
