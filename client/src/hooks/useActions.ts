import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { allActionCreators } from '../store/reducers/actionCreators'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(allActionCreators, dispatch)
}
