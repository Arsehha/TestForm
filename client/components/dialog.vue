<template>
  <div>
    <button class="btn" @click="model = !model">
      <custom-icon :path="path.delete"/>
    </button>
    <transition name="fade">
      <div class="dialog" v-if="model"><slot></slot></div>
    </transition>
  </div>
</template>
<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import CustomIcon from "~/components/customIcon.vue";
import {mdiDelete, mdiPencil} from "@mdi/js";

@Component({
  components: {CustomIcon}
})
export default class dialog extends Vue {
  @Prop({default: false}) model!: boolean
  path = {
    delete: mdiDelete,
    update: mdiPencil
  }
}
</script>
<style scoped>

</style>
