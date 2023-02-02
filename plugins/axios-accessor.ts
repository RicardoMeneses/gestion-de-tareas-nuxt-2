import { Context, Plugin } from '@nuxt/types'
import { initializeAxios } from '~/shared/utils/api'

const accessor: Plugin = ({ $axios }: Context) => {
  initializeAxios($axios)
}

export default accessor
