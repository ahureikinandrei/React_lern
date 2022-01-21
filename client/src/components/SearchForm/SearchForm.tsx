import React, { FC, useCallback } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import SearchInput from '../SearchInput/SearchInput'
import { useActions } from '../../hooks/useActions'
import { generateIdCard } from '../../utils/generateIdCard'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { selectAuthStatus } from '../../store/reducers/auth/selectors'
import FavoriteBtn from '../FavoriteBtn/FavoriteBtn'

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
        buttonsContainer: {
            display: 'flex',
            justifyContent: 'space-between',
        },
    })
)

const SearchForm: FC = () => {
    const classes = useStyles()
    const { setNewCard } = useActions()
    const isAuth = useTypedSelector(selectAuthStatus)

    const addNewCard = useCallback((): void => {
        setNewCard({
            id: generateIdCard(),
        })
    }, [setNewCard])

    return (
        <div className={classes.searchForm}>
            <SearchInput />
            <div className={classes.buttonsContainer}>
                <Button
                    size="small"
                    color="default"
                    variant="outlined"
                    onClick={addNewCard}
                >
                    Card
                </Button>
                {isAuth ? <FavoriteBtn /> : null}
            </div>
        </div>
    )
}

export default SearchForm
