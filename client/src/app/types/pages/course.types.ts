export interface ICourse {
  id: string
  name: string
  description: string
  created_at?: string
  updated_at?: string
  image: string
}

export type TCourseForm = Pick<ICourse, 'name' | 'description' | 'image'>

export interface ICoursePage {
  id: string
  course_id: ICourse['id']
  page_number: number
  content: string
  videos?: ICourseVideo[]
  created_at?: string
}

export interface ICourseVideo {
  video_id: string
  title: string
  description: string
  published_at: string
  duration: string
  thumbnail_url: string
}
