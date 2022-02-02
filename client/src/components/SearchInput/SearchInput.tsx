import React, { FC } from 'react'
import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search'
import IconButton from '@material-ui/core/IconButton'
import { useFormik } from 'formik'
import { searchValidationSchema } from './validationSheme'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { selectStatusZipCodeApi } from '../../store/reducers/settings/selectors'
import { useStyles } from './styles'

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
