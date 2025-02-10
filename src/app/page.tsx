"use client";

import { Suspense, useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Icon,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { MdDashboard } from "react-icons/md";
import { Field } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import LoadingSpinner from "@/app/_components/LoadingSpinner";

function Login() {
  const FormSchema = z.object({
    email: z.string().min(2, {
      message: "Email required.",
    }),
    password: z.string().min(6, {
      message: "Password required with min 6 characters.",
    }),
  });
  type FormData = z.infer<typeof FormSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const params = useSearchParams();
  const onSubmit = async (data: FormData) => {
    await signIn("credentials", { ...data, redirectTo: "/dashboard" });
  };

  const [visible, setVisible] = useState(false);
  const [loginError] = useState(
    params.get("error")
      ? "Invalid credentials. Please check your email and password."
      : "",
  );

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg="gray.900"
      color="white"
    >
      <Stack mx="auto" maxW="lg" py={12} px={6} align="center">
        <Box mb={4}>
          <Icon size="2xl" color="teal.300">
            <MdDashboard></MdDashboard>
          </Icon>
        </Box>
        <Stack align="center">
          <Heading fontSize="3xl" fontWeight="bold">
            Sign in to the workspace
          </Heading>
        </Stack>
        <Stack>
          {loginError && (
            <Text color="red.400" textAlign="center" mt={4}>
              {loginError}
            </Text>
          )}
        </Stack>
        <VStack my="8" gap={4}>
          <Field
            label="Correo"
            required
            invalid={!!errors.email}
            errorText={errors.email?.message}
          >
            <Input
              my="1"
              px="4"
              placeholder="Enter your email"
              variant="subtle"
              bg="gray.600"
              {...register("email")}
            />
          </Field>
          <Field
            label="Contrasenia"
            required
            mt="2"
            invalid={!!errors.password}
            errorText={errors.password?.message}
          >
            <PasswordInput
              px="4"
              my="1"
              bg="gray.600"
              placeholder="Enter your password"
              visible={visible}
              onVisibleChange={setVisible}
              {...register("password")}
            />
          </Field>
          <Center>
            <Button
              colorPalette="teal"
              size="lg"
              px="8"
              mt="8"
              onClick={handleSubmit(onSubmit)}
            >
              Continue
            </Button>
          </Center>
        </VStack>
        <Text textAlign="center" fontSize="sm" color="gray.400">
          Don’t have an account?{" "}
          <Text as="span" color="teal.300" cursor="pointer">
            Contact with the admin user →
          </Text>
        </Text>
      </Stack>
    </Flex>
  );
}

export default function RootPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Login />
    </Suspense>
  );
}
