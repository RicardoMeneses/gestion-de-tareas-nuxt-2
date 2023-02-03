import { Context } from '@nuxt/types'

export default function ({ $axios, env }: Context) {
  $axios.interceptors.request.use(
    (config) => {
      config.headers.common.Authorization = 'Bearer ' + env.token
      config.params = { token: 'ricardo_mm' }
      // Do something before request is sent
      return config
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error)
    }
  )
}
