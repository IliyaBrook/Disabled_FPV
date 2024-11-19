import { getDictionary } from '@/app/dictionaries'
import type { TLangOptions } from '@/app/types/internationalization'

export default async function Page(props: { params: Promise<{ lang: TLangOptions }>}) {
    const params = await props.params;

    const {
        lang
    } = params;

    const dict = await getDictionary(lang) // en
    return <button>{dict.products.cart}</button>
}