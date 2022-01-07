import React, { FC } from 'react'
import Button from '@material-ui/core/Button'

interface MainButtonProps {
    title: string
}

const MainButton: FC<MainButtonProps> = ({ title }) => {
    return <Button variant="outlined">{title}</Button>
}

export default MainButton
