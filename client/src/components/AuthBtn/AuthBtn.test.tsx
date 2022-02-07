import React, { ReactNode } from 'react'
import { render, RenderResult, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import {
    AnyAction,
    Action,
    createStore,
    Store,
    combineReducers,
    applyMiddleware,
} from 'redux'
import { Provider } from 'react-redux'

import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import AuthBtn from './AuthBtn'
import reducers from '../../store/reducers'

const rootReducer = combineReducers(reducers)

interface RenderWithRedux<S = any, A extends Action = AnyAction> {
    (
        ui: ReactNode,
        reduxOptions?: {
            store?: Store<S, A>
        }
    ): RenderResult & {
        store: Store<S, A>
    }
}

const renderWithRedux: RenderWithRedux = (
    ui,
    {
        store = createStore(
            rootReducer,
            composeWithDevTools(applyMiddleware(thunk))
        ),
    } = {}
) => {
    return {
        ...render(<Provider store={store}>{ui}</Provider>),
        store,
    }
}

describe('AuthBtn', () => {
    it('renders AuthBtn', async () => {
        renderWithRedux(<AuthBtn />)
        expect(screen.getByText(/Sign In/i)).toBeInTheDocument()
        expect(screen.queryByText(/Logout\.\.\./i)).not.toBeInTheDocument()
    })
})
