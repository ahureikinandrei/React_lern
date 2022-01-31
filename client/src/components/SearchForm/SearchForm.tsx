import React, { FC, useCallback } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import SearchInput from '../SearchInput/SearchInput'
import { useActions } from '../../hooks/useActions'
import { generateIdCard } from '../../utils/generateIdCard'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { selectAuthStatus } from '../../store/reducers/auth/selectors'
import FavoriteBtn from '../FavoriteBtn/FavoriteBtn'
import {
    selectIsLoadingWeather,
    selectWeatherData,
} from '../../store/reducers/weather/selectors'

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
    const isLoading = useTypedSelector(selectIsLoadingWeather)
    const data = useTypedSelector(selectWeatherData)

    const addNewCard = useCallback((): void => {
        setNewCard({
            id: generateIdCard(),
        })
    }, [setNewCard])

    const btnCardStatus = (): boolean => {
        return isLoading || !data.address
    }

    return (
        <div className={classes.searchForm}>
            <SearchInput />
            <div className={classes.buttonsContainer}>
                <Button
                    size="small"
                    color="default"
                    variant="outlined"
                    onClick={addNewCard}
                    disabled={btnCardStatus()}
                >
                    Card
                </Button>
                {isAuth ? <FavoriteBtn /> : null}
            </div>
        </div>
    )
}

export default SearchForm
