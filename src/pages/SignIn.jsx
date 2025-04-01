import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/reducers/authSlice';
import {
    Box,
    Button,
    Checkbox,
    CssBaseline,
    FormControlLabel,
    Divider,
    FormLabel,
    FormControl,
    Link,
    TextField,
    Typography,
    Card,
    CardContent,
    Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { GoogleIcon, FacebookIcon } from '../components/SignInIcons';
import ForgotPassword from '../components/ForgotPassword';

const StyledCard = styled(Card)(({ theme }) => ({
    width: 380,
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[6],
    background: 'white',
}));

const BackgroundWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(to bottom, #f0f2f5, #ffffff)',
}));

export default function SignIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [open, setOpen] = useState(false);

    const validateInputs = () => {
        let isValid = true;
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setEmailError(true);
            isValid = false;
        } else {
            setEmailError(false);
        }
        if (!password || password.length < 6) {
            setPasswordError(true);
            isValid = false;
        } else {
            setPasswordError(false);
        }
        return isValid;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateInputs()) return;
        dispatch(login({ email }));
        navigate('/');
    };

    return (
        <BackgroundWrapper>
            <CssBaseline />
            <StyledCard>
                <CardContent>
                    <Typography variant="h5" 
                     align="center" 
                     gutterBottom 
                     sx={{ fontWeight: 'bold' }}
                      >
                         🚀 Welcome to Task Trek 🌍
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                        <FormControl fullWidth margin="normal">
                            <FormLabel>Email</FormLabel>
                            <TextField
                                error={emailError}
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                autoComplete="email"
                                fullWidth
                                variant="outlined"
                            />
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <FormLabel>Password</FormLabel>
                            <TextField
                                error={passwordError}
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••"
                                autoComplete="current-password"
                                fullWidth
                                variant="outlined"
                            />
                        </FormControl>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <ForgotPassword open={open} handleClose={() => setOpen(false)} />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
                            Sign in
                        </Button>
                        <Link
                            component="button"
                            onClick={() => setOpen(true)}
                            variant="body2"
                            sx={{ display: 'block', textAlign: 'center', mt: 1 }}
                        >
                            Forgot your password?
                        </Link>
                    </Box>
                    <Divider sx={{ my: 2 }}>or</Divider>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Button fullWidth variant="outlined" startIcon={<GoogleIcon />}>
                                Sign in with Google
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button fullWidth variant="outlined" startIcon={<FacebookIcon />}>
                                Sign in with Facebook
                            </Button>
                        </Grid>
                    </Grid>
                    <Typography sx={{ textAlign: 'center', mt: 2 }}>
                        Don't have an account?{' '}
                        <Link href="/sign-up" variant="body2">
                            Sign up
                        </Link>
                    </Typography>
                </CardContent>
            </StyledCard>
        </BackgroundWrapper>
    );
}
