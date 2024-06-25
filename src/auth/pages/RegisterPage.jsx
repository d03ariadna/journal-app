import { Link as RouterLink } from 'react-router-dom';
import { Grid, Typography, TextField, Button, Link, Alert } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks';

const formData = {
  email: '',
  password: '',
  displayName: ''
}

const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe de tener @'],
  password: [(value) => value.length >= 6, 'El password debe de tener más de 6 dígitos'],
  displayName: [(value) => value.length >= 1, 'El nombre es obligatorio']

}

export const RegisterPage = () => {

  const dispatch = useDispatch();

  const [formSubmited, setFormSubmited] = useState(false);

  const { status, errorMessage } = useSelector(state => state.auth);
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

  const {email, password, displayName, onInputChange, formState,
  isFormValid, displayNameValid, emailValid, passwordValid} = useForm(formData, formValidations);


  const onSubmit = (e) => {
    e.preventDefault();
    setFormSubmited(true);

    if (!isFormValid) return;

    dispatch(startCreatingUserWithEmailPassword(formState));
  }

  return (
    
    <AuthLayout title='Create Account'>
      <form onSubmit={ onSubmit } 
            className='animate__animated animate__fadeIn animate__faster'>
        <Grid item xs={12} sx={{mt:2}}>
          <TextField
            label="Full Name"
            type="text"
            placeholder='Ariadna Martínez'
            fullWidth
            name="displayName"
            value={displayName}
            onChange={onInputChange}
            error={!!displayNameValid && formSubmited}
            helperText={displayNameValid}
          />
        </Grid>
        <Grid item xs={12} sx={{ mt:1 }}>
          <TextField
            label="Email"
            type="email"
            placeholder='correo@google.com'
            fullWidth
            name="email"
            value={email}
            onChange= {onInputChange}
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
            onChange= {onInputChange}
            error={!!passwordValid && formSubmited}
            helperText={passwordValid}
          />
        </Grid>

        
        <Grid container sx={{ mb: 2, mt: 1 }}>
          

          <Grid
            item
            xs={12}
            sx={{my: 2}}
            display={!!errorMessage ? '': 'none'}
          >
            <Alert severity='error'>
              {errorMessage}
            </Alert>
          </Grid>

          <Grid item xs={12}>
            <Button
              disabled={ isCheckingAuthentication }
              type='submit'
              variant='contained'
              fullWidth
            >
              Create Account
            </Button>
          </Grid>

          <Grid container direction='row' justifyContent='end' sx={{mt:3}}>

            {/* Componente Link de MUI - RouterLink de react-router-dom */}
            <Link component={RouterLink} color='inherit' to="/auth/login">
              <Typography>
                You already have an account? Log In
              </Typography>
            </Link>
            
            
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
    

  )
}
