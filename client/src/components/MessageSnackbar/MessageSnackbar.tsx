import React, { FC, useEffect, useState } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import { Alert } from '@material-ui/lab'
import { createStyles, makeStyles } from '@material-ui/core'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useActions } from '../../hooks/useActions'

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
    const { setError } = useActions()
    const error = useTypedSelector((state) => state.auth.error)

    const handleClose = (): void => {
        setError('')
    }

    useEffect(() => {
        if (error === '') {
            setOpen(false)
        } else {
            setOpen(true)
        }
    }, [error])

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
                onClose={handleClose}
                severity="error"
                className={classes.alignItem}
            >
                {error}
            </Alert>
        </Snackbar>
    )
}

export default MessageSnackbar
