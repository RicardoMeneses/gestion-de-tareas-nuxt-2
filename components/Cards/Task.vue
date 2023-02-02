<template>
  <v-card elevation="2" min-height="170">
    <v-card-title class="justify-space-between">
      <div>
        <p class="text-h6 mb-0">{{ title }}</p>
        <p class="text-caption">{{ due_date }}</p>
      </div>
      <div>
        <v-menu bottom left>
          <template #activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list dense>
            <v-list-item v-for="(item, i) in items" :key="i" link>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-card-title>
    <v-card-text>
      <p>{{ description }}</p>
      <p class="font-weight-bold">
        Comentarios:
        <span class="font-weight-regular">{{
          comments ? comments : 'Sin comentarios'
        }}</span>
      </p>
      <v-chip color="blue" outlined>{{ tags }}</v-chip>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

export interface Menu {
  title: string
}

@Component
export default class TaskCard extends Vue {
  @Prop({ required: true, default: 'Título' }) title!: string
  @Prop({ default: 'dd-mm-aaaa' }) due_date!: string
  @Prop({ default: '' }) description!: string
  @Prop({ default: '' }) comments!: string
  @Prop({ default: 'Tags' }) tags!: string

  items: Menu[] = [{ title: 'Editar' }, { title: 'Eliminar' }]
}
</script>
