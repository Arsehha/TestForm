<template>
  <div class="list_item" @click="route(item[`id`])">
    <div class="list_item--container">
      <div class="list_item--value">{{ item["id"] }}</div>
      <div class="list_item--value">{{ item["name"] }}</div>
      <div class="list_item--value">{{ item["secondName"] }}</div>
      <div class="list_item--value">{{ item["phone"] }}</div>
      <div class="list_item--value">{{ item["gender"] }}</div>
      <div class="list_item--value">{{ item["gay"] ? "Да" : "Нет" }}</div>
      <div class="list_item--value">{{ getDate(item["created"]) }}</div>
      <div class="list_item--value" @click.stop style="display: flex;">
        <dialog :model="deleteDialog">Del</dialog>
        <button class="btn" @click="$router.push(`/form/edit/${item['id']}`)">
          <custom-icon :path="path.update"/>
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import CustomIcon from "~/components/customIcon.vue";
import dialog from "~/components/dialog.vue";
import {mdiDelete, mdiPencil} from "@mdi/js";

@Component({
  components: {CustomIcon, dialog},
})
export default class listItem extends Vue {
  @Prop() item: any;
  path = {
    delete: mdiDelete,
    update: mdiPencil
  }
  deleteDialog: boolean = false

  route(id: number) {
    return this.$router.push(`/form/` + id)
  }

  getDate(date: Date) {
    const DATE = new Date(date)
    return DATE.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }
}
</script>
<style scoped>
.list_item {
  display: flex;
  align-items: center;
}

.list_item--container {
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
}

.list_item--value + .list_item--value {
  margin-left: 15px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
