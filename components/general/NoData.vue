<template>
  <div class="text-center">
    <v-icon large>mdi-calendar</v-icon>
    <p class="text-h6">
      {{
        title === 'Completadas'
          ? 'No hay tareas completadas'
          : 'No hay tareas sin completar'
      }}
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class NoData extends Vue {
  @Prop({ required: true, default: 'Completadas' }) title!: string
}
</script>
