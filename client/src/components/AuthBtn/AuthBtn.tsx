import React, { FC, useState } from 'react'
import Button from '@material-ui/core/Button'
import AuthModal from '../AuthModal/AuthModal'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useActions } from '../../hooks/useActions'
import {
    selectAuthIsLoading,
    selectAuthStatus,
} from '../../store/reducers/auth/selectors'

const AuthBtn: FC = () => {
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
        </>
    )
}

export default AuthBtn
