import React, { FC, useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { selectCurrentSelectedLocation } from '../../store/reducers/weather/selectors'
import { useActions } from '../../hooks/useActions'
import { selectFavouritesLocations } from '../../store/reducers/settings/selectors'
import {
    ALREADY_IN_FAVORITES_TOOLTIP_MESSAGE,
    NO_CITY_TOOLTIP_MESSAGE,
} from '../../config/constants'

const FavoriteBtn: FC = () => {
    const location = useTypedSelector(selectCurrentSelectedLocation)
    const favouritesLocations = useTypedSelector(selectFavouritesLocations)
    const { addToUserFavouritesLocations } = useActions()
    const [isDisabled, setState] = useState(false)
    const [titleText, setTitleText] = useState('')

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
        } else {
            if (location) {
                setTitleText(ALREADY_IN_FAVORITES_TOOLTIP_MESSAGE)
            } else {
                setTitleText(NO_CITY_TOOLTIP_MESSAGE)
            }
            setState(true)
        }
    }, [location, favouritesLocations])

    return (
        <Tooltip
            title={titleText}
            disableFocusListener
            disableTouchListener
            disableHoverListener={!isDisabled}
            arrow
        >
            <span>
                <Button
                    size="small"
                    color="default"
                    variant="outlined"
                    onClick={addLocationToFavorite}
                    disabled={isDisabled}
                >
                    Favorite
                </Button>
            </span>
        </Tooltip>
    )
}

export default FavoriteBtn
