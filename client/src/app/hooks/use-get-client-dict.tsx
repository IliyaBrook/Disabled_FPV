import { getDictionary } from '@/app/dictionaries';
import type { TDict, TLangOptions } from '@/app/types/local.types';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const useGetClientDict = (): { dict: TDict | null; loading: boolean } => {
  const pathname = usePathname();
  const [dict, setDict] = useState<TDict | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const lang = pathname.split('/')[1] as TLangOptions;
    getDictionary(lang)
      .then((dict) => {
        setDict(dict);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return {
    dict,
    loading,
  };
};

export default useGetClientDict;
