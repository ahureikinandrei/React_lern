import React, { FC, useCallback } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import SearchInput from '../SearchInput/SearchInput'
import { useActions } from '../../hooks/useActions'
import { generateIdCard } from '../../utils/generateIdCard'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { selectAuthStatus } from '../../store/reducers/auth/selectors'
import { selectCurrentSelectedLocation } from '../../store/reducers/weather/selectors'

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
            height: 80,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        },
    })
)

const SearchForm: FC = () => {
    const classes = useStyles()
    const { setNewCard, addToUserFavouritesLocations } = useActions()
    const isAuth = useTypedSelector(selectAuthStatus)
    const location = useTypedSelector(selectCurrentSelectedLocation)

    const addNewCard = useCallback((): void => {
        setNewCard({
            id: generateIdCard(),
        })
    }, [setNewCard])

    const addLocationToFavorite = useCallback((): void => {
        if (location) {
            addToUserFavouritesLocations(location)
        }
    }, [location])

    return (
        <div className={classes.searchForm}>
            <SearchInput />
            <div className={classes.buttonsContainer}>
                {isAuth ? (
                    <Button
                        size="small"
                        color="default"
                        variant="outlined"
                        onClick={addLocationToFavorite}
                    >
                        Favorite
                    </Button>
                ) : null}
                <Button
                    size="small"
                    color="default"
                    variant="outlined"
                    onClick={addNewCard}
                >
                    Card
                </Button>
            </div>
        </div>
    )
}

export default SearchForm
