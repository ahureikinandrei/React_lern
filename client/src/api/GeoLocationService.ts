import { IGeolocationResponse } from './types'

export default class GeoLocationService {
    static getCurrentLocationCoords(): Promise<IGeolocationResponse> {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        resolve({
                            longitude: position.coords.longitude,
                            latitude: position.coords.latitude,
                        })
                    },
                    (e) => {
                        reject(e)
                    }
                )
            } else {
                reject(new Error('Location service not found'))
            }
        })
    }
}
