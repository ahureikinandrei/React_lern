import React, { FC, useEffect, useState } from 'react'
import { MapContainer, TileLayer, Popup, useMapEvents } from 'react-leaflet'
import './InteractiveMap.css'
import { makeStyles } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core'
import L, { LatLng } from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import { MapUrl } from '../../config/config'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import {
    selectWeatherDataLatitude,
    selectWeatherDataLongitude,
} from '../../store/reducers/weather/selectors'

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
})

L.Marker.prototype.options.icon = DefaultIcon

const useStylesMap = makeStyles(() =>
    createStyles({
        mapContainer: {
            width: '100%',
            height: 245,
            borderRadius: 20,
        },
    })
)

interface ILocationMarkerProps {
    temp: number
}

const LocationMarker: FC<ILocationMarkerProps> = ({ temp }) => {
    const [position, setPosition] = useState<LatLng | null>(null)
    const latitude = useTypedSelector(selectWeatherDataLatitude)
    const longitude = useTypedSelector(selectWeatherDataLongitude)
    const map = useMapEvents({})

    useEffect(() => {
        map.flyTo([latitude, longitude])
        setPosition({ lat: latitude, lng: longitude } as LatLng)
    }, [latitude, longitude])

    return position === null ? null : (
        <Popup position={position} autoClose={false}>
            {temp} °C
        </Popup>
    )
}

interface IInteractiveMapProps {
    latitude: number
    longitude: number
}

const InteractiveMap: FC<IInteractiveMapProps> = ({ latitude, longitude }) => {
    const classes = useStylesMap()

    return (
        <MapContainer
            className={classes.mapContainer}
            center={[latitude, longitude]}
            zoom={5}
            dragging={false}
        >
            <TileLayer url={MapUrl} />
            <LocationMarker temp={-4} />
        </MapContainer>
    )
}

export default InteractiveMap
