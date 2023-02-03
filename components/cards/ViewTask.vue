<template>
  <v-dialog v-model="showDialog" max-width="500" persistent>
    <v-card
      dark
      class="view-task__card-container"
      :class="{ incompleted: !task.is_completed }"
    >
      <v-card-title class="justify-space-between">
        <v-icon large left> mdi-calendar-check </v-icon>
        <div>
          <p class="text-h5 font-weight-bold mb-0">{{ task.title }}</p>
          <p class="text-caption mb-0">{{ task.due_date }}</p>
        </div>
        <v-spacer></v-spacer>
        <v-icon large left @click="$emit('closeSeeTask')"> mdi-close </v-icon>
      </v-card-title>

      <v-card-text class="font-weight-bold">
        <p class="text-h6">
          {{ task.description }}
        </p>
        <p class="font-weight-bold text-subtitle-2">
          Comentarios:
          <span class="font-weight-regular">{{
            task.comments ? task.comments : 'Sin comentarios'
          }}</span>
        </p>
        <v-chip v-if="task.tags" color="#fff" outlined>{{ task.tags }}</v-chip>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Task } from '~/shared/interfaces/task.interface'

@Component
export default class GeneralCard extends Vue {
  @Prop({ default: false }) showDialog!: boolean
  @Prop({ default: 'red lighten-2' }) color!: string
  @Prop({ required: true }) task!: Task
}
</script>

<style lang="scss">
.view-task__card-container {
  background: radial-gradient(#60efbc, #58d5c9);
  &.incompleted {
    background: radial-gradient(#f588d8, #c0a3e5);
  }
}
</style>
