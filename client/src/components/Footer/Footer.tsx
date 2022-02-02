import React, { FC } from 'react'
import Typography from '@material-ui/core/Typography'
import CopyrightIcon from '@material-ui/icons/Copyright'
import { useStyles } from './styles'

const Footer: FC = () => {
    const { footer, copyrightIcon } = useStyles()
    return (
        <footer className={footer}>
            <Typography variant="h6">
                <CopyrightIcon className={copyrightIcon} />
                2022
            </Typography>
        </footer>
    )
}

export default Footer
