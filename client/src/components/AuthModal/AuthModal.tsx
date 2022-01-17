import React, { ChangeEvent, FC, useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import DialogTitle from '@material-ui/core/DialogTitle'
import { createStyles, makeStyles } from '@material-ui/core'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import TabPanel from './AuthTabPanel'
import { AuthModalItemsValue, Ia11yProps } from './types'
import SignInTabPanel from './SignInTabPanel'
import SignUpTabPanel from './SignUpTabPanel'

const useStyles = makeStyles(() =>
    createStyles({
        modal: {
            borderRadius: 20,
        },
        title: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        closeIcon: {
            fontSize: 26,
        },
    })
)

interface IAuthModalProps {
    visible: boolean
    onClose: () => void
}

const AuthModal: FC<IAuthModalProps> = ({ visible, onClose }) => {
    const classes = useStyles()
    const [value, setValue] = useState(AuthModalItemsValue.SIGN_IN)

    const handleChange = (
        // eslint-disable-next-line @typescript-eslint/ban-types
        event: ChangeEvent<{}>,
        newValue: AuthModalItemsValue
    ): void => {
        setValue(newValue)
    }

    const a11yProps = (index: AuthModalItemsValue): Ia11yProps => {
        return {
            id: `wrapped-tab-${index}`,
            'aria-controls': `wrapped-tabpanel-${index}`,
        }
    }

    return (
        <Dialog
            open={visible}
            onClose={onClose}
            aria-labelledby="form-dialog-title"
            PaperProps={{
                className: classes.modal,
            }}
        >
            <DialogTitle id="form-dialog-title">
                <div className={classes.title}>
                    <div>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            aria-label="full width tabs example"
                        >
                            <Tab
                                value={AuthModalItemsValue.SIGN_IN}
                                label="Sign In"
                            />
                            <Tab
                                value={AuthModalItemsValue.SIGN_UP}
                                label="Sign Up"
                            />
                        </Tabs>
                    </div>
                    <IconButton
                        onClick={onClose}
                        color="secondary"
                        aria-label="close"
                    >
                        <CloseIcon
                            className={classes.closeIcon}
                            color="secondary"
                        />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent>
                <TabPanel
                    value={value}
                    index={AuthModalItemsValue.SIGN_IN}
                    {...a11yProps(AuthModalItemsValue.SIGN_IN)}
                >
                    <SignInTabPanel onClose={onClose} />
                </TabPanel>
                <TabPanel
                    value={value}
                    index={AuthModalItemsValue.SIGN_UP}
                    {...a11yProps(AuthModalItemsValue.SIGN_UP)}
                >
                    <SignUpTabPanel onClose={onClose} />
                </TabPanel>
            </DialogContent>
        </Dialog>
    )
}

export default AuthModal
