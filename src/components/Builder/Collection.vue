<template>
  <div class="collection">
    <builder-collection-filter
      :startingClans="startingClans"
      v-model="cardFilters"
      :open-first-card="openFirstCard"
      ref="builderCollectionFilter"
    />

    <table class="table table-sm">
      <thead>
        <tr>
          <th>Quantity</th>
          <th>Name</th>
          <th>Traits</th>
        </tr>
      </thead>
      <tbody>
        <builder-collection-row
          v-for="cardslot in illegalCardslots"
          :key="cardslot.card.id + '_illegal'"
          :card="cardslot.card"
          :min="cardslot.min"
          :max="cardslot.max"
          :current="cardslot.current"
          :influence="cardslot.card.clan !== mainClan"
          @change="changeQuantity"
          :illegal="true"
          :format="format"
        ></builder-collection-row>
        <builder-collection-row
          v-for="cardslot in cardslots"
          :key="cardslot.card.id"
          :card="cardslot.card"
          :min="cardslot.min"
          :max="cardslot.max"
          :current="cardslot.current"
          :influence="cardslot.card.clan !== mainClan"
          @change="changeQuantity"
          :illegal="false"
          :format="format"
        ></builder-collection-row>
      </tbody>
    </table>
  </div>
</template>

<script>
import stores from '@/service/storeService';
import * as types from '@/store/mutation-types';
import BuilderCollectionRow from './CollectionRow';
import BuilderCollectionFilter from './CollectionFilter';
import queryParser from '@/service/queryParser';
import QueryInput from '@/classes/QueryInput';
import queryBuilder from '@/service/queryBuilder';

export default {
  name: 'builder-collection',
  components: {
    BuilderCollectionRow,
    BuilderCollectionFilter,
  },
  props: [
      'format',
      'clan'
  ],
  data() {
    return {
      cardFilters: {
        filter: [],
        packFilter: [],
        queryString: '',
      },
    };
  },
  computed: {
    slots() {
      return this.$store.getters.slots;
    },
    startingClans() {
      return stores.cards({ id: Object.keys(this.slots) }).distinct('clan');
    },
    stronghold() {
      return stores
        .cards({ id: Object.keys(this.slots), type: 'stronghold' })
        .first();
    },
    role() {
      return stores
        .cards({ id: Object.keys(this.slots), type: 'role' })
        .first();
    },
    mainClan() {
      return this.stronghold ? this.stronghold.clan :
                this.clan ? this.clan : null;
    },
    roleRestrictionFilter() {
      const roleRestrictionFilter = [
        {
          role_restriction: { isNull: true },
        },
      ];

      if (this.role && this.role.traits) {
        this.role.traits.forEach((trait) => {
          roleRestrictionFilter.push({ role_restriction: trait });
        });
      }

      return roleRestrictionFilter;
    },
    cards() {
      let cards = this.filteredCards;
      if (this.mainClan !== null) {
        cards = cards.filter({ allowed_clans: { has: this.mainClan } });
      }
      return cards.filter(this.roleRestrictionFilter);
    },
    allCards() {
        return stores.cards.apply(this)
    },
    filteredCards() {
      const clauses = queryParser.parse(this.cardFilters.queryString);
      const queryInput = new QueryInput(clauses);
      const queryFilters = queryBuilder.build(queryInput);
      return stores.cards.apply(this, queryFilters)
        .filter(this.cardFilters.filter)
        .filter(this.cardFilters.packFilter);
    },
    cardslots() {
      return this.cards.map(record => ({
          card: record,
          min: 0,
          max: this.getMaxQuantityForCard(record, this.format),
          current: this.getQuantity(record) || 0,
        }
      ))
    },
    illegalCardslots() {
      let roleRestrictions = this.roleRestrictionFilter
        .map(restriction => restriction.role_restriction)
        .filter(restriction => restriction.isNull == null)
      let illegalSlots = this.allCards.map(record => ({
        card: record,
        min: 0,
        max: record.deck_limit,
        current: this.getQuantity(record) || 0,
      }))
        .filter(slot => slot.current > 0)
        .filter(slot => slot.card.role_restriction != null)
        .filter(slot => roleRestrictions.filter(restriction => restriction == slot.card.role_restriction).length == 0);
      return illegalSlots;
    },
  },
  methods: {
    getMaxQuantityForCard(card, format) {
      const deckLimit = card.deck_limit;
      if (deckLimit <= 2) {
        return deckLimit;
      } else {
        return format === 'skirmish' ? 2 : deckLimit;
      }
    },
    getQuantity(card) {
      return this.$store.getters.quantity(card.id);
    },
    getMaxQuantity(card) {
      return this.$store.getters.available(card.id);
    },
    changeQuantity(msg) {
      this.$store.commit({
        type: types.SET_SLOT_QUANTITY,
        cardId: msg.cardId,
        quantity: msg.quantity,
      });
    },
    openFirstCard() {
      this.$store.commit('openCardModale', {
        card: this.cards.first(),
        setFocus: this.$refs.builderCollectionFilter.setFocus,
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
