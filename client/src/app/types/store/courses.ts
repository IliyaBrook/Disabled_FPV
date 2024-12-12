export interface getCoursesParams {
  name?: string
  page?: number
  limit?: number
  populate?: string
}

export interface ICourse {
  id: string
  name: string
  description: string
  created_at?: string
  updated_at?: string
  image: string
  pages: ICoursePage[]
}

export type TCourseForm = Pick<ICourse, 'name' | 'description' | 'image'>
export type TPageLogic = 'rich_text' | 'video_items'

export interface ICoursePage {
  id: string
  course_id: ICourse['id']
  page_number: number
  content: string
  videos: ICourseVideo[]
  created_at?: string
  logic: TPageLogic
}

export interface ICourseVideo {
  video_id: string
  description: string
  published_at: string
  duration: string
  thumbnail_url: string
}
