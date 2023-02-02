<template>
  <v-dialog v-model="showDialog" max-width="500" persistent>
    <v-card>
      <v-toolbar :color="color" dark
        >{{ title }} <v-spacer></v-spacer>
        <v-btn icon @click="$emit('onClose')"
          ><v-icon>mdi-close</v-icon></v-btn
        ></v-toolbar
      >

      <v-card-text>
        <slot />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class GeneralCard extends Vue {
  @Prop({ default: false }) showDialog!: boolean
  @Prop({ default: 'red lighten-2' }) color!: string
  @Prop({ default: 'título' }) title!: string
}
</script>
