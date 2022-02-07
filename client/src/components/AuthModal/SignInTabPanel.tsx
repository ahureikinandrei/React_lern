import React, { FC } from 'react'
import FormGroup from '@material-ui/core/FormGroup'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { useFormik } from 'formik'
import { useActions } from '../../hooks/useActions'
import { signInValidationSchema } from './validationSchems/validationSchems'

interface ISignInTabPanelProps {
    onClose: () => void
}

const SignInTabPanel: FC<ISignInTabPanelProps> = ({ onClose }) => {
    const { login } = useActions()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validateOnChange: false,
        validateOnBlur: false,
        validationSchema: signInValidationSchema,
        onSubmit: (values) => {
            const { email, password } = values
            onClose()
            login(email, password)
        },
    })

    return (
        <div>
            <FormControl component="fieldset" fullWidth>
                <FormGroup aria-label="position" row>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            autoFocus
                            value={formik.values.email}
                            id="sing_in_email"
                            label="Email"
                            name="email"
                            onChange={formik.handleChange}
                            variant="standard"
                            type="email"
                            margin="normal"
                            fullWidth
                            error={
                                formik.touched.email &&
                                Boolean(formik.errors.email)
                            }
                            helperText={
                                formik.touched.email && formik.errors.email
                            }
                        />
                        <TextField
                            value={formik.values.password}
                            id="sing_in_password"
                            label="Password"
                            name="password"
                            onChange={formik.handleChange}
                            variant="standard"
                            type="password"
                            margin="normal"
                            fullWidth
                            error={
                                formik.touched.password &&
                                Boolean(formik.errors.password)
                            }
                            helperText={
                                formik.touched.password &&
                                formik.errors.password
                            }
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Sign In
                        </Button>
                    </form>
                </FormGroup>
            </FormControl>
        </div>
    )
}

export default SignInTabPanel
