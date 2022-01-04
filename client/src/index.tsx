import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ThemeProvider, CssBaseline } from '@material-ui/core'
import App from './App'
import { theme } from './theme'
import { store } from './store/store'

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
            <App />
        </Provider>
    </ThemeProvider>,
    document.getElementById('root')
)
