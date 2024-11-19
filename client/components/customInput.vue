<template>
  <div>
    <label :for="id" v-if="label" v-text="label"></label>
    <input :type="type" :id="id" v-model="model" :disabled="dis">
  </div>
</template>
<script lang="ts">
import {Vue, Component, Prop, VModel} from 'vue-property-decorator'

@Component({})
export default class CustomInput extends Vue {
  @Prop ({default: "text"}) readonly type?: string
  @Prop ({required: true}) id!: string
  @Prop () label?: string
  @Prop () dis?: boolean = false
  @VModel () model: any = undefined
}

</script>
<style scoped>
div {
  display: flex;
  flex-direction: column;
  max-width: 200px;
}
label {
  display: block;
  margin-bottom: 0.4rem;
}
div + div {
  margin-top: 0.4rem;
}
input {
  display: block;
  font-size: 12px;
  height: 25px;
  padding: 0px 10px;
}
input:focus {
  outline: 1px solid red;
}
</style>
