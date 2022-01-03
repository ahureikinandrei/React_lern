import React, { FC } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import SearchSelect from '../SerchSelect/SearchSelect'
import SearchInput from '../SearchInput/SearchInput'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        searchForm: {
            display: 'flex',
            alignItems: 'center',
            [theme.breakpoints.down('sm')]: {
                flexWrap: 'wrap',
                justifyContent: 'space-evenly',
            },
        },
        searchFormFab: {
            [theme.breakpoints.down('sm')]: {
                order: 4,
            },
        },
    })
)

const SearchForm: FC = () => {
    const classes = useStyles()
    return (
        <div className={classes.searchForm}>
            <SearchSelect />
            <SearchInput />
            <Fab
                size="small"
                color="primary"
                aria-label="add"
                className={classes.searchFormFab}
            >
                <AddIcon />
            </Fab>
        </div>
    )
}

export default SearchForm
