<template>
  <div>
    <v-card elevation="2" min-height="150">
      <v-card-title class="justify-space-between">
        <div>
          <p class="text-h6 mb-0">{{ task.title }}</p>
          <p class="text-caption">{{ task.due_date }}</p>
        </div>
        <div>
          <v-menu bottom left>
            <template #activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list dense>
              <v-list-item
                v-for="(item, i) in items"
                :key="i"
                link
                @click="openDialog(item.action)"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-card-title>
      <v-card-text>
        <p v-if="task.description">{{ task.description }}</p>
        <p class="font-weight-bold">
          Comentarios:
          <span class="font-weight-regular">{{
            task.comments ? task.comments : 'Sin comentarios'
          }}</span>
        </p>
        <v-chip v-if="task.tags" color="blue" outlined>{{ task.tags }}</v-chip>
      </v-card-text>
    </v-card>

    <GeneralDialog
      :show-dialog="showDeleteTask"
      title="Eliminar tarea"
      @onClose="showDeleteTask = !showDeleteTask"
    >
      <v-container>
        <v-row>
          <v-col>
            <div class="text-h6 pa-2">
              ¿Estas seguro que deseas eliminar la tarea? Está acción no se
              puede deshacer
            </div>
            <v-card-actions class="justify-end">
              <v-btn
                class="ma-1"
                color="grey"
                plain
                @click="showDeleteTask = false"
                >Cerrar</v-btn
              >
              <v-btn class="ma-1" color="error" plain>Eliminar</v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-container>
    </GeneralDialog>

    <GeneralDialog
      :show-dialog="showEditTask"
      title="Editar tarea"
      color="blue lighten-1"
      @onClose="showEditTask = !showEditTask"
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
            <v-btn class="ma-1" color="success" plain> Guardar </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </GeneralDialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Task } from '../../shared/interfaces/task.interface'
import { Menu } from '../../shared/interfaces/menu.interface'

@Component
export default class TaskCard extends Vue {
  @Prop({ required: true }) task!: Task

  items: Menu[] = [
    { title: 'Editar', action: 'edit' },
    { title: 'Eliminar', action: 'delete' },
  ]

  showDeleteTask: boolean = false
  showEditTask: boolean = false

  openDialog(action: string) {
    if (action === 'delete') {
      this.showDeleteTask = true
    } else {
      this.showEditTask = true
    }
  }
}
</script>
