// localization
import { localizationSlice } from './localization.slice'
export { localizationSlice } from './localization.slice'
export const { setLocalization } = localizationSlice.actions

// status
import { statusSlice } from './statusSlice'
export { statusSlice } from './statusSlice'
export const { setStatus, resetStatus } = statusSlice.actions
