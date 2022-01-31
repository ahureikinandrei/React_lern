import React, { FC, useEffect, useState } from 'react'
import { MapContainer, TileLayer, Popup, useMapEvents } from 'react-leaflet'
import './InteractiveMap.css'
import L, { LatLng } from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import { MapUrl } from '../../config/config'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import {
    selectTempInUnits,
    selectWeatherDataLatitude,
    selectWeatherDataLongitude,
    selectWeatherUnits,
} from '../../store/reducers/weather/selectors'

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
})

L.Marker.prototype.options.icon = DefaultIcon

interface IPopupData {
    temp: number
    lat: number
    lng: number
    units: string
}

export const LocationMarker: FC = () => {
    const [position, setPosition] = useState<LatLng | null>(null)
    const [popupData, setPopupsData] = useState<IPopupData[]>([])
    const latitude = useTypedSelector(selectWeatherDataLatitude)
    const longitude = useTypedSelector(selectWeatherDataLongitude)
    const temp = useTypedSelector(selectTempInUnits)
    const units = useTypedSelector(selectWeatherUnits)
    const map = useMapEvents({})

    useEffect(() => {
        map.setView([latitude, longitude])
    }, [])

    useEffect(() => {
        map.flyTo([latitude, longitude])
        setPosition({ lat: latitude, lng: longitude } as LatLng)
        if (
            popupData.some(({ lat, lng }) => {
                return lat === latitude && lng === longitude
            }) ||
            popupData.length > 5
        ) {
            return
        }
        setPopupsData([
            ...popupData,
            {
                lat: latitude,
                lng: longitude,
                temp,
                units,
            },
        ])
    }, [latitude, longitude, map])

    return position === null ? null : (
        <>
            {popupData.map(({ temp, lat, lng, units }) => {
                const key = `${lat}${lng}`

                return (
                    <Popup key={key} position={[lat, lng]} autoClose={false}>
                        {temp} {units}
                    </Popup>
                )
            })}
        </>
    )
}

const InteractiveMap = React.memo(function InteractiveMap() {
    return (
        <div contentEditable suppressContentEditableWarning>
            <MapContainer className="Map" center={[0, 0]} zoom={5}>
                <TileLayer url={MapUrl} />
                <LocationMarker />
            </MapContainer>
        </div>
    )
})

export default InteractiveMap
