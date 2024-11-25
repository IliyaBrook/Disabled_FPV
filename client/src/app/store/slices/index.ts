// signUpInForm forms
import { signUpInFormSlice } from './signUpInForm.slice'
export { signUpInFormSlice } from './signUpInForm.slice'
export const { setSignUpInForm } = signUpInFormSlice.actions
// localization
import { localizationSlice } from './localization.slice'
export { localizationSlice } from './localization.slice'
export const { setLocalization } = localizationSlice.actions

// errors
import { errorsSlice } from './errors.slice'
export { errorsSlice } from './errors.slice'
export const { setErrors, resetErrors } = errorsSlice.actions
