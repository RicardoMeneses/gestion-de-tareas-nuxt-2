<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="text-h6 pa-2">
          ¿Estas seguro que deseas eliminar la tarea {{ title }}? Está acción no
          se puede deshacer
        </div>
        <v-card-actions class="justify-end">
          <v-btn class="ma-1" color="grey" plain @click="$emit('onClose')"
            >Cerrar</v-btn
          >
          <v-btn class="ma-1" color="error" plain @click="$emit('onDeleteTask')"
            >Eliminar</v-btn
          >
        </v-card-actions>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class DeleteTask extends Vue {
  @Prop({ required: true }) title!: string
}
</script>
