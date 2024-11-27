// localization
import { localizationSlice } from './localization.slice'
export { localizationSlice } from './localization.slice'
export const { setLocalization } = localizationSlice.actions

// modal
import { modalSlice } from './modalSlice'
export { modalSlice } from './modalSlice'
export const { setModal, closeModal } = modalSlice.actions
