import React, { ReactNode } from 'react'
import { render, RenderResult, act, waitFor } from '@testing-library/react'
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
import userEvent from '@testing-library/user-event'
import SearchInput from './SearchInput'
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

describe('SearchInput', () => {
    it('renders SearchInput', async () => {
        const { getByRole, getByText } = renderWithRedux(<SearchInput />)

        act(() => {
            userEvent.type(getByRole('textbox'), 'A{enter}')
            userEvent.click(getByRole('button'))
        })

        await waitFor(() => {
            expect(getByText(/Query should be/i)).toBeInTheDocument()
        })
    })
})
