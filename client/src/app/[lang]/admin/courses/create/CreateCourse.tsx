'use client'

import SubmitButton from '@/app/components/SubmitButton/SubmitButton'
import { useAppSelector } from '@/app/store/hooks'
import { localSelector } from '@/app/store/selectors'
import React, { type ReactElement, useState } from 'react'
import RichTextEditor from '../../../../components/RichTextEditor/RichTextEditor'
import styles from './createCourse.module.scss'

const CreateCourse = (): ReactElement => {
  const [content, setContent] = useState('')
  const { dict, lang } = useAppSelector(localSelector)

  const initialValue = `<h1 style="text-align: center;"><u>super course</u><br></h1><p><br></p><iframe width="400px" height="345px" src="https://www.youtube.com/embed/UkD_ejtCbWg" frameborder="0" allowfullscreen="" style="display: block; margin-left: auto; margin-right: auto;"></iframe><p style="text-align: right;"><br></p>`

  const handleSave = () => {
    console.log('Saving content:', content)
    // Добавьте логику сохранения, например, API-запро
  }

  return (
    <div className={styles.createCourse}>
      <RichTextEditor
        initialValue={initialValue}
        onChange={setContent}
        lang={lang}
        className={styles.richTextEditor}
      />
      <div className={styles.saveButtonContainer}>
        <SubmitButton className={styles.submitButton} onClick={handleSave}>
          {dict['Save']}
        </SubmitButton>
      </div>
    </div>
  )
}

export default CreateCourse
