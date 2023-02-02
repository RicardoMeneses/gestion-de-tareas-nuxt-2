import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { IToast } from '~/shared/interfaces/toast.interface'

const defaultToastConfig: IToast = {
  show: false,
  time: 3000,
  top: true,
  right: true,
  text: 'Mensaje de prueba',
  color: 'primary',
}

@Module({
  namespaced: true,
  stateFactory: true,
})
export default class UiStore extends VuexModule {
  toast: IToast = {
    ...defaultToastConfig,
  }

  @Mutation
  public setToastVisibility(value: boolean) {
    this.toast.show = value
  }

  @Mutation
  public setToast(config: Partial<IToast>) {
    this.toast = { ...defaultToastConfig, ...config }
  }

  @Action
  public showToast(data: IToast) {
    const config = data || {}
    config.show = true
    this.context.commit('setToast', config)
  }
}
