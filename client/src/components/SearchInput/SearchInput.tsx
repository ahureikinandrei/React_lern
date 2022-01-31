import React, { FC } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search'
import { IconButton } from '@material-ui/core'
import { useFormik } from 'formik'
import { searchValidationSchema } from './validationSheme'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { selectStatusZipCodeApi } from '../../store/reducers/settings/selectors'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        form: {
            display: 'flex',
            alignItems: 'center',
        },
        input: {
            margin: theme.spacing(1),
            width: '40ch',
            [theme.breakpoints.down('sm')]: {
                order: -1,
            },
        },
        searchBtn: {
            height: 50,
            border: '1px solid rgba(0, 0, 0, 0.23)',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: theme.palette.whiteBackground.main,
            marginRight: 12,
        },
        icon: {
            fontSize: theme.spacing(3),
        },
    })
)

const SearchInput: FC = () => {
    const { form, input, searchBtn, icon } = useStyles()
    const isZipCodeApiStatus = useTypedSelector(selectStatusZipCodeApi)

    const { getWeatherInfoFromQuery } = useActions()
    const formik = useFormik({
        initialValues: {
            query: '',
        },
        validationSchema: searchValidationSchema,
        onSubmit: (values) => {
            getWeatherInfoFromQuery(values.query, isZipCodeApiStatus)
        },
    })
    return (
        <form
            className={form}
            onSubmit={formik.handleSubmit}
            autoComplete="off"
        >
            <TextField
                className={input}
                id="outlined-basic"
                label="Search for location"
                variant="outlined"
                name="query"
                value={formik.values.query}
                onChange={formik.handleChange}
                error={formik.touched.query && Boolean(formik.errors.query)}
                helperText={formik.touched.query && formik.errors.query}
            />
            <IconButton type="submit" className={searchBtn}>
                <SearchIcon className={icon} />
            </IconButton>
        </form>
    )
}

export default SearchInput
