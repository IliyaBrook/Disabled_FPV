export type modalTypesOp =
  | 'error'
  | 'info'
  | 'warning'
  | 'success'
  | 'welcome'
  | 'goodbye'

export type modalPositionOp =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'center'
  | 'center-start'
  | 'center-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'

export interface modalState {
  message?: string
  location?: string
  type?: modalTypesOp
  isOpen?: boolean
  position?: modalPositionOp
}
