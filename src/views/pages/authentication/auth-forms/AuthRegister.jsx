import React, { useEffect } from 'react';
import { useDispatch } from 'store';
import { Link, useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import { strengthColor, strengthIndicator } from 'utils/password-strength';
import { openSnackbar } from 'store/slices/snackbar';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useStores } from 'contexts/StoreContext';
import RoutePaths from 'routes/routePaths';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const JWTRegister = ({ ...others }) => {
    const { registerAdminApiStore } = useStores();
    const theme = useTheme();
    const navigate = useNavigate();
    const scriptedRef = useScriptRef();
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = React.useState(false);
    const [checked, setChecked] = React.useState(true);

    const [strength, setStrength] = React.useState(0);
    const [level, setLevel] = React.useState();
    const { register } = useAuth();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    const ROLE_OPTIONS = [{ label: 'Admin', value: 'ADMIN' }];

    useEffect(() => {
        changePassword('123456');
    }, []);

    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">สมัครเข้าสู่ระบบด้วย username และ password</Typography>
                    </Box>
                </Grid>
            </Grid>

            <Formik
                initialValues={{
                    username: '',
                    password: '',
                    role_name: 'ADMIN',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    username: Yup.string().required('Username is required'),
                    password: Yup.string().required('Password is required'),
                    role_name: Yup.string().required('Role is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        const payload = {
                            username: values.username,
                            password: values.password,
                            role_name: values.role_name
                        };

                        await registerAdminApiStore.handleRegisterAdminService(payload);
                        console.log('redirect to:', payload);

                        if (scriptedRef.current) {
                            setStatus({ success: true });
                            setSubmitting(false);

                            dispatch(
                                openSnackbar({
                                    open: true,
                                    message: 'Register success',
                                    variant: 'alert',
                                    alert: { color: 'success' },
                                    close: false
                                })
                            );
                        }

                        setTimeout(() => {
                            navigate(RoutePaths.login, { replace: true });
                        }, 1000);
                    } catch (err) {
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                        }
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <FormControl
                            fullWidth
                            error={Boolean(touched.username && errors.username)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-username-register">Username</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-username-register"
                                type="text"
                                value={values.username}
                                name="username"
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            {touched.username && errors.username && <FormHelperText error>{errors.username}</FormHelperText>}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-register"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="password"
                                label="Password"
                                onBlur={handleBlur}
                                onChange={(e) => {
                                    handleChange(e);
                                    changePassword(e.target.value);
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                inputProps={{}}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-register">
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={Boolean(touched.role_name && errors.role_name)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <TextField
                                select
                                fullWidth
                                variant="outlined"
                                name="role_name"
                                value={values.role_name}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={Boolean(touched.role_name && errors.role_name)}
                                helperText={touched.role_name && errors.role_name}
                                InputLabelProps={{ shrink: true }}
                                sx={{ ...theme.typography.customInput }}
                            >
                                {ROLE_OPTIONS.map((role) => (
                                    <MenuItem key={role.value} value={role.value}>
                                        {role.label}
                                    </MenuItem>
                                ))}
                            </TextField>

                            {touched.role_name && errors.role_name && <FormHelperText error>{errors.role_name}</FormHelperText>}
                        </FormControl>

                        {/* {strength !== 0 && (
                            <FormControl fullWidth>
                                <Box sx={{ mb: 2 }}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Box sx={{ width: 85, height: 8, borderRadius: '7px', bgcolor: level?.color }} />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" fontSize="0.75rem">
                                                {level?.label}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </FormControl>
                        )} */}

                        <Grid container alignItems="center" justifyContent="space-between">
                            {/* <Grid item>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={checked}
                                            onChange={(event) => setChecked(event.target.checked)}
                                            name="checked"
                                            color="primary"
                                        />
                                    }
                                    label={
                                        <Typography variant="subtitle1">
                                            Agree with &nbsp;
                                            <Typography variant="subtitle1" component={Link} to="#">
                                                Terms & Condition.
                                            </Typography>
                                        </Typography>
                                    }
                                />
                            </Grid> */}
                        </Grid>
                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                >
                                    สมัครสมาชิก
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default JWTRegister;
