import React, { FC } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '40ch',
                [theme.breakpoints.down('sm')]: {
                    order: -1,
                },
            },
        },
    })
)

const SearchInput: FC = () => {
    const classes = useStyles()
    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
            />
        </form>
    )
}

export default SearchInput
