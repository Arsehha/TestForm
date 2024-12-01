<template>
  <div>
    <input v-model="model"
           type="radio"
           :id="id"
           :name="tag"
           :value="val"
           :checked="check"
           :disabled="dis">
    <label :for="id" v-text="label"></label>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel} from 'vue-property-decorator'

@Component({})
export default class customRadio extends Vue {
  @VModel() model: any
  @Prop() val?: string
  @Prop({default: false}) dis?: boolean
  @Prop({required: true}) readonly id!: string
  @Prop({required: true}) readonly tag!: string
  @Prop({required: true}) readonly label!: string
  @Prop({default: false}) readonly check?: boolean
}

</script>
