<template>
  <div>
    <form @submit.prevent>
      <fieldset :disabled="disableForm">
        <custom-input id="name" label="Name" v-model="model.name" :dis="disableForm"/>
        <custom-input id="secondName" label="Second name" v-model="model.secondName" :dis="disableForm"/>
        <custom-input id="phone" type="text" label="Phone number" v-model="model.phone" v-mask="`+7 (###) ### ##-##`"
                      :dis="disableForm"/>
        <div class="radio">
          <div class="d-block">Gender</div>
          <custom-radio v-model="model.gender"
                        id="Man" label="Man"
                        val="Man" tag="radio"
                        :check="true"
                        :dis="disableForm"/>

          <custom-radio v-model="model.gender"
                        id="Woman" label="Woman"
                        val="Woman" tag="radio"
                        :dis="disableForm"/>
          <custom-radio v-model="model.gender"
                        id="three" label="They"
                        val="They" tag="radio"
                        :dis="disableForm"/>
          <custom-radio v-model="model.gender"
                        id="four" label="It"
                        val="It" tag="radio"
                        :dis="disableForm"/>
        </div>
        <div class="radio">
          <div>Show checkbox</div>
          <custom-radio v-model="model.show"
                        id="one1" label="Show"
                        tag="show" val="one"
                        :check="true"
                        :dis="disableForm"/>
          <custom-radio v-model="model.show"
                        id="two1" label="Hide"
                        tag="show" val="two"
                        :dis="disableForm"/>
        </div>
        <div v-if="model.show == `one`">
          <input v-model="model.gay"
                 class="custom-checkbox" id="checkbox"
                 type="checkbox" name="checkbox"
                 :disabled="disableForm">
          <label for="checkbox">Gay?</label>
        </div>
        <div>
          <button class="btn" type="submit" @click="sendModel" :disabled="disableForm">Submit</button>
        </div>
      </fieldset>
    </form>
    <button @click="$router.push('/form')" class="btn">Перейти на Form</button>
    <pre>
      {{ model }}
    </pre>
    <div class="modal" v-show="modal" v-text="modalValue" :style="`border: 1px solid `+ modalColor">

    </div>
  </div>
</template>
<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator'
import CustomInput from "~/components/customInput.vue";
import CustomRadio from "~/components/сustomRadio.vue";

@Component({
  components: {CustomInput, CustomRadio},
})
export default class Pages extends Vue {
  model: any = {
    name: "",
    secondName: "",
    phone: "+7",
    gender: "Man",
    show: "one",
    gay: false,
  }

  disableForm: boolean = false;

  modal: boolean = false
  modalValue: string = ""
  modalColor: string = "black"
  modalTimer: number = 0

  async mounted() {
    await this.$axios.get(`/api/form/get/` + this.getId())
      .then((response) => {
        if (!response.data.fromDb) {
          this.$router.push("/")
        }
        this.model = response.data.fromDb ?? {
          name: "",
          secondName: "",
          phone: "+7",
          gender: "Man",
          show: "one",
          gay: false,
        }
      })
  }

  async sendModel() {
    if (this.validValues()) {
      console.log("Otpravleno")
      this.disableForm = true

      await this.$axios.patch("/api/form/edit", {
        id: this.getId(),
        model: this.model
      }, {})
        //await this.$axios.post("/api", this.model, {})
        .then((response) => {
          this.modal = true
          console.log(response.data)
          this.$router.push("/form")
        })
        .catch((err) => {
          console.log(err)
          this.modal = true
        })
        .finally(() => {
          this.disableForm = false
          let interval = setInterval(() => {
            this.modalTimer += 1
            if (this.modalTimer >= 5) {
              this.modal = false
              clearInterval(interval)
              this.modalTimer = 0
              this.modalValue = ""
              this.modalColor = ""
            }
          }, 1000)
        })
    } else
      console.log("ne Otpravleno")
  }

  getId() {
    const query = this.$router.currentRoute.query
    const id = +query.id
    if (!(Number.isInteger(id))) {
      return null
    }
    return id
  }

  validValues() {
    return (!!this.model.name.length) && (!!this.model.secondName.length) && (this.model.phone.length == 18)
  }

  @Watch("model.phone")
  changeModelPhone() {
    console.log(this.model.phone)
    if (this.model.phone.length <= 2) {
      return this.model.phone = "+7"
    }
  }
}
</script>
<style scoped>
div + div {
  margin-top: 0.4rem;
}
</style>
