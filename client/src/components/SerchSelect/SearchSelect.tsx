import React, { FC } from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
            [theme.breakpoints.down('sm')]: {
                order: 3,
            },
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    })
)

const SearchSelect: FC = () => {
    const classes = useStyles()

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const handleChange = (): void => {}

    return (
        <FormControl className={classes.formControl}>
            <InputLabel id="SearchSelectLabel">City</InputLabel>
            <Select
                labelId="SearchSelectLabel"
                id="SearchSelect"
                value=""
                onChange={handleChange}
            >
                <MenuItem value={1}>City</MenuItem>
                <MenuItem value={2}>ZIP Code</MenuItem>
                <MenuItem value={3}>Latitude and Longitude</MenuItem>
            </Select>
        </FormControl>
    )
}

export default SearchSelect
