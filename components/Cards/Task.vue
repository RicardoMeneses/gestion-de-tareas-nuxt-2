<template>
  <div>
    <v-card
      :elevation="hover ? 6 : 2"
      hover
      shaped
      min-height="80"
      class="task-card__container"
      :class="{ incompleted: !task.is_completed }"
      @mouseover="hover = true"
      @mouseleave="hover = false"
    >
      <v-card-title class="justify-space-between">
        <div>
          <p class="text-h6 mb-0">{{ task.title }}</p>
          <p class="text-caption mb-0">{{ task.due_date }}</p>
        </div>
        <div>
          <v-menu top :offset-y="true">
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
                <v-list-item-icon class="mr-1">
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-card-title>
      <v-card-actions class="py-0">
        <v-spacer></v-spacer>
        <v-btn icon @click="seeTask">
          <v-icon>mdi-eye</v-icon>
        </v-btn>
        <v-btn icon @click="actionTask">
          <v-icon>{{ task.is_completed ? 'mdi-close' : 'mdi-check' }}</v-icon>
        </v-btn>
      </v-card-actions>
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
              <v-btn class="ma-1" color="error" plain @click="onDeleteTask"
                >Eliminar</v-btn
              >
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
        <v-form ref="editForm" lazy-validation>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="title"
                label="Título*"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="due_date"
                label="Fecha"
                type="date"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="description"
                auto-grow
                rows="1"
                counter
                label="Descripción"
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="comments"
                auto-grow
                rows="1"
                counter
                label="Comentarios"
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="tags" label="Tags"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-switch
                v-model="is_completed"
                label="Completada"
                color="success"
                hide-details
                :value="1"
              ></v-switch>
            </v-col>
            <v-col cols="12" class="text-right">
              <v-btn
                class="ma-1"
                color="grey"
                :disabled="loading"
                plain
                @click="showEditTask = false"
              >
                Cancelar
              </v-btn>
              <v-btn
                class="ma-1"
                color="success"
                plain
                :loading="loading"
                :disabled="loading"
                @click="onEdit"
              >
                Guardar
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </GeneralDialog>

    <CardsViewTask
      :show-dialog="viewTask"
      :task="singleTask"
      @closeSeeTask="viewTask = false"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, namespace, Ref } from 'nuxt-property-decorator'
import { Task } from '../../shared/interfaces/task.interface'
import { Menu } from '../../shared/interfaces/menu.interface'
import { VForm } from '~/shared/types/form'
import { rules } from '~/shared/utils/form'

const tasksStore = namespace('tasks')

@Component
export default class TaskCard extends Vue {
  @Prop({ required: true }) task!: Task

  @Ref('editForm') editFormRef!: VForm

  loading: boolean = false
  hover: boolean = false
  showDeleteTask: boolean = false
  showEditTask: boolean = false
  viewTask: boolean = false
  rules = rules

  @tasksStore.Action
  getSingleTask!: (id: string) => void

  @tasksStore.Action
  editTask!: (task: Task) => void

  @tasksStore.Action
  deleteTask!: (id: string) => void

  @tasksStore.Action
  taskAction!: ({ is_completed, id }: Partial<Task>) => void

  @tasksStore.State
  singleTask!: Task

  get title() {
    return this.singleTask.title
  }

  set title(value) {
    this.$store.commit('tasks/updateEditTask', {
      title: value,
    })
  }

  get description() {
    return this.singleTask.description
  }

  set description(value) {
    this.$store.commit('tasks/updateEditTask', {
      description: value,
    })
  }

  get comments() {
    return this.singleTask.comments
  }

  set comments(value) {
    this.$store.commit('tasks/updateEditTask', {
      comments: value,
    })
  }

  get tags() {
    return this.singleTask.tags
  }

  set tags(value) {
    this.$store.commit('tasks/updateEditTask', {
      tags: value,
    })
  }

  get due_date() {
    return this.singleTask.due_date
  }

  set due_date(value) {
    this.$store.commit('tasks/updateEditTask', {
      due_date: value,
    })
  }

  get is_completed() {
    return this.singleTask.is_completed
  }

  set is_completed(value) {
    this.$store.commit('tasks/updateEditTask', {
      is_completed: value || 0,
    })
  }

  items: Menu[] = [
    { title: 'Editar', action: 'edit', icon: 'mdi-pencil' },
    { title: 'Eliminar', action: 'delete', icon: 'mdi-delete' },
  ]

  async openDialog(action: string) {
    if (action === 'delete') {
      this.showDeleteTask = true
    } else {
      await this.getSingleTask(this.task.id ? `${this.task.id}` : '0')
      this.showEditTask = true
    }
  }

  async onEdit() {
    const valid = this.editFormRef.validate()
    if (!valid) {
      return
    }
    this.loading = true
    await this.editTask(this.singleTask)
    this.loading = false
    this.showEditTask = false
  }

  async onDeleteTask() {
    this.loading = true
    await this.deleteTask(this.task.id ? `${this.task.id}` : '0')
    this.loading = false
    this.showDeleteTask = false
  }

  async seeTask() {
    await this.getSingleTask(this.task.id ? `${this.task.id}` : '0')
    this.viewTask = true
  }

  async actionTask() {
    await this.getSingleTask(this.task.id ? `${this.task.id}` : '0')
    if (!this.task.is_completed) {
      await this.taskAction({
        is_completed: 1,
        id: this.singleTask.id,
        title: this.singleTask.title,
        comments: this.singleTask.comments,
        description: this.singleTask.description,
        tags: this.singleTask.tags,
        due_date: this.singleTask.due_date,
      })
    } else {
      await this.taskAction({
        is_completed: 0,
        id: this.singleTask.id,
        title: this.singleTask.title,
        comments: this.singleTask.comments,
        description: this.singleTask.description,
        tags: this.singleTask.tags,
        due_date: this.singleTask.due_date,
      })
    }
  }
}
</script>

<style lang="scss">
.task-card__container {
  background: radial-gradient(#60efbc, #58d5c9);
  &.incompleted {
    background: radial-gradient(#f588d8, #c0a3e5);
  }
}
</style>
