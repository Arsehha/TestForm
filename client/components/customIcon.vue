<template>
  <svg-icon type="mdi" :path="path" :size="size"></svg-icon>
</template>
<script lang="ts">
//@ts-ignore
import SvgIcon from '@jamescoyle/vue-icon';
import {Vue, Component, Prop} from 'vue-property-decorator';

@Component({
  components: {
    SvgIcon
  },
})
export default class customIcon extends Vue {
  @Prop () path!: string
  @Prop ({default: 20}) size?: number

}
</script>

<style scoped>

</style>
