<template>
  <div class="container">
    <div v-if="loading">Загрузка...</div>
    <div class="list" v-else>
      <div class="list--container" v-if="data.length > 0">
        <div class="list_item" @click="route(item[`id`])" v-for="(item, i) in data" :key="i">
          <div class="list_item--container">
            <div class="list_item--value">{{ item["id"] }}</div>
            <div class="list_item--value">{{ item["name"] }}</div>
            <div class="list_item--value">{{ item["secondName"] }}</div>
            <div class="list_item--value">{{ item["phone"] }}</div>
            <div class="list_item--value">{{ item["gender"] }}</div>
            <div class="list_item--value">{{ item["gay"] ? "Да" : "Нет" }}</div>
            <div class="list_item--value">{{ getDate(item["created"]) }}</div>
            <div class="list_item--value" @click.stop>
              <button class="btn" @click="deleteDialog = !deleteDialog">
                <custom-icon :path="path.delete"/>
              </button>
              <button class="btn" @click="$router.push(`/form/edit/${item['id']}`)">
                <custom-icon :path="path.update"/>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="list--container" v-else>Ничего нет</div>
    </div>
  </div>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import CustomIcon from "~/components/customIcon.vue";
import {mdiDelete, mdiPencil} from "@mdi/js";

@Component({
  components: {CustomIcon}
})
export default class Form extends Vue {
  all: string = "http://localhost:4000/form/get-all"
  data = []
  path = {
    delete: mdiDelete,
    update: mdiPencil
  }
  loading: boolean = true
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

  async mounted() {
    await this.$axios.get(this.all, {})
      .then((response) => {
        this.data = response.data.data;
      })
      .finally(() => {
        this.loading = false;
      })
  }
}

</script>
<style scoped>

.container {
  display: flex;
  margin: auto;
  justify-content: center;
  align-items: center;
  width: 1200px;
}

.list {

}

.list--container {

}

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

</style>
