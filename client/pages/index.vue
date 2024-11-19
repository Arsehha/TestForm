<template>
  <div>
    <form @submit.prevent>
      <custom-input id="name" label="Name" v-model="model.name" :dis="disableForm"></custom-input>
      <custom-input id="secondName" label="Second name" v-model="model.secondName" :dis="disableForm"></custom-input>
      <custom-input id="phone" type="text" label="Phone number" v-model="model.phone" v-mask="`+7 (###) ### ##-##`" :dis="disableForm"></custom-input>
      <div class="radio">
        Gender
      <custom-radio id="one" tag="radio" label="Man" v-model="model.gender" val="Man" check="true" :dis="disableForm"></custom-radio>
      <custom-radio id="two" tag="radio" label="Woman" val="Woman" v-model="model.gender" :dis="disableForm"></custom-radio>
      <custom-radio id="three" tag="radio" label="They" val="They" v-model="model.gender" :dis="disableForm"></custom-radio>
      <custom-radio id="four" tag="radio" label="It" val="It" v-model="model.gender" :dis="disableForm"></custom-radio>
      </div>
      <div class="radio">
        Show checkbox
      <custom-radio id="one1" tag="show" label="Show" v-model="model.show" val="one"  check="true" :dis="disableForm"></custom-radio>
      <custom-radio id="two1" tag="show" label="Hide" val="two"  v-model="model.show" :dis="disableForm"></custom-radio>
      </div>
      <div v-if="model.show == `one`">
      <input type="checkbox" id="checkbox" name="checkbox" v-model="model.gay" class="custom-checkbox" :disabled="disableForm">
      <label for="checkbox">Gay?</label>
      </div>
      <div>
        <button type="submit" @click="sendModel" class="btn" :disabled="disableForm">Submit</button>
      </div>
    </form>
    <pre>
      {{model}}
    </pre>
    <div class="modal" v-show="modal" v-text="modalValue" :style="`border: 1px solid `+ modalColor">

    </div>
  </div>
</template>
<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator'
import CustomInput from "~/components/customInput.vue";
import CustomRadio from "~/components/сustomRedio.vue";

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

  async sendModel() {
    if (this.validValues()) {
      console.log("Otpravleno")
      this.disableForm = true
      await this.$axios.post("http://localhost:4000/form/create", this.model, {})
      //await this.$axios.post("http://localhost:4000", this.model, {})
        .then((response) => {
          this.modal = true
          this.modalValue = response.data.message
          this.modalColor = response.data.color
          console.log(response.data.save)
        })
        .catch((err) => {
          console.log(err)
          this.modal = true
          this.modalValue = err.data.message
          this.modalColor = err.data.color
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
    }
    else
    console.log("ne Otpravleno")
  }
   validValues() {
    return (!!this.model.name.length) && (!!this.model.secondName.length) && (this.model.phone.length == 18)
   }
   @Watch ("model.phone")
  changeModelPhone() {
    console.log(this.model.phone)
    if (this.model.phone.length <= 2) {
      return this.model.phone = "+7"
    }
   }
}
</script>
<style>
div + div {
  margin-top: 0.4rem;
}

.modal {
  position: fixed;
  padding-top: 12.5px;
  text-align: center;
  bottom: 10px;
  right: 10px;
  min-width: 200px;
  min-height: 30px;
}

.radio {
  border: solid black 1px;
  width: 200px;
  padding: 10px;
}

.custom-checkbox {
  position: absolute;
  z-index: -1;
  opacity: 0;
}
.custom-checkbox+label {
  display: inline-flex;
  align-items: center;
  user-select: none;
}
.custom-checkbox+label::before {
  content: '';
  display: inline-block;
  width: 1em;
  height: 1em;
  flex-shrink: 0;
  flex-grow: 0;
  border: 1px solid #adb5bd;
  border-radius: 0.25em;
  margin-right: 0.5em;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% 50%;
}
.custom-checkbox:checked+label::before {
  border-color: #0b76ef;
  background-color: #0b76ef;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
}

.btn {
  display: inline-block;
  box-sizing: border-box;
  padding: 0 25px;
  margin: 0 15px 15px 0;
  outline: none;
  border: 1px solid black;
  border-radius: 50px;
  height: 46px;
  line-height: 46px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  color: #444;
  background-color: #fff;
  box-shadow: 0 4px 6px rgb(65 132 144 / 10%), 0 1px 3px rgb(0 0 0 / 8%);
  cursor: pointer;
  user-select: none;
  appearance: none;
  touch-action: manipulation;
  vertical-align: top;
  transition: box-shadow 0.2s;
}
.btn:focus-visible {
  border: 1px solid #4c51f9;
  outline: none;
}
.btn:hover {
  transition: all 0.2s;
  box-shadow: 0 7px 14px rgb(65 132 144 / 10%), 0 3px 6px rgb(0 0 0 / 8%);
}
.btn:active {
  background-color: #808080;
}
.btn:disabled {
  background-color: #eee;
  border-color: #eee;
  color: #444;
  cursor: not-allowed;
}
</style>
