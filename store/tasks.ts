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

  @Mutation
  setTasks(tasks: Task[]) {
    this.tasks = tasks
  }

  @Action({ rawError: true })
  public async getTasks() {
    try {
      const { data } = await $axios.get('')
      this.context.commit('setTasks', data)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
}
