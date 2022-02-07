import React, { FC } from 'react'
import FormGroup from '@material-ui/core/FormGroup'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { useFormik } from 'formik'
import { useActions } from '../../hooks/useActions'
import { signUpValidationSchema } from './validationSchems/validationSchems'

interface ISignUpTabPanelProps {
    onClose: () => void
}

const SignUpTabPanel: FC<ISignUpTabPanelProps> = ({ onClose }) => {
    const { registration } = useActions()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirm_password: '',
        },
        validateOnChange: false,
        validateOnBlur: false,
        validationSchema: signUpValidationSchema,
        onSubmit: (values) => {
            const { email, password } = values
            onClose()
            registration(email, password)
        },
    })

    return (
        <div>
            <FormControl component="fieldset" fullWidth>
                <FormGroup aria-label="position" row>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            autoFocus
                            id="sing_up_email"
                            label="E-Mail"
                            name="email"
                            variant="standard"
                            type="Email"
                            margin="normal"
                            fullWidth
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.email &&
                                Boolean(formik.errors.email)
                            }
                            helperText={
                                formik.touched.email && formik.errors.email
                            }
                        />
                        <TextField
                            id="sing_up_password"
                            label="Password"
                            name="password"
                            variant="standard"
                            type="password"
                            margin="normal"
                            fullWidth
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.password &&
                                Boolean(formik.errors.password)
                            }
                            helperText={
                                formik.touched.password &&
                                formik.errors.password
                            }
                        />
                        <TextField
                            id="sing_up_confirm_password"
                            label="Confirm password"
                            name="confirm_password"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="standard"
                            type="password"
                            margin="normal"
                            fullWidth
                            value={formik.values.confirm_password}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.password &&
                                Boolean(formik.errors.confirm_password)
                            }
                            helperText={
                                formik.touched.confirm_password &&
                                formik.errors.confirm_password
                            }
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Sign Up
                        </Button>
                    </form>
                </FormGroup>
            </FormControl>
        </div>
    )
}

export default SignUpTabPanel
