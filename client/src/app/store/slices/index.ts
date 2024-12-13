import { coursesSlice } from './courses.slice'
import { localizationSlice } from './localization.slice'
import { modalSlice } from './modal.slice'

export { localizationSlice } from './localization.slice'
export const { setLocalization } = localizationSlice.actions
export { userDataSlice } from './userData.slice'
export { modalSlice } from './modal.slice'
export const { setModal, closeModal } = modalSlice.actions
export { coursesSlice } from './courses.slice'
export const { setCourses } = coursesSlice.actions
