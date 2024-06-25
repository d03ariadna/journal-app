import { Link as RouterLink } from 'react-router-dom';
import { Grid, Typography, TextField, Button, Link, Alert } from '@mui/material';
import {Google} from '@mui/icons-material'
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { checkigAuthentication, startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth';
import { useMemo, useState } from 'react';

const formData = {
  email: 'yuli@mimis.com',
  password: '12345678'
}

const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe de tener @'],
  password: [(value) => value.length >= 6, 'El password debe de tener más de 6 dígitos']

}

export const LoginPage = () => {

  const { status, errorMessage } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  
  const [formSubmited, setFormSubmited] = useState(false);

  const { email, password, onInputChange, isFormValid, emailValid, passwordValid } = useForm(formData);

  //Memorizo si esta autenticando
  const isAuthenticating = useMemo( () => status === 'checking', [status]);

  const onSubmit = (event) => {
    event.preventDefault();
    
    setFormSubmited(true);
    
    if (!isFormValid) return;

    dispatch(startLoginWithEmailPassword({ email, password }));

  }

  const onGoogleSignIn = () => {

    dispatch(startGoogleSignIn());
  }

  return (
    
    <AuthLayout title='Login'>
      <form onSubmit={onSubmit} 
        className='animate__animated animate__fadeIn animate__faster'>
        <Grid item xs={12}>
          <TextField
            label="Correo"
            type="email"
            placeholder='correo@google.com'
            fullWidth
            name="email"
            value={email}
            onChange={onInputChange}
            error={!!emailValid && formSubmited}
            helperText={emailValid}
            
          />
        </Grid>

        <Grid item xs={12} sx={{ mt:1 }}>
          <TextField
            label="Contraseña"
            type="password"
            placeholder='Contraseña'
            fullWidth
            name="password"
            value={password}
            onChange={onInputChange}
            error={!!passwordValid && formSubmited}
            helperText={passwordValid}
            
          />
        </Grid>

        <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
          
          <Grid
            item
            xs={12}
            display={!!errorMessage ? '': 'none'}
          >
            <Alert severity='error'>
              {errorMessage}
            </Alert>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button 
              variant='contained' 
              fullWidth
              type="submit"
              disabled={isAuthenticating}>
              Login
            </Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button 
              variant='contained' 
              fullWidth
              onClick={onGoogleSignIn}
              disabled={isAuthenticating}
            >
              <Google />
              <Typography sx={{ml:1}}>Login</Typography>
              
            </Button>
          </Grid>

          <Grid container direction='row' justifyContent='end' sx={{mt:3}}>

            {/* Componente Link de MUI - RouterLink de react-router-dom */}
            <Link component={RouterLink} color='inherit' to="/auth/register">
              Create Account
            </Link>
            
            
          </Grid>
        </Grid>
    </form>
  </AuthLayout>
    

  )
}
