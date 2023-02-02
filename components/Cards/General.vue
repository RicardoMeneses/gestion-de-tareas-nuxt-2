<template>
  <v-card
    elevation="5"
    color="blue-grey lighten-5"
    :max-height="$vuetify.breakpoint.smAndDown ? 360 : 640"
    class="overflow-auto"
  >
    <v-card-title class="text-h5"> {{ title }} </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col>
            <CardsTask
              v-for="task in tasks"
              :key="task.id"
              class="mb-2"
              :task="task"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Task } from '../../shared/interfaces/task.interface'

@Component
export default class GeneralCard extends Vue {
  @Prop({ required: true, default: 'Completadas' }) title!: string
  @Prop({ default: [], required: true }) tasks!: Task[]

  $vuetify: any
}
</script>
