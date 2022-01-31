import React, { FC } from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { selectStatusZipCodeApi } from '../../store/reducers/settings/selectors'
import { useActions } from '../../hooks/useActions'

const ZipCodeCheckbox: FC = () => {
    const isZipCodeApiStatus = useTypedSelector(selectStatusZipCodeApi)
    const { toggleZipCodeApi } = useActions()

    const onChange = (): void => {
        toggleZipCodeApi(!isZipCodeApiStatus)
    }

    return (
        <FormControlLabel
            value="zip"
            control={
                <Checkbox
                    checked={isZipCodeApiStatus}
                    color="primary"
                    onChange={onChange}
                />
            }
            label="Zip code"
            labelPlacement="top"
        />
    )
}

export default ZipCodeCheckbox
