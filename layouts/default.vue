<template>
  <v-app dark>
    <v-app-bar fixed app dark elevation="1" color="#B3E5FC">
      <template #img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>
      <v-toolbar-title class="font-weight-bold text-h5"
        >Gestor de Tareas</v-toolbar-title
      >
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
      @onClose="onCloseAdd"
    >
      <v-container>
        <v-form ref="addForm" lazy-validation>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="title"
                :rules="[rules.required]"
                label="Título*"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="due_date"
                label="Fecha*"
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
                :value="1"
                hide-details
              ></v-switch>
            </v-col>
            <v-col cols="12" class="text-right">
              <v-btn class="ma-1" color="grey" plain @click="onCloseAdd">
                Cancelar
              </v-btn>
              <v-btn
                class="ma-1"
                color="success"
                plain
                :loading="loadingAdd"
                :disabled="loadingAdd"
                @click="onAdd"
              >
                Crear
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </GeneralDialog>

    <v-snackbar
      v-model="toastVisible"
      :timeout="toast.time"
      top
      right
      :color="toast.color"
    >
      <span v-html="toast.text"> </span>
      <template #action="{ attrs }">
        <v-btn dark text v-bind="attrs" @click="toastVisible = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>

    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Ref, namespace } from 'nuxt-property-decorator'
import { Task } from '../shared/interfaces/task.interface'
import { IToast } from '../shared/interfaces/toast.interface'
import { VForm } from '~/shared/types/form'
import { rules } from '~/shared/utils/form'

const tasksStore = namespace('tasks')
const uiStore = namespace('ui')

@Component({ name: 'DefaultLayout' })
export default class DefaultLayout extends Vue {
  showAddTask: boolean = false
  loadingAdd: boolean = false
  rules = rules

  @tasksStore.State
  loading!: false

  @tasksStore.State
  addTaskData!: Task

  @tasksStore.Action
  addTask!: (task: Task) => void

  @tasksStore.Mutation
  clearAddTask!: () => void

  @tasksStore.Mutation
  setLoading!: (value: boolean) => void

  // UI STORE
  @uiStore.State
  toast!: IToast

  @uiStore.Mutation
  setToastVisibility!: (value: boolean) => void

  @uiStore.Action
  showToast!: (data: IToast) => void

  @Ref('addForm') addFormRef!: VForm

  get title() {
    return this.addTaskData.title
  }

  set title(value) {
    this.$store.commit('tasks/updateAddTask', {
      title: value,
    })
  }

  get description() {
    return this.addTaskData.description
  }

  set description(value) {
    this.$store.commit('tasks/updateAddTask', {
      description: value,
    })
  }

  get comments() {
    return this.addTaskData.comments
  }

  set comments(value) {
    this.$store.commit('tasks/updateAddTask', {
      comments: value,
    })
  }

  get tags() {
    return this.addTaskData.tags
  }

  set tags(value) {
    this.$store.commit('tasks/updateAddTask', {
      tags: value,
    })
  }

  get due_date() {
    return this.addTaskData.due_date
  }

  set due_date(value) {
    this.$store.commit('tasks/updateAddTask', {
      due_date: value,
    })
  }

  get is_completed() {
    return this.addTaskData.is_completed
  }

  set is_completed(value) {
    this.$store.commit('tasks/updateAddTask', {
      is_completed: value || 0,
    })
  }

  get toastVisible() {
    return this.toast.show || false
  }

  set toastVisible(value: boolean) {
    this.setToastVisibility(value)
  }

  get isLoading() {
    return this.loading || false
  }

  set isLoading(value: boolean) {
    this.setLoading(value)
  }

  async onAdd() {
    const valid = this.addFormRef.validate()
    if (!valid) {
      return
    }
    this.loadingAdd = true
    await this.addTask(this.addTaskData)
    this.loadingAdd = false
    this.showAddTask = false
    this.addFormRef.reset()
  }

  onCloseAdd() {
    this.showAddTask = false
    this.addFormRef.reset()
  }
}
</script>
