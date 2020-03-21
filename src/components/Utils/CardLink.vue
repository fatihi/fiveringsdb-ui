<template>
    <span>
        <a :href="url" v-b-popover="popover" @mouseover="changePopover" @touchstart="touchDevice"
          @click.prevent="showModal">
          <span>{{ card.name }}</span>
        </a>
        <template v-if="format !== 'skirmish'">
          <span v-if="card.is_banned" :id="'banned_standard_' + card.id" class="fa fa-ban" style="color:red"></span>
          <b-popover v-if="card.is_banned" :target="'banned_standard_'+card.id" triggers="hover" placement="top">
              This card is on the Standard Format Banned List.
          </b-popover>
          <span v-if="card.is_restricted" :id="'restricted_' + card.id" class="fa fa-exclamation-triangle" style="color:orange"></span>
          <b-popover v-if="card.is_restricted" :target="'restricted_'+card.id" triggers="hover" placement="top">
              This card is on the Standard Format Restricted List.
          </b-popover>
        </template>
        <template v-if="format !== 'standard' && format !== 'single-core'">
          <span v-if="card.is_banned_in_skirmish" :id="'banned_skirmish_' + card.id" class="fa fa-ban" style="color:green"></span>
          <b-popover v-if="card.is_banned_in_skirmish" :target="'banned_skirmish_'+card.id" triggers="hover" placement="top">
              This card is on the Skirmish Format Banned List.
          </b-popover>
        </template>
    </span>
</template>

<script>
  import CardsCard from '@/components/Cards/Card';

  export default {
    name: 'utils-card-link',
    components: {
      CardsCard,
    },
    props: ['card', 'format'],
    data() {
      return {
        popover: {
          content: () => document.getElementById('popover-card-container').innerHTML,
          trigger: 'hover',
          delay: { show: 600, hide: 100 },
          html: true,
          animation: false,
        },
      };
    },
    computed: {
      url() {
        return this.$router.resolve({
          name: 'cards-by-card-id',
          params: {
            id: this.card.id,
          },
        }).href;
      },
    },
    methods: {
      touchDevice() {
        if (this.$store.getters.touchDevice === false) {
          this.$store.commit('touchDevice', true);
        }
      },
      changePopover() {
        if (this.$store.getters.touchDevice === false) {
          this.$store.commit('changeCardPopover', this.card);
        }
      },
      showModal() {
        this.$store.commit('openCardModale', { card: this.card });
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
