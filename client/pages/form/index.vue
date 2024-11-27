<template>
  <div class="container">
    <div v-if="loading">Загрузка...</div>
    <div class="list" v-else>
      <div class="list--container" v-if="data.length > 0">
        <list-item v-for="(item, index) in data" :key="index" :item="item"/>
      </div>
      <div class="list--container" v-else>Ничего нет</div>
    </div>
  </div>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import CustomIcon from "~/components/customIcon.vue";
import listItem from "~/components/listItem.vue";

@Component({
  components: {CustomIcon, listItem}
})
export default class Form extends Vue {
  all: string = "http://localhost:4000/form/get-all"
  data = []
  loading: boolean = true

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

</style>
