<template>
    <tr :class="'collection-row'">
        <td>
            <builder-quantity-selector
                    :min="min"
                    :max="max"
                    :current="current"
                    @change="change"
            ></builder-quantity-selector>
        </td>
        <td class="card-name">
            <utils-card-icon :card="card"></utils-card-icon>
            <utils-card-link
                    :card="card"
                    :format="format"
            ></utils-card-link>
            <span v-if="illegal"
                  :id="'role-warning_' +card.id"
                  class="fa fa-exclamation-triangle"
                  style="color:red"></span>

            <b-popover v-if="illegal" :target="'role-warning_'+card.id" triggers="hover" placement="top">
              The chosen role does not meet the role requirement of this card.
            </b-popover>
        </td>
        <td>
            <utils-card-traits-element :card="card"></utils-card-traits-element>
        </td>
        <td>
            <utils-influence-cost v-if="influence" :card="card"></utils-influence-cost>
        </td>
    </tr>
</template>

<script>
  import UtilsCardLink from '@/components/Utils/CardLink';
  import UtilsCardIcon from '@/components/Utils/CardIcon';
  import UtilsCardTraitsElement from '@/components/Utils/CardTraitsElement';
  import UtilsInfluenceCost from '@/components/Utils/InfluenceCost';
  import BuilderQuantitySelector from './QuantitySelector';

  export default {
    name: 'builder-collection-row',
    components: {
      BuilderQuantitySelector,
      UtilsCardLink,
      UtilsCardIcon,
      UtilsCardTraitsElement,
      UtilsInfluenceCost,
    },
    props: ['card', 'min', 'max', 'current', 'influence', 'illegal', 'format'],
    methods: {
      change(quantity) {
        this.$emit('change', {
          cardId: this.card.id,
          quantity,
        });
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .card-name {
        padding: .55rem .25rem;
    }
</style>
