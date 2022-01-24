import React, { FC } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search'
import { IconButton } from '@material-ui/core'
import { useFormik } from 'formik'
import { searchValidationSchema } from './validationSheme'
import { useActions } from '../../hooks/useActions'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        form: {
            display: 'flex',
        },
        input: {
            margin: theme.spacing(1),
            width: '40ch',
            [theme.breakpoints.down('sm')]: {
                order: -1,
            },
        },
        icon: {
            fontSize: theme.spacing(3),
        },
    })
)

const SearchInput: FC = () => {
    const classes = useStyles()
    const { getWeatherInfoFromQuery } = useActions()
    const formik = useFormik({
        initialValues: {
            query: '',
        },
        validationSchema: searchValidationSchema,
        onSubmit: (values) => {
            getWeatherInfoFromQuery(values.query)
        },
    })
    return (
        <form
            className={classes.form}
            onSubmit={formik.handleSubmit}
            autoComplete="off"
        >
            <TextField
                className={classes.input}
                id="outlined-basic"
                label="Search for location"
                variant="outlined"
                name="query"
                value={formik.values.query}
                onChange={formik.handleChange}
                error={formik.touched.query && Boolean(formik.errors.query)}
                helperText={formik.touched.query && formik.errors.query}
            />
            <IconButton type="submit">
                <SearchIcon className={classes.icon} />
            </IconButton>
        </form>
    )
}

export default SearchInput
