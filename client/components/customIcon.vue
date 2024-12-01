<template>
  <div>
    <svg :width="size"
         :viewBox="viewBox">
      <path :d="currentIcon"/>
    </svg>
  </div>

</template>
<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import * as Mdi from "@mdi/js";

@Component
export default class customIcon extends Vue {
  @Prop() path!: string
  @Prop({default: 20}) size?: number

  private mdi: any = Mdi
  readonly viewBox: string = "0 0 24 24"

  get currentIcon(): string {
    return this.mdi[this.path]
  }
}
</script>
