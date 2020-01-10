<template>
    <div class="row">
        <div class="table-of-contents order-sm-2 col-12 col-sm-4">
            <b-btn v-b-toggle.toc variant="primary" class="d-sm-none">Table of Contents</b-btn>
            <b-collapse id="toc" class="mt-2 d-sm-block">
                <ul>
                    <li v-for="heading in headings" :class="['item-size-'+heading.level]">
                        <a :href="heading.href">{{ heading.text }}</a>
                    </li>
                </ul>
            </b-collapse>
        </div>
        <div class="contents order-sm-1 col-sm-8 mt-3">
            <h2>IMPERIAL LAW</h2>
            <hr>
            <section>
                <anchored-heading @heading="add" :level="1">Banned List</anchored-heading>
                <p>
                    When deckbuilding, a player may not include any copies of a card on the banned list in their decks 
		    and set of provinces.
                </p>
                <ul>
	            <li>
        	        <a href="https://fiveringsdb.com/card/guest-of-honor" target="_blank">Guest of Honor</a> (Core Set, 51)
	            </li>
		    <li>
			<a href="https://fiveringsdb.com/card/charge" target="_blank">Charge!</a> (Core Set, 210)
		    </li>
        	    <li>
                	<a href="https://fiveringsdb.com/card/isawa-tadaka" target="_blank">Isawa Tadaka</a> (Disciples of the Void, 10)
        	    </li>
		    <li>
			<a href="https://fiveringsdb.com/card/karada-district" target="_blank">Karada District</a> (Imperial Cycle, 4)
		    </li>
		    <li>
			<a href="https://fiveringsdb.com/card/master-of-gisei-toshi" target="_blank">Master of Gisei Toshi</a> (Imperial Cycle, 88)
		    </li>
		    <li>
			<a href="https://fiveringsdb.com/card/Kanjo District" target="_blank">Kanjo District</a> (Imperial Cycle, 108)
		    </li>
		    <li>
			<a href="https://fiveringsdb.com/card/jurojin-s-curse" target="_blank">Jurōjin's Curse</a> (Elemental Cycle, 55)
		    </li>
		    <li>
			<a href="https://fiveringsdb.com/card/hidden-moon-dojo" target="_blank">Hidden Moon Dōjō</a> (Elemental Cycle, 68)
		    </li>
		    <li>
			<a href="https://fiveringsdb.com/card/mirumoto-daisho" target="_blank">Mirumoto Daisho</a> (Children of the Empire, 58)
		    </li>
                </ul>
            </section>
            <section>
                <anchored-heading @heading="add" :level="1">Restricted List</anchored-heading>
                <p>
                    When deckbuilding, a player may select one card from the restricted list to include in their decks, 
		    and cannot include any other restricted cards in their decks and set of provinces. A player may run 
		    as many copies of his or her chosen restricted card in a deck as the regular game rules (or card text) allow
                </p>
                <ul>
        	    <li>
	                <a href="https://fiveringsdb.com/card/kuroi-mori" target="_blank">Kuroi Mori</a> (Core Set, 12)
        	    </li>
        	    <li>
	                <a href="https://fiveringsdb.com/card/secret-cache" target="_blank">Secret Cache</a> (Core Set, 13)
        	    </li>
	            <li>
        	        <a href="https://fiveringsdb.com/card/rebuild" target="_blank">Rebuild</a> (Core Set, 136)
	            </li>
		    <li>
		   	<a href="https://fiveringsdb.com/card/mirumoto-s-fury" target="_blank">Mirumoto's Fury</a> (Core Set, 159)
		    </li>
		    <li>
			<a href="https://fiveringsdb.com/card/forged-edict" target="_blank">Forged Edict</a> (Core Set, 184)
		    </li>
		    <li>
			<a href="https://fiveringsdb.com/card/spyglass" target="_blank">Spyglass</a> (Core Set, 193)
		    </li>
        	    <li>
                	<a href="https://fiveringsdb.com/card/embrace-the-void" target="_blank">Embrace the Void</a> (Imperial Cycle, 16)
	            </li>
		    <li>
			<a href="https://fiveringsdb.com/card/pathfinder-s-blade" target="_blank">Pathfinder's Blade</a> (Imperial Cycle, 31)
		    </li>
		    <li>
 			<a href="https://fiveringsdb.com/card/policy-debate" target="_blank">Policy Debate</a> (Imperial Cycle, 40)
		    </li>
		    <li>
 			<a href="https://fiveringsdb.com/card/the-imperial-palace" target="_blank">The Imperial Palace</a> (Imperial Cycle, 72)
		    </li>
		    <li>
 			<a href="https://fiveringsdb.com/card/consumed-by-five-fires" target="_blank">Consumed by Five Fires</a> (Imperial Cycle, 96)
		    </li>
		    <li>
 			<a href="https://fiveringsdb.com/card/cunning-magistrate" target="_blank">Cunning Magistrate</a> (Imperial Cycle, 97)
		    </li>
        	    <li>
			<a href="https://fiveringsdb.com/card/a-fate-worse-than-death" target="_blank">A Fate Worse than Death</a> (Imperial Cycle, 98)
		    </li>
        	    <li>
                	<a href="https://fiveringsdb.com/card/void-fist" target="_blank">Void Fist</a> (Elemental Cycle, 94)
	            </li>
        	    <li>
                	<a href="https://fiveringsdb.com/card/mark-of-shame" target="_blank">Mark of Shame</a> (Elemental Cycle, 97)
	            </li>
        	    <li>
                	<a href="https://fiveringsdb.com/card/magistrate-station" target="_blank">Magistrate Station</a> (Elemental Cycle, 102)
	            </li>
        	    <li>
                	<a href="https://fiveringsdb.com/card/kakita-toshimoko" target="_blank">Kakita Toshimoko</a> (Children of the Empire, 14)
	            </li>
        	    <li>
                	<a href="https://fiveringsdb.com/card/gateway-to-meido" target="_blank">Gateway to Meido</a> (Inheritance Cycle, 3)
	            </li>
                </ul>
            </section>
            <section>
                <anchored-heading @heading="add" :level="1">Card Errata</anchored-heading>
                <p>
                    This section contains a list of changes to cards that are not reflected on the original printing of those cards. 
		    These changes to the cards alter how they are played during the game.
                </p>
                <h5>
                    <a href="https://fiveringsdb.com/card/city-of-the-open-hand" target="_blank">City of the Open Hand</a> 
                    (Core Set, 6)
                </h5>
                <p>
                    Should read: “...bow this stronghold and select one – either that opponent loses 1 honor, or you gain 1 honor.”
                    <br>
                    <i>(Replaces “...bow this stronghold – take 1 honor from that player.”)</i>
                </p>
                <h5>
                    <a href="https://fiveringsdb.com/card/restoration-of-balance" target="_blank">Restoration of Balance</a> 
                    (Core Set, 10)
                </h5>
                <p>
                    Should read: “<em>Interrupt</em>: When this province is broken...”
                    <br>
                    <i>(Replaces “<em>Reaction</em>: After this province is revealed...”)</i>
                </p>
                <h5>
                    <a href="https://fiveringsdb.com/card/against-the-waves" target="_blank">Against the Waves</a> 
                    (Core Set, 117)
                </h5>
                <p>
                    Should read: “Choose a <em>Shugenja</em> character you control”
                    <br>
                    <i>(Added "you control")</i>
                </p>
                <h5>
                    <a href="https://fiveringsdb.com/card/kyuden-isawa" target="_blank">Kyūden Isawa</a> 
                    (Disciples of the Void, 1)
                </h5>
                <p>
                    Should read: “During a conflict, bow this stronghold and discard a <em>Spell</em> event from your hand”
                    <br>
                    <i>(Added "and discard a <em>Spell</em> event from your hand")</i>
                </p>
		<h5>
                    <a href="https://fiveringsdb.com/card/kaito-kosori" target="_blank">Kaito Kosori</a> (Disciples of the Void, 18)
                </h5>
                <p>
                    Should read: "During each <span class="icon icon-element-air"></span> conflict, if you control at least 1 
                    participating character and if this character is in your home area and ready, it contributes its skill to your side."
                    <br> 
		    <i>(Added "and ready.")</i>
                </p>
		<h5>
                    <a href="https://fiveringsdb.com/card/yogo-kikuyo" target="_blank">Yogo Kikuyo</a> (Disciples of the Void, 25)
                </h5>
                <p>
                    Should read: "When the effects of a <em>Spell</em> event your opponent plays during a conflict would initiate, 
		    put this character into play from your hand – cancel its effects."
                    <br> 
		    <i>(Added "from your hand.")</i>
                </p>
		<h5>
                    <a href="https://fiveringsdb.com/card/daidoji-uji" target="_blank">Daidoji Uji</a> (Masters of the Court, 11)
                </h5>
                <p>
                    Should read: “While this character is honored, you may play each character in your provinces as if it were in your hand.”
                    <br> 
		    <i>(Removed “reducing its cost by 1.”)</i>
                </p>
		<h5>
                    <a href="https://fiveringsdb.com/card/kaiu-shihobu" target="_blank">Kaiu Shihobu</a> (Defenders of Rokugan, 10)
                </h5>
                <p>
                    Should read: “Put a facedown holding under your stronghold province into play in an unbroken non-stronghold province...”
                    <br> 
		    <i>(Replaces “Put a facedown holding under your stronghold province into an unbroken non-stronghold province...”)</i>
                </p>
		<h5>
                    <a href="https://fiveringsdb.com/card/feast-or-famine" target="_blank">Feast or Famine</a> (Imperial Cycle, 41)
                </h5>
		<p>
		    Should read: “...move 1 fate from that character to a character you control.”
		    <br> 
		    <i>(Replaces “move each fate from that character to a character you control with no fate.”)</i>
                </p>
		<h5>
                    <a href="https://fiveringsdb.com/card/hawk-tattoo" target="_blank">Hawk Tattoo</a> (Elemental Cycle, 75)
                </h5>
		<p>
		    Should read: "Attach to a character you control."
		    <br> 
		    <i>(Added "Attach to a character you control.")</i>
                </p>
                <h5>
                    <a href="https://fiveringsdb.com/card/stay-your-hand" target="_blank">Stay Your Hand</a> (Children of the Empire, 80)
                </h5>
		<p>
		    Should read: “When a duel that targets a character you control would resolve”
		    <br> <i>(Replaces “When an opponent initiates a duel that targets a character you control”)</i>
                </p>
            </section>
        </div>
    </div>
