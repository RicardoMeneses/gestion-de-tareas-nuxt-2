<template>
  <v-row justify="center" class="mt-3">
    <v-col cols="12" md="6">
      <CardsGeneral title="No completadas" :tasks="inCompleteTasks" />
    </v-col>
    <v-col cols="12" md="6">
      <CardsGeneral title="Completadas" :tasks="completeTasks" />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, Vue, namespace } from 'nuxt-property-decorator'
import { Task } from '../shared/interfaces/task.interface'

const tasksStore = namespace('tasks')

@Component({ name: 'IndexPage' })
export default class IndexPage extends Vue {
  @tasksStore.State
  tasks!: Task[]

  get completeTasks() {
    return this.tasks.filter((task) => task.is_completed)
  }

  get inCompleteTasks() {
    return this.tasks.filter((task) => !task.is_completed)
  }

  async asyncData({ store }: Context) {
    await store.dispatch('tasks/getTasks')
  }
}
</script>
