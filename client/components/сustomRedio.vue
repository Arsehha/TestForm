<template>
  <div>
    <input type="radio" :id="Id" :name="tag" v-model="model" :value="val" :checked="check" :disabled="dis">
    <label :for="Id" v-text="label"></label>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, VModel} from 'vue-property-decorator'

@Component({})
export default class CustomRadio extends Vue {
  @Prop ({required: true}) tag!: string
  @Prop({required: true}) Id!: string
  @Prop ({required: true}) label!: string
  @Prop ({default: false}) readonly check?: boolean
  @Prop () val?: string
  @Prop () dis?: boolean = false
  @VModel () model: any = undefined
}

</script>

<style scoped>

</style>
