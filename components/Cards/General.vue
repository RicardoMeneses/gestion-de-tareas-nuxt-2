<template>
  <v-card elevation="5">
    <v-card-title> {{ title }} </v-card-title>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class GeneralCard extends Vue {
  @Prop({ required: true, default: 'Completadas' }) title!: string
}
</script>
