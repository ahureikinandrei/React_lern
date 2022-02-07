import React, { FC, useCallback } from 'react'
import Button from '@material-ui/core/Button'
import SearchInput from '../SearchInput/SearchInput'
import FavoriteBtn from '../FavoriteBtn/FavoriteBtn'
import { useActions } from '../../hooks/useActions'
import { generateIdCard } from '../../utils/generateIdCard'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { selectAuthStatus } from '../../store/reducers/auth/selectors'
import {
    selectIsLoadingWeather,
    selectWeatherData,
} from '../../store/reducers/weather/selectors'
import { useStyles } from './styles'

const SearchForm: FC = () => {
    const { searchForm, buttonsContainer } = useStyles()
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
        <div className={searchForm}>
            <SearchInput />
            <div className={buttonsContainer}>
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
