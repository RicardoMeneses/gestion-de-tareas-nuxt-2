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
  addTaskData: Task = {
    title: '',
    is_completed: 0,
  }

  @Mutation
  setTasks(tasks: Task[]) {
    this.tasks = tasks
  }

  @Mutation
  updateAddTask(data: Task) {
    this.addTaskData = Object.assign({}, this.addTaskData, data)
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
  public async addTask(task: Task) {
    const params = new URLSearchParams()

    params.append('title', task.title)
    params.append('description', task.description ? task.description : '')
    params.append('comments', task.comments ? task.comments : '')
    if (task.due_date) params.append('due_date', task.due_date)
    params.append('is_completed', `${task.is_completed}`)
    params.append('tags', task.tags ? task.tags : '')
    try {
      await $axios.post('', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      this.context.dispatch('getTasks')
      this.context.dispatch('ui/showToast', {
        text: 'Tarea agregada correctamente',
        color: 'success',
      })
    } catch (error) {
      console.log(error)
      this.context.dispatch('ui/showToast', {
        text: 'Salio algo mal',
        color: 'error',
      })
    }
  }
}
