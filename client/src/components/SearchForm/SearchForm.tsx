import React, { FC } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import SearchInput from '../SearchInput/SearchInput'
import { useActions } from '../../hooks/useActions'
import { generateIdCard } from '../../utils/generateIdCard'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        searchForm: {
            display: 'flex',
            alignItems: 'center',
            [theme.breakpoints.down('sm')]: {
                flexWrap: 'wrap',
                justifyContent: 'center',
                width: '100%',
            },
        },
    })
)

const SearchForm: FC = () => {
    const classes = useStyles()
    const { setNewCard } = useActions()

    const addNewCard = (): void => {
        setNewCard({
            id: generateIdCard(),
        })
    }

    return (
        <div className={classes.searchForm}>
            <SearchInput />
            <Fab
                size="small"
                color="primary"
                aria-label="add"
                onClick={addNewCard}
            >
                <AddIcon />
            </Fab>
        </div>
    )
}

export default SearchForm