</template>

<script>
  import defer from 'lodash/defer';
  const getChildrenTextContent = children => children.map(node => (node.children ? getChildrenTextContent(node.children) : node.text))
    .join('');
  export default {
    name: 'rules-reference',
    props: [],
    data() {
      return {
        headings: [],
      };
    },
    components: {
      AnchoredHeading: {
        props: {
          level: {
            type: Number,
            required: true,
          },
        },
        data() {
          const text = getChildrenTextContent(this.$slots.default);
          const shorttext = text.indexOf('(') > -1 ? text.substring(0, text.indexOf('(')).trim() : text;
          const headingId = shorttext
            .toLowerCase()
            .replace(/\W+/g, '-')
            .replace(/(^-|-$)/g, '')
          ;
          return {
            text,
            headingId,
          };
        },
        render(createElement) {
          return createElement(
            `h${this.level}`,
            [
              this.$slots.default,
              createElement('a', {
                attrs: {
                  name: this.headingId,
                  href: `#${this.headingId}`,
                  title: this.text,
                  class: 'anchor',
                  'data-level': this.level,
                },
                domProps: {
                  innerHTML: '&para;',
                },
              }),
              createElement('a', {
                attrs: {
                  href: '#top',
                  title: 'Back to Top',
                  class: 'back-to-top float-right',
                },
                domProps: {
                  innerHTML: '&uarr;',
                },
              }),
            ],
          );
        },
        mounted() {
          this.$emit('heading', {
            level: this.level,
            text: this.text,
            href: `#${this.headingId}`,
          });
        },
      },
    },
    methods: {
      add(heading) {
        this.headings.push(heading);
      },
      scroll(hashbang) {
        if (hashbang) {
          location.href = hashbang;
        }
      },
    },
    mounted() {
      this.$store.commit('changeDocumentTitle', 'The Imperial Law');
      defer(this.scroll, this.$route.hash);
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped="scoped">
    .table-of-contents li {
        list-style: none;
    }
    .table-of-contents li.item-size-1 {
        font-size: 14px;
    }
    .table-of-contents li.item-size-2 {
        font-size: 12px;
        padding-left: 1em;
    }
    .table-of-contents li.item-size-3 {
        font-size: 10px;
        padding-left: 2em;
    }
    .contents {
        line-height: 1.6;
    }
    .contents .new {
        color: red;
    }
    .contents em {
        font-style: italic;
        font-weight: bold;
    }
    .contents table.chart {
        background-color: #dddddd;
        width: 22em;
        border-spacing: 0.5em;
    }
    .contents table.chart td {
        background-color: #bbbbbb;
        padding: 0.5em;
    }
    .contents table.chart td.top {
        background-color: #dddddd;
        font-size: 1.2em;
        font-weight: bold;
    }
    .contents table.chart td.bottom {
        background-color: #dddddd;
        text-align: center;
        font-weight: bold;
        font-style: italic;
    }
    .contents table.chart td.action {
        background-color: orange;
    }
    .contents p.question {
        font-style: italic;
        list-style: square;
        display: list-item;
        margin-left: 2rem;
    }
</style>
<style>
    .contents a.anchor, .contents a.back-to-top {
        color: lightgrey;
        padding-left: 5px;
    }
    .contents a.anchor:hover, .contents a.back-to-top:hover {
        color: #007bff;
        text-decoration: none;
    }
</style>
