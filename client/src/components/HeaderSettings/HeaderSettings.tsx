import React, { FC, useState } from 'react'
import Button from '@material-ui/core/Button'
import { createStyles, makeStyles } from '@material-ui/core'
import { Theme } from '@material-ui/core/styles'
import AuthModal from '../AuthModal/AuthModal'
import SwitcherUnits from '../SwitcherUnits/SwitcherUnits'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useActions } from '../../hooks/useActions'
import {
    selectAuthIsLoading,
    selectAuthStatus,
} from '../../store/reducers/auth/selectors'

const useStylesHeader = makeStyles((theme: Theme) =>
    createStyles({
        headerSettings: {
            display: 'flex',
            alignItems: 'center',
            paddingRight: 40,
            [theme.breakpoints.down('xs')]: {
                display: 'none',
            },
            [theme.breakpoints.down('md')]: {
                flexDirection: 'column',
                minWidth: 90,
            },
        },
    })
)

const HeaderSettings: FC = () => {
    const classes = useStylesHeader()
    const isAuth = useTypedSelector(selectAuthStatus)
    const isLoading = useTypedSelector(selectAuthIsLoading)
    const { logout } = useActions()
    const [visibleModal, setVisibleModal] = useState(false)

    const handleClickOpenModal = (): void => {
        setVisibleModal(true)
    }

    const handleClickCloseModal = (): void => {
        setVisibleModal(false)
    }

    const onClickHandler = (): void => {
        logout()
    }

    return (
        <div className={classes.headerSettings}>
            <SwitcherUnits />
            {isAuth ? (
                <Button variant="outlined" onClick={onClickHandler}>
                    Logout
                </Button>
            ) : (
                <Button
                    variant="outlined"
                    onClick={handleClickOpenModal}
                    disabled={isLoading}
                >
                    Sign In
                </Button>
            )}
            <AuthModal visible={visibleModal} onClose={handleClickCloseModal} />
        </div>
    )
}

export default HeaderSettings
