import { useAppSelector } from '@/app/store/hooks'
import type { TLangOptions } from '@/app/types/local.types'
import { getDictionary } from '@/app/utils/dictionaries'
import React from 'react'
import styles from './homePage.module.scss'

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: TLangOptions }>
}): Promise<React.ReactElement> {
  const p = await params
  const dict = getDictionary(p.lang)

  // const { dict, dir, lang } = useAppSelector((state) => state.localization)
  return (
    <div className={styles.homePage}>
      <div>
        <h1>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid amet
          culpa dignissimos molestias obcaecati placeat veritatis? At
          consequatur deleniti in libero magni, molestiae odit quam quidem
          recusandae sed veritatis voluptatem.100
        </h1>
      </div>
      <div>
        <h1>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid amet
          culpa dignissimos molestias obcaecati placeat veritatis? At
          consequatur deleniti in libero magni, molestiae odit quam quidem
          recusandae sed veritatis voluptatem.100
        </h1>
      </div>
      <div>
        <h1>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid amet
          culpa dignissimos molestias obcaecati placeat veritatis? At
          consequatur deleniti in libero magni, molestiae odit quam quidem
          recusandae sed veritatis voluptatem.100
        </h1>
      </div>
      <div>
        <h1>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid amet
          culpa dignissimos molestias obcaecati placeat veritatis? At
          consequatur deleniti in libero magni, molestiae odit quam quidem
          recusandae sed veritatis voluptatem.100
        </h1>
      </div>
      <div>
        <h1>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid amet
          culpa dignissimos molestias obcaecati placeat veritatis? At
          consequatur deleniti in libero magni, molestiae odit quam quidem
          recusandae sed veritatis voluptatem.100
        </h1>
      </div>
      <div>
        <h1>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid amet
          culpa dignissimos molestias obcaecati placeat veritatis? At
          consequatur deleniti in libero magni, molestiae odit quam quidem
          recusandae sed veritatis voluptatem.100
        </h1>
      </div>
      <div>
        <h1>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid amet
          culpa dignissimos molestias obcaecati placeat veritatis? At
          consequatur deleniti in libero magni, molestiae odit quam quidem
          recusandae sed veritatis voluptatem.100
        </h1>
      </div>
      <div>
        <h1>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid amet
          culpa dignissimos molestias obcaecati placeat veritatis? At
          consequatur deleniti in libero magni, molestiae odit quam quidem
          recusandae sed veritatis voluptatem.100
        </h1>
      </div>
      <div>
        <h1>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid amet
          culpa dignissimos molestias obcaecati placeat veritatis? At
          consequatur deleniti in libero magni, molestiae odit quam quidem
          recusandae sed veritatis voluptatem.100
        </h1>
      </div>
      <div>
        <h1>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid amet
          culpa dignissimos molestias obcaecati placeat veritatis? At
          consequatur deleniti in libero magni, molestiae odit quam quidem
          recusandae sed veritatis voluptatem.100
        </h1>
      </div>
      <div>
        <h1>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid amet
          culpa dignissimos molestias obcaecati placeat veritatis? At
          consequatur deleniti in libero magni, molestiae odit quam quidem
          recusandae sed veritatis voluptatem.100
        </h1>
      </div>
      <div>
        <h1>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid amet
          culpa dignissimos molestias obcaecati placeat veritatis? At
          consequatur deleniti in libero magni, molestiae odit quam quidem
          recusandae sed veritatis voluptatem.100
        </h1>
      </div>
      <div>
        <h1>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid amet
          culpa dignissimos molestias obcaecati placeat veritatis? At
          consequatur deleniti in libero magni, molestiae odit quam quidem
          recusandae sed veritatis voluptatem.100
        </h1>
      </div>
      <div>
        <h1>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid amet
          culpa dignissimos molestias obcaecati placeat veritatis? At
          consequatur deleniti in libero magni, molestiae odit quam quidem
          recusandae sed veritatis voluptatem.100
        </h1>
      </div>
      <div>
        <h1>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid amet
          culpa dignissimos molestias obcaecati placeat veritatis? At
          consequatur deleniti in libero magni, molestiae odit quam quidem
          recusandae sed veritatis voluptatem.100
        </h1>
      </div>
      <div>
        <h1>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid amet
          culpa dignissimos molestias obcaecati placeat veritatis? At
          consequatur deleniti in libero magni, molestiae odit quam quidem
          recusandae sed veritatis voluptatem.100
        </h1>
      </div>
    </div>
  )
}
