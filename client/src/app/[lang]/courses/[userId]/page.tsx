import type { TLangOptions } from '@/app/types'
import React from 'react'

export default async function CoursesPageByUserId({
  params,
}: {
  params: Promise<{ userId: string; lang: TLangOptions }>
}): Promise<React.ReactElement> {
  const p = await params
  return (
    <div>
      <h1>Courses page by User id</h1>
      <p style={{ color: 'red' }}>User id: {p.userId}</p>
    </div>
  )
}
