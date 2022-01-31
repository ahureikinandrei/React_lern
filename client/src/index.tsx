import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { CssBaseline } from '@material-ui/core'
import App from './App'
import { store } from './store/store'
import { CustomThemeProvider } from './hoc/CustomThemeContext'

ReactDOM.render(
    <Provider store={store}>
        <CustomThemeProvider>
            <CssBaseline />
            <App />
        </CustomThemeProvider>
    </Provider>,
    document.getElementById('root')
)
