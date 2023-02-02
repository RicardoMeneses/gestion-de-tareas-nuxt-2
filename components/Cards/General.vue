<template>
  <v-card
    elevation="5"
    color="blue-grey lighten-5"
    max-height="640"
    class="overflow-auto"
  >
    <v-card-title class="text-h5"> {{ title }} </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col>
            <CardsTask class="mb-2" />
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class GeneralCard extends Vue {
  @Prop({ required: true, default: 'Completadas' }) title!: string
}
</script>
