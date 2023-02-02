export const rules = {
  required: (v: any) => !!v || 'Este campo es requerido',
  maxLength: (maxnum: number, v: string) =>
    (v && v.length <= maxnum) || `Maximo ${maxnum} caracteres`,
  minLength: (minnum: number, v: string) =>
    (v && v.length >= minnum) || `Minimo ${minnum} caracteres`,
}
