import React, { FC, useEffect, useState } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import { Alert } from '@material-ui/lab'
import { createStyles, makeStyles } from '@material-ui/core'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useActions } from '../../hooks/useActions'
import { selectError, selectMessage } from '../../store/reducers/auth/selectors'

const useStyles = makeStyles(() =>
    createStyles({
        alignItem: {
            alignItems: 'center',
        },
    })
)

const MessageSnackbar: FC = () => {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const { setError, setMessage } = useActions()
    const error = useTypedSelector(selectError)
    const message = useTypedSelector(selectMessage)

    const handleClose = (): void => {
        setOpen(false)
    }

    const handleExited = (): void => {
        setError('')
        setMessage('')
    }

    useEffect(() => {
        if (error === '' && message === '') {
            setOpen(false)
        } else {
            setOpen(true)
        }
    }, [error, message])

    return (
        <Snackbar
            open={open}
            autoHideDuration={4000}
            TransitionProps={{ onExited: handleExited }}
            onClose={handleClose}
        >
            <Alert
                severity={error ? 'error' : 'success'}
                className={classes.alignItem}
            >
                {error || message}
            </Alert>
        </Snackbar>
    )
}

export default MessageSnackbar
