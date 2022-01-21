import React, { FC, useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { selectCurrentSelectedLocation } from '../../store/reducers/weather/selectors'
import { useActions } from '../../hooks/useActions'
import { selectFavouritesLocations } from '../../store/reducers/settings/selectors'

const FavoriteBtn: FC = () => {
    const location = useTypedSelector(selectCurrentSelectedLocation)
    const favouritesLocations = useTypedSelector(selectFavouritesLocations)
    const { addToUserFavouritesLocations } = useActions()
    const [isDisabled, setState] = useState(false)

    const addLocationToFavorite = (): void => {
        if (location) {
            addToUserFavouritesLocations(location)
        }
    }

    useEffect(() => {
        if (
            location &&
            !favouritesLocations.some((locationsItem) => {
                return locationsItem.name === location.name
            })
        ) {
            setState(false)
        }
        setState(true)
    }, [location, favouritesLocations])

    return (
        <Button
            size="small"
            color="default"
            variant="outlined"
            onClick={addLocationToFavorite}
            disabled={isDisabled}
        >
            Favorite
        </Button>
    )
}

export default FavoriteBtn
