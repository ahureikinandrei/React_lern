export enum AuthModalItemsValue {
    SIGN_IN = 'sign_in',
    SIGN_UP = 'sign_up',
}

export interface Ia11yProps {
    id: string
    'aria-controls': string
}

export interface ILoginFormProps {
    email: string
    password: string
}
