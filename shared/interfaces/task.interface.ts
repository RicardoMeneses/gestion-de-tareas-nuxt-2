export interface Task {
  id?: number
  title: string
  is_completed: number
  due_date?: string
  description?: string
  comments?: string
  tags?: string
}
