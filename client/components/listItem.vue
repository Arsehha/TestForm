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
        <!--        <dialog :model="deleteDialog">Del</dialog>-->
        <div>
          <button class="btn" @click="deleteDialog = !deleteDialog">
            <custom-icon path="mdiDelete"/>
          </button>
          <transition name="fade">
            <div class="dialog" v-if="deleteDialog">
              <div class="dialog--container">
                <article class="dialog--card">
                  <div class="dialog--card--container">
                    <h4>Подтвердите действие</h4>
                    <p>Вы действительно хотите удалить?</p>
                    <div class="dialog--card--actions">
                      <button class="btn" @click="deleteDialog = !deleteDialog" :disabled="deleteLoading">Отмена</button>
                      <button class="btn" @click="startDelete(item[`id`])"  :disabled="deleteLoading">Удалить</button>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </transition>
        </div>
        <button class="btn" @click="$router.push(`/form/edit?id=${item['id']}`)">
          <custom-icon path="mdiPencil"/>
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import CustomIcon from "~/components/customIcon.vue";
import dialog from "~/components/dialog.vue";

@Component({
  components: {CustomIcon, dialog},
})
export default class listItem extends Vue {
  @Prop() item: any;
  deleteDialog: boolean = false
  deleteLoading: boolean = false

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

  async startDelete(id: number) {
    this.deleteLoading = true
    await this.$axios.post(`/api/form/delete`, {id})
      .then((response) =>{
        console.log(response.data)
        this.deleteDialog = false
        this.$emit("refreshItems")
      })
      .catch()
      .finally(() => {
        this.deleteLoading = false
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

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
{
  opacity: 0;
}
</style>
