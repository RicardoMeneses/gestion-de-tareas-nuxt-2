import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { Task } from '../shared/interfaces/task.interface'
import { $axios } from '~/shared/utils/api'

@Module({
  namespaced: true,
  stateFactory: true,
})
export default class Taskstore extends VuexModule {
  loading: boolean = false
  tasks: Task[] = []
  singleTask: Task = {
    title: '',
    is_completed: 0,
  }

  addTaskData: Task = {
    title: '',
    is_completed: 0,
  }

  @Mutation
  setTasks(tasks: Task[]) {
    this.tasks = tasks
  }

  @Mutation
  setSingleTask(task: Task) {
    this.singleTask = task
  }

  @Mutation
  updateAddTask(data: Task) {
    this.addTaskData = Object.assign({}, this.addTaskData, data)
  }

  @Mutation
  updateEditTask(data: Task) {
    this.singleTask = Object.assign({}, this.singleTask, data)
  }

  @Action({ rawError: true })
  public async getTasks() {
    try {
      const { data } = await $axios.get('')
      this.context.commit('setTasks', data)
    } catch (error) {
      console.log(error)
    }
  }

  @Action({ rawError: true })
  public async getSingleTask(id: string) {
    try {
      const { data } = await $axios.get(`/${id}`)
      this.context.commit('setSingleTask', data[0])
    } catch (error) {
      console.log(error)
    }
  }

  @Action({ rawError: true })
  public async addTask(task: Task) {
    const params = new URLSearchParams()

    params.append('title', task.title)
    params.append('description', task.description ? task.description : '')
    params.append('comments', task.comments ? task.comments : '')
    if (task.due_date) params.append('due_date', task.due_date)
    params.append('is_completed', `${task.is_completed}`)
    params.append('tags', task.tags ? task.tags : '')
    params.append('token', 'ricardo_mm')
    try {
      await $axios.post('', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      this.context.dispatch('getTasks')
      this.context.dispatch(
        'ui/showToast',
        {
          text: 'Tarea agregada correctamente',
          color: 'success',
        },
        { root: true }
      )
    } catch (error) {
      console.log(error)
      this.context.dispatch(
        'ui/showToast',
        {
          text: 'Salio algo mal',
          color: 'error',
        },
        { root: true }
      )
    }
  }

  @Action({ rawError: true })
  public async editTask(task: Task) {
    const params = new URLSearchParams()

    params.append('title', task.title)
    params.append('description', task.description ? task.description : '')
    params.append('comments', task.comments ? task.comments : '')
    if (task.due_date) params.append('due_date', task.due_date)
    params.append('is_completed', `${task.is_completed}`)
    params.append('tags', task.tags ? task.tags : '')
    params.append('token', 'ricardo_mm')
    try {
      await $axios.put(`${task.id}`, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      this.context.dispatch('getTasks')
      this.context.dispatch(
        'ui/showToast',
        {
          text: 'Tarea editada correctamente',
          color: 'success',
        },
        { root: true }
      )
    } catch (error) {
      console.log(error)
      this.context.dispatch(
        'ui/showToast',
        {
          text: 'Algo salio mal',
          color: 'error',
        },
        { root: true }
      )
    }
  }
}
