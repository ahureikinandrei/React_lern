import React, { FC } from 'react'
import FormGroup from '@material-ui/core/FormGroup'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

interface ISignUpTabPanelProps {
    onClose: () => void
}

const SignUpTabPanel: FC<ISignUpTabPanelProps> = ({ onClose }) => {
    const onSubmit = (e: any): void => {
        onClose()
        e.preventDefault()
    }

    return (
        <div>
            <FormControl component="fieldset" fullWidth>
                <FormGroup aria-label="position" row>
                    <form onSubmit={onSubmit}>
                        <TextField
                            autoFocus
                            id="sing_up_email"
                            label="E-Mail"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="standard"
                            type="Email"
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            id="sing_up_password"
                            label="Password"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="standard"
                            type="password"
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            id="sing_up_confirm_password"
                            label="Confirm password"
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
                            Sign Up
                        </Button>
                    </form>
                </FormGroup>
            </FormControl>
        </div>
    )
}

export default SignUpTabPanel
