<template>
  <v-app dark>
    <v-app-bar fixed app dark elevation="1" color="blue lighten-2">
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
      <v-btn outlined @click="showAddTask = true"
        ><v-icon left> mdi-plus </v-icon>Nueva tarea</v-btn
      >
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer app>
      <span>Ricardo Meneses Morales &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
    <GeneralDialog
      :show-dialog="showAddTask"
      title="Agregar tarea"
      color="blue lighten-1"
      @onClose="showAddTask = !showAddTask"
    >
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field label="Título*" required></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field label="Fecha" type="date"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea
              auto-grow
              rows="1"
              counter
              label="Descripción"
            ></v-textarea>
          </v-col>
          <v-col cols="12">
            <v-textarea
              auto-grow
              rows="1"
              counter
              label="Comentarios"
            ></v-textarea>
          </v-col>
          <v-col cols="12">
            <v-text-field label="Tags"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-switch
              label="Completada"
              color="success"
              value="success"
              hide-details
            ></v-switch>
          </v-col>
          <v-col cols="12" class="text-right">
            <v-btn class="ma-1" color="grey" plain> Cancelar </v-btn>
            <v-btn class="ma-1" color="success" plain> Crear </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </GeneralDialog>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({ name: 'DefaultLayout' })
export default class DefaultLayout extends Vue {
  title: string = 'Gestor de Tareas'
  showAddTask: boolean = false
}
</script>
