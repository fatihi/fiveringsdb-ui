<template>
  <b-modal
    id="card_modale"
    v-model="visible"
    @hidden="hide"
    size="lg"
    okTitle="Go to card page"
    @ok="goToCardPage"
  >
    <div v-if="card" class="row">
      <div class="col-4 d-none d-md-block">
        <utils-card-image :card="card"></utils-card-image>
      </div>
      <div class="col-12 col-md-8">
        <cards-card v-bind:card="card">
          <utils-card-link :card="card"></utils-card-link>
        </cards-card>
      </div>
    </div>
    <div v-if="card && editable" slot="modal-header" class="w-100 text-center">
      <button @click="hide" type="button" aria-label="Close" class="close float-right">
        <span aria-hidden="true">×</span>
      </button>
      <quantity-selector :min="0" :max="max" :current="current" @change="onChange"></quantity-selector>
    </div>
  </b-modal>
</template>

<script>
import CardsCard from "@/components/Cards/Card";
import UtilsCardImage from "@/components/Utils/CardImage";
import UtilsCardLink from '@/components/Utils/CardLink';
import QuantitySelector from "@/components/Builder/QuantitySelector";
import * as types from "@/store/mutation-types";

export default {
  components: {
    CardsCard,
    UtilsCardImage,
    UtilsCardLink,
    QuantitySelector
  },
  name: "utils-card-modale",
  data() {
    return {
      visible: false
    };
  },
  mounted() {
    let self = this;
    window.addEventListener("keydown", function(event) {
      const card = self.$store.getters.cardModale;
      if (card && self.editable) {
        if (
          event.code === "Digit0" ||
          event.code === "Digit1" ||
          event.code === "Digit2" ||
          event.code === "Digit3"
        ) {
          const value = parseInt(event.key);
          if (value <= self.max) {
            self.onChange(value);
          }
        }
      }
    });
  },
  computed: {
    card() {
      const card = this.$store.getters.cardModale;
      this.visible = card !== null;
      return card;
    },
    editable() {
      return this.$route.meta.deckEdition;
    },
    current() {
      return this.card ? this.$store.getters.quantity(this.card.id) : 0;
    },
    max() {
      return this.card ? this.$store.getters.available(this.card.id) : 3;
    }
  },
  methods: {
    hide() {
      this.$store.commit("closeCardModale");
      const setFocus = this.$store.getters.setFocus;
      if (setFocus) {
        setFocus();
      }
    },
    goToCardPage() {
      this.$router.push({
        name: "cards-by-card-id",
        params: {
          id: this.card.id
        }
      });
    },
    onChange(quantity) {
      this.$store.commit({
        type: types.SET_SLOT_QUANTITY,
        cardId: this.card.id,
        quantity
      });
      this.hide();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
