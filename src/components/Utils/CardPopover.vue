<template>
    <div id="popover-card-container" class="d-none">
        <cards-card class="popover-card" v-if="card" :card="card" :display-flavor="false" :allow-pack-selection="false">
          <utils-card-link :card="card"></utils-card-link>      
        </cards-card>
    </div>
</template>

<script>
  import CardsCard from '@/components/Cards/Card';
  import UtilsCardLink from '@/components/Utils/CardLink';

  export default {
    components: {
      CardsCard,
      UtilsCardLink
    },
    name: 'utils-card-popover',
    computed: {
      card() {
        return this.$store.getters.cardPopover;
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
