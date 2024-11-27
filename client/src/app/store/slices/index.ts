// localization
import { localizationSlice } from './localization.slice'
export { localizationSlice } from './localization.slice'
export const { setLocalization } = localizationSlice.actions

// modal
import { modalSlice } from './modal.slice'
export { modalSlice } from './modal.slice'
export const { setModal, closeModal } = modalSlice.actions
