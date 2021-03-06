<template>
    <div class="row">
        <div class="col-md-2">
            <ul class="nav nav-pills flex-sm-column justify-content-around mb-3 text-uppercase">
                <li class="nav-item">
                    <router-link :to="{name:'decks-list', params: { sort: 'search' }}"
                                 :class="{'nav-link': true, 'active': sort === 'search'}">Decks
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{name:'decks-list', params: { sort: 'trending' }}"
                                 :class="{'nav-link': true, 'active': sort === 'trending'}">Trending
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="col-md-8">
            <b-form-group v-if="form">
                <div class="text-center">
                    <b-btn v-b-toggle.form variant="outline-primary" size="sm"><span class="fa fa-cogs"></span>
                        Sort and Filter
                    </b-btn>
                </div>
                <b-collapse id="form" class="mt-2">
                    <b-card>
                        <form @submit.prevent="submit">
                            <div class="row">
                                <div class="form-group col-md-4">
                                    <label for="primaryClanInput">Primary Clan</label>
                                    <b-form-select id="primaryClanInput"
                                                   :options="clanOptions"
                                                   v-model="form.primaryClan"
                                    ></b-form-select>
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="secondaryClanInput">Secondary Clan</label>
                                    <b-form-select id="secondaryClanInput"
                                                   :options="clanOptions"
                                                   v-model="form.secondaryClan"
                                    ></b-form-select>
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="sortInput">Sort</label>
                                    <b-form-select id="sortInput"
                                                   :options="sortOptions" required
                                                   v-model="form.sort"
                                    ></b-form-select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group col-md-4">
                                    <label for="formatInput">Deck Format</label>
                                    <b-form-select id="formatInput"
                                                   :options="formatOptions"
                                                   v-model="form.format"
                                    ></b-form-select>
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="cardInput">Cards included</label>
                                    <multiselect
                                            v-model="form.cards"
                                            label="text"
                                            :multiple="true"
                                            :options="cardOptions">
                                    </multiselect>
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="sinceInput">Period</label>
                                    <b-form-select id="sinceInput"
                                                   :options="sinceOptions"
                                                   v-model="form.since"
                                    ></b-form-select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group col-md-4">
                                    <label>Submit</label>
                                    <b-button type="submit" variant="primary" :block="true">Submit</b-button>
                                </div>
                            </div>
                        </form>
                    </b-card>
                </b-collapse>
            </b-form-group>
            <decks-list-content v-if="search" :search="search"></decks-list-content>
        </div>
        <div class="col-md-2">
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="ca-pub-2254488884647695"
                 data-ad-slot="3777512162"
                 data-ad-format="auto"></ins>
        </div>
    </div>
</template>

<script>
  import Multiselect from 'vue-multiselect';
  import uniq from 'lodash/uniq';
  import moment from 'moment';
  import DecksListContent from './ListContent';
  import stores from '@/service/storeService';

  export default {
    name: 'decks-list',
    components: {
      DecksListContent,
      Multiselect,
    },
    data() {
      const clanOptions = [{ text: '', value: null }]
        .concat(
          uniq(stores.cards({ type: 'stronghold' }).select('clan'))
            .sort()
            .map(clan => ({ text: this.$t(`clan.${clan}`), value: clan })),
        );
      const cardOptions = [{ text: '', value: null }]
        .concat(
          stores.cards().get()
            .map(card => ({ text: card.name, value: card.id }),
            ),
        );
      return {
        search: null,
        form: null,
        sortOptions: [
          { text: 'Recent first', value: 'date' },
          { text: 'Popular first', value: 'popularity' },
        ],
        sinceOptions: [
          { text: 'Last 8 days', value: 8 },
          { text: 'Last 30 days', value: 30 },
          { text: 'Since ever', value: null },
        ],
        formatOptions: [
          { text: '', value: null },
          { text: 'Standard Format', value: 'standard'},
          { text: 'Jade Edict Format', value: 'jade-edict'},
          { text: 'Skirmish Format', value: 'skirmish'},
          { text: 'Single-Core Format', value: 'single-core'},
        ],
        clanOptions,
        cardOptions,
      };
    },
    computed: {
      sort() {
        return this.$route.params.sort || 'search';
      },
    },
    methods: {
      init() {
        if (this.sort === 'search') {
          this.form = {
            sort: 'date',
            since: null,
            primaryClan: null,
            secondaryClan: null,
            cards: [],
            format: null,
          };
        } else {
          this.form = null;
        }
      },
      submit() {
        const search = {};

        if (this.form) {
          search.sort = this.form.sort;
          if (this.form.since !== null) {
            search.since = moment().subtract(this.form.since, 'days').format('YYYY-MM-DD');
          }
          if (this.form.primaryClan !== null) {
            search.primaryClan = this.form.primaryClan;
          }
          if (this.form.secondaryClan !== null) {
            search.secondaryClan = this.form.secondaryClan;
          }
          if (this.form.cards.length > 0) {
            search.cards = this.form.cards.map(item => item.value);
          }
          if (this.form.format !== null) {
            search.format = this.form.format;
          }
        } else {
          search.sort = this.sort;
        }

        this.search = search;
      },
    },
    mounted() {
      this.$store.commit('changeDocumentTitle', 'Deck Builder');
      (adsbygoogle = window.adsbygoogle || []).push({});
    },
    watch: {
      $route() {
        this.init();
        this.submit();
      },
    },
    mounted() {
      this.init();
      this.submit();
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
    .page-item.active .page-link {
        z-index: auto;
    }
</style>
