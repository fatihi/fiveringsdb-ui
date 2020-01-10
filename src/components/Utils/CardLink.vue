<template>
    <span>
        <a :href="url" v-b-popover="popover" @mouseover="changePopover" @touchstart="touchDevice"
          @click.prevent="showModal">
          <span>{{ card.name }}</span>
        </a>
        <span v-if="card.is_banned" :id="'banned_' + card.id" class="fa fa-ban" style="color:red"></span>
        <b-popover :target="'banned_'+card.id" triggers="hover" placement="right">
            This card is on the Banned List.
        </b-popover>
        <span v-if="card.is_restricted" :id="'restricted_' + card.id" class="fa fa-exclamation-triangle" style="color:orange"></span>
        <b-popover :target="'restricted_'+card.id" triggers="hover" placement="right">
            This card is on the Restricted List.
        </b-popover>
    </span>
</template>

<script>
  import CardsCard from '@/components/Cards/Card';

  export default {
    name: 'utils-card-link',
    components: {
      CardsCard,
    },
    props: ['card'],
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
