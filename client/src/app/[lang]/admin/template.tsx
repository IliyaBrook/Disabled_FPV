import React from 'react'

export default async function Template({
  children,
  // params,
}: {
  children: React.ReactNode
  // params: Promise<{ lang: TLangOptions }>
}) {
  // const p = await params
  // const lang = p.lang
  // console.log('Template in admin')

  return <div>{children}</div>
}
