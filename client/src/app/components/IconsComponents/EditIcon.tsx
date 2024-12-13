import type { IComponentIconProps } from '@/app/types/componentIconProps'
import * as React from 'react'

function EditIcon(props: IComponentIconProps) {
  return (
    <svg
      width={props.width ?? 24}
      height={props.height ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11 2H9C4 2 2 4 2 9v6c0 5 2 7 7 7h6c5 0 7-2 7-7v-2"
        stroke="currentColor"
        strokeWidth={props.strokeWidth ?? 1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.04 3.02L8.16 10.9c-.3.3-.6.89-.66 1.32l-.43 3.01c-.16 1.09.61 1.85 1.7 1.7l3.01-.43c.42-.06 1.01-.36 1.32-.66l7.88-7.88c1.36-1.36 2-2.94 0-4.94-2-2-3.58-1.36-4.94 0z"
        stroke="currentColor"
        strokeWidth={props.strokeWidth ?? 1.5}
        strokeMiterlimit={props.strokeWidth ?? 10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14.91 4.15a7.144 7.144 0 004.94 4.94" fill="currentColor" />
    </svg>
  )
}

export default EditIcon
