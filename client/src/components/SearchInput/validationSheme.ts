import * as yup from 'yup'

export const searchValidationSchema = yup.object({
    query: yup
        .string()
        .min(5, 'Query should be of minimum 5 characters length')
        .required('Query should be of minimum 5 characters length'),
})
