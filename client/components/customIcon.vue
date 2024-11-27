<template>
  <div>
    <svg
      :width="size"
      :viewBox="viewBox"
    >
      <path :d="path"/>
    </svg>
  </div>

</template>
<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';

@Component
export default class customIcon extends Vue {
  @Prop() path!: string
  @Prop({default: 20}) size?: number

  readonly viewBox: string = "0 0 24 24"

}
</script>
