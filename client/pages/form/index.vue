<template>
  <div>
    <div v-if="loading">Загрузка...</div>
    <div class="list" v-else>
      <div class="list--container" v-if="data.length > 0">
        <list-item v-for="(item, index) in data" :key="index" :item="item" @refreshItems="initItems"/>
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
  all: string = "/api/form/get-all"
  data = []
  loading: boolean = true

  async mounted() {
    await this.initItems()
  }

  async initItems() {
    this.data= []
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
