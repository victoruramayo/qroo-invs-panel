"use client";

import { Suspense, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import LoadingSpinner from "@/app/_components/commons/LoadingSpinner";
import { Box, Container } from "@mui/system";
import {
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import DashboardIcon from "@mui/icons-material/Dashboard";

function Login() {
  const FormSchema = z.object({
    email: z.string().email("Correo invalido"),
    password: z.string().min(6, {
      message: "Contrasenia debe tener al menos 6 caracteres.",
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

  const [showPassword, setShowPassword] = useState(false);
  const [loginError] = useState(
    params.get("error")
      ? "Credenciales incorrectas. Por favor, revisa tu correo o password."
      : "",
  );

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <DashboardIcon color="secondary" sx={{ mb: 2 }} fontSize="large" />

          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Iniciar Sesión
          </Typography>
          {loginError && (
            <Typography variant="subtitle2" color="error" align="center">
              {loginError}
            </Typography>
          )}
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1, width: "100%" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="Correo electrónico"
              autoComplete="email"
              autoFocus
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Contraseña"
              autoComplete="current-password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              type={showPassword ? "text" : "password"}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword
                            ? "hide the password"
                            : "display the password"
                        }
                        onClick={() => setShowPassword((show) => !show)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Ingresar
            </Button>
            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Don’t have an account?
              </Typography>
              <Typography variant="body2" color="primary">
                Contact with the admin user →
              </Typography>
            </Divider>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default function RootPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Login />
    </Suspense>
  );
}
