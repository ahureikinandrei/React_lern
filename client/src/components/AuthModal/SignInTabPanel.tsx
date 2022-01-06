import React, { FC, SyntheticEvent, useState } from 'react'
import FormGroup from '@material-ui/core/FormGroup'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { useActions } from '../../hooks/useActions'

interface ISignInTabPanelProps {
    onClose: () => void
}

const SignInTabPanel: FC<ISignInTabPanelProps> = ({ onClose }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login } = useActions()

    const onSubmit = (e: SyntheticEvent): void => {
        onClose()
        e.preventDefault()
        login(email, password)
    }

    const changeEmail = (e: any): void => {
        setEmail(e.target.value)
    }

    const changePassword = (e: any): void => {
        setPassword(e.target.value)
    }

    return (
        <div>
            <FormControl component="fieldset" fullWidth>
                <FormGroup aria-label="position" row>
                    <form onSubmit={onSubmit}>
                        <TextField
                            autoFocus
                            value={email}
                            id="sing_in_email"
                            label="Email"
                            onChange={changeEmail}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="standard"
                            type="email"
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            value={password}
                            id="sing_in_password"
                            label="Password"
                            onChange={changePassword}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="standard"
                            type="password"
                            margin="normal"
                            fullWidth
                        />
                        <Button
                            onClick={onSubmit}
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
