/* eslint-disable import/no-mutable-exports */
// eslint-disable-next-line import/named
import { NuxtAxiosInstance } from '@nuxtjs/axios'

let $axios: NuxtAxiosInstance

export function initializeAxios(axiosInstance: NuxtAxiosInstance) {
  $axios = axiosInstance
}

export { $axios }
