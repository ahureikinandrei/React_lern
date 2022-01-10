import React, { FC, useState } from 'react'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { createStyles, makeStyles } from '@material-ui/core'
import { Theme } from '@material-ui/core/styles'
import AuthModal from '../AuthModal/AuthModal'
import SwitchSystem from '../Switch/SwitchSystem'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useActions } from '../../hooks/useActions'
import { selectAuthState } from '../../store/reducers/auth/selectors'

const useStylesHeader = makeStyles((theme: Theme) =>
    createStyles({
        headerSettings: {
            display: 'flex',
            alignItems: 'center',
            [theme.breakpoints.down('md')]: {
                flexDirection: 'column',
            },
        },
    })
)

const HeaderSettings: FC = () => {
    const classes = useStylesHeader()
    const { isAuth, isLoading } = useTypedSelector(selectAuthState)
    const { logout } = useActions()
    const [visibleModal, setVisibleModal] = useState(false)

    const handleClickOpenModal = (): void => {
        if (isLoading) {
            return
        }

        setVisibleModal(true)
    }

    const handleClickCloseModal = (): void => {
        setVisibleModal(false)
    }

    const onClickHandler = (): void => {
        if (isLoading) {
            return
        }

        if (isAuth) {
            logout()
        }
    }

    if (isLoading) {
        return <CircularProgress />
    }

    return (
        <div className={classes.headerSettings}>
            <div />
            <SwitchSystem />
            {isAuth ? (
                <Button variant="outlined" onClick={onClickHandler}>
                    Logout
                </Button>
            ) : (
                <Button variant="outlined" onClick={handleClickOpenModal}>
                    Sign In
                </Button>
            )}
            <AuthModal visible={visibleModal} onClose={handleClickCloseModal} />
        </div>
    )
}

export default HeaderSettings
