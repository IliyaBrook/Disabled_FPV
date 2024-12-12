// userData
// localization
import { localizationSlice } from './localization.slice'
// modal
import { modalSlice } from './modal.slice'
import { userDataSlice } from './userData.slice'

export { userDataSlice } from './userData.slice'
export { localizationSlice } from './localization.slice'
export const { setLocalization } = localizationSlice.actions

export { modalSlice } from './modal.slice'
export const { setModal, closeModal } = modalSlice.actions
