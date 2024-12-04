'use client'
import Input from '@/app/components/Input/Input'
import SubmitButton from '@/app/components/SubmitButton/SubmitButton'
import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import { localSelector } from '@/app/store/selectors'
import { closeModal, setModal } from '@/app/store/slices'
import { useAddCourseMutation } from '@/app/store/thunks'
import type { TCourseForm } from '@/app/types/pages/course.types'
import Form from 'next/form'
import { useRouter } from 'next/navigation'
import React, { useActionState, useState } from 'react'
import styles from './createCourse.module.scss'

const CreateCourse: React.FC = () => {
  const { dict, dir, lang } = useAppSelector(localSelector)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [fetchAddCourse] = useAddCourseMutation()
  const [errors, setErrors] = useState({
    name: '',
    description: '',
    image: '',
  })

  const formActions = async (
    state: TCourseForm,
    formData: FormData
  ): Promise<TCourseForm> => {
    const name = String(formData.get('name'))
    const image = String(formData.get('image'))
    const description = String(formData.get('description'))
    state.image = image
    if (!name) {
      setErrors((prev) => ({
        ...prev,
        name: [dict['Name'], dict['cannot be empty']].join(' '),
      }))
      return state
    } else {
      setErrors((prev) => ({
        ...prev,
        name: '',
      }))
      state.name = name
    }

    if (!description) {
      setErrors((prev) => ({
        ...prev,
        description: [dict['Description'], dict['cannot be empty']].join(' '),
      }))
      return state
    } else {
      setErrors((prev) => ({
        ...prev,
        description: '',
      }))
      state.description = description
    }
    try {
      const response = await fetchAddCourse({
        name: state.name,
        description: state.description,
        image: state.image,
      }).unwrap()

      const newCourseId = response?.id
      if (newCourseId) {
        dispatch(
          setModal({
            message: dict['New course created successfully'],
            type: 'success',
            location: '/admin/courses/create',
            isOpen: true,
            position: 'bottom',
          })
        )
        setTimeout(() => {
          dispatch(closeModal())
          router.push(`/courses/${newCourseId}`)
        }, 3000)
      }
    } catch (error) {
      dispatch(
        setModal({
          message: (error as Error)?.message,
          type: 'success',
          location: '/admin/courses/create',
          isOpen: true,
          position: 'bottom',
        })
      )
      console.error('Error adding course:', error)
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
          <div className={styles.inputsGroup}>
            <Input
              label={dict['Name']}
              name="name"
              defaultValue={formState.name}
              error={errors.name}
              withError
            />
            <Input
              label={dict['Description']}
              name="description"
              defaultValue={formState.description}
              error={errors.description}
              withError
            />
            <Input
              label={dict['Image']}
              name="image"
              defaultValue={formState.image}
              withError
            />
          </div>
          <div className={styles.buttonContainer}>
            <SubmitButton dir={dir}>{dict['Add Course']}</SubmitButton>
          </div>
        </div>
      </Form>
    </div>
  )
}

export default CreateCourse
