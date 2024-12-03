'use client'
import Input from '@/app/components/Input/Input'
import SubmitButton from '@/app/components/SubmitButton/SubmitButton'
import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import { localSelector } from '@/app/store/selectors'
import { setModal } from '@/app/store/slices'
import type { TCourseForm } from '@/app/types/pages/course.types'
import Form from 'next/form'
import React, { useActionState } from 'react'
import styles from './createCourse.module.scss'

const CreateCourse: React.FC = () => {
  const { dict, dir } = useAppSelector(localSelector)
  const dispatch = useAppDispatch()
  const setErrorModal = (message: string): void => {
    dispatch(
      setModal({
        message,
        type: 'error',
        location: 'createCourse',
        isOpen: true,
        position: 'bottom',
      })
    )
  }

  const formActions = (state: TCourseForm, formData: FormData): TCourseForm => {
    const name = String(formData.get('name'))
    const image = String(formData.get('image'))
    const description = String(formData.get('description'))
    state.image = image
    if (!name) {
      setErrorModal([dict['Name'], dict['cannot be empty']].join(' '))
      return state
    } else {
      state.name = name
    }

    if (!description) {
      setErrorModal([dict['Description'], dict['cannot be empty']].join(' '))
      return state
    } else {
      state.description = description
    }
    return state
  }

  const [formState, formAction] = useActionState<TCourseForm, FormData>(
    formActions,
    {
      name: '',
      description: '',
      image: '',
    }
  )

  return (
    <div className={styles.createCourse}>
      <Form className={styles.form} action={formAction}>
        <div className={styles.formContainer}>
          <Input
            label={dict['Name']}
            name="name"
            defaultValue={formState.name}
          />
          <Input
            label={dict['Description']}
            name="description"
            defaultValue={formState.description}
          />
          <Input
            label={dict['Image']}
            name="image"
            defaultValue={formState.image}
          />
        </div>
        <div className={styles.buttonContainer}>
          <SubmitButton dir={dir}>{dict['Sign In'].toUpperCase()}</SubmitButton>
        </div>
      </Form>
    </div>
  )
}

export default CreateCourse
