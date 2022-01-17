import React, { FC, useEffect, useState } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import { Alert } from '@material-ui/lab'
import { createStyles, makeStyles } from '@material-ui/core'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useActions } from '../../hooks/useActions'
import { selectSnackbarData } from '../../store/reducers/selectors'

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

    const snackbarData = useTypedSelector(selectSnackbarData)

    const handleClose = (): void => {
        setOpen(false)
    }

    const handleExited = (): void => {
        setError('')
        setMessage('')
    }

    useEffect(() => {
        if (!snackbarData.message) {
            setOpen(false)
        } else {
            setOpen(true)
        }
    }, [snackbarData])

    return (
        <Snackbar
            open={open}
            autoHideDuration={4000}
            TransitionProps={{ onExited: handleExited }}
            onClose={handleClose}
        >
            <Alert
                severity={snackbarData.severityError ? 'error' : 'success'}
                className={classes.alignItem}
            >
                {snackbarData.message}
            </Alert>
        </Snackbar>
    )
}

export default MessageSnackbar
