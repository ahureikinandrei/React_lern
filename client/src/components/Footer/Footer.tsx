import React, { FC } from 'react'
import { createStyles, makeStyles, Typography } from '@material-ui/core'
import CopyrightIcon from '@material-ui/icons/Copyright'

export const useStylesFooter = makeStyles((theme) =>
    createStyles({
        footer: {
            height: 100,
            flex: '0 0 auto',
            backgroundColor: theme.palette.footer.main,
            display: 'flex',
            alignItems: 'center',
            padding: '0 40px',
            '& h6': {
                display: 'flex',
                alignItems: 'center',
                color: 'white',
                fontWeight: 700,
                fontSize: 16,
            },
        },
        copyrightIcon: {
            paddingRight: 10,
            fontSize: 32,
        },
    })
)

const Footer: FC = () => {
    const classes = useStylesFooter()
    return (
        <footer className={classes.footer}>
            <Typography variant="h6">
                <CopyrightIcon className={classes.copyrightIcon} />
                2021
            </Typography>
        </footer>
    )
}

export default Footer
