import type { getCoursesParams, ICourse } from '@/app/types/store/courses'
import addParamsToUrl from '@/app/utils/addParamsToUrl'
import { fetchServer } from '@/app/utils/fetchServer'

export async function getCourses(
  params: getCoursesParams
): Promise<ICourse[] | null> {
  return await fetchServer<ICourse[]>({
    endpoint: '/api/courses' + addParamsToUrl<getCoursesParams>(params ?? {}),
    next: {
      revalidate: 3600,
    },
    cache: 'force-cache',
    throwError: false,
  })
}
