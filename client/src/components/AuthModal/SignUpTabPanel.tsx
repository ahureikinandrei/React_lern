import React, { FC } from 'react'
import FormGroup from '@material-ui/core/FormGroup'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useActions } from '../../hooks/useActions'

const validationSchema = yup.object({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(5, 'Password should be of minimum 5 characters length')
        .max(12, 'Password should be of maximum 12 characters length')
        .required('Password is required'),
    confirm_password: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
})

interface ISignUpTabPanelProps {
    onClose: () => void
}

const SignUpTabPanel: FC<ISignUpTabPanelProps> = ({ onClose }) => {
    const { registration } = useActions()
    const formik = useFormik({
        initialValues: {
            email: 'test@mail.ru',
            password: 'password',
            confirm_password: 'password',
        },
        validateOnChange: false,
        validateOnBlur: false,
        validationSchema,
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
                            InputLabelProps={{
                                shrink: true,
                            }}
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
                            InputLabelProps={{
                                shrink: true,
                            }}
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
