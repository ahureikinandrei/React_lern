import React, { FC, useState } from 'react'
import Button from '@material-ui/core/Button'
import AuthModal from '../AuthModal/AuthModal'
import { useStyles } from './styles'
import {
    selectAuthIsLoading,
    selectAuthStatus,
} from '../../store/reducers/auth/selectors'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useActions } from '../../hooks/useActions'

const AuthBtn: FC = () => {
    const { button } = useStyles()
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
        <>
            {isAuth ? (
                <Button
                    variant="outlined"
                    className={button}
                    onClick={onClickHandler}
                >
                    Logout
                </Button>
            ) : (
                <Button
                    variant="outlined"
                    className={button}
                    onClick={handleClickOpenModal}
                    disabled={isLoading}
                >
                    Sign In
                </Button>
            )}
            <AuthModal visible={visibleModal} onClose={handleClickCloseModal} />
        </>
    )
}

export default AuthBtn
