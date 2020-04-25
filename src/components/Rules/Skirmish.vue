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
            <h2>SKIRMISH RULES</h2>
            <p>
                Version 1
            </p>
			<p>
				The skirmish format is an alternate way for 2-5 players to play Legend of the Five Rings:
				The Card Game. The standard playing time of this format with 2 players is 10-30 minutes.
				<br>
				This rules document details the changes to the standard rules that are adopted when playing
				a skirmish format game.
				<br>
				<b>The standard game rules apply wherever they are not explicitly altered, replaced, or
				negated by this rules document.</b>
			</p>
    <hr>
    <section>
        <anchored-heading @heading="add" :level="1">Deckbuilding</anchored-heading>
        <p>
            The skirmish format is a constructed format in which players build two decks of 30-40
  cards each, drawing from their collection to muster the characters, holdings, events,
  and attachments they will need to vanquish their opponents. To build decks for this
  format, use the following rules:
        </p>
        <ul>
          <li>
						No stronghold, province, or role cards are used.
					</li>
					<ul>
						<li>
							Note: As no role cards are used, no dynasty or conflict cards that are “role only”
							cards can be included in a player’s decks.
						</li>
					</ul>
					<li>
						A player’s dynasty deck must contain a minimum of 30 cards and a maximum of 40 cards.
						Each of these cards must be in-clan or neutral.
					</li>
					<li>
						A player’s conflict deck must contain a minimum of 30 cards and a maximum of 40 cards.
						Each of these cards must be in-clan or neutral, or be purchased from a <b>single</b>
						other clan by using influence.
					</li>
					<ul>
						<li>
							Each player has 6 influence with which to purchase out-of-clan cards during
							deckbuilding.
						</li>
					</ul>
					<li>
						No more than 2 copies of a single card by title can be included in any combination in
						a player’s dynasty and conflict decks.
					</li>
					<li>
						A player cannot include any cards on the Banned List in either of their decks.
					</li>
					<li>
						For tournament play, each player may include up to 10 additional cards in their
						“sideboard,” which can be used to modify the contents of their decks in between games
						in a single match. The contents of a players’ decks and sideboard combined must follow
						all rules outlined above.
					</li>
        </ul>
                <article>
                    <anchored-heading @heading="add" :level="2">Banned List</anchored-heading>
					<p>
						When deckbuilding, a player may not include any copies of a card on the banned list
						in their decks.
					</p>
					<ul>
            <li>
            <a href="https://fiveringsdb.com/card/guest-of-honor" target="_blank">Guest of Honor</a> (Core Set, 51)
            </li>
            <li>
            <a href="https://fiveringsdb.com/card/charge" target="_blank">Charge!</a> (Core Set, 210)
            </li>
            <li>
            <a href="https://fiveringsdb.com/card/karada-district" target="_blank">Karada District</a> (Imperial Cycle, 4)
            </li>
            <li>
            <a href="https://fiveringsdb.com/card/the-imperial-palace" target="_blank">The Imperial Palace</a> (Imperial Cycle, 72)
            </li>
            <li>
            <a href="https://fiveringsdb.com/card/way-of-the-chrysanthemum" target="_blank">Way of the Chrysanthemum</a> (Imperial Cycle, 80)
            </li>
            <li>
            <a href="https://fiveringsdb.com/card/master-of-gisei-toshi" target="_blank">Master of Gisei Toshi</a> (Imperial Cycle, 88)
            </li>
            <li>
            <a href="https://fiveringsdb.com/card/kanjo-district" target="_blank">Kanjo District</a> (Imperial Cycle, 108)
            </li>
            <li>
            <a href="https://fiveringsdb.com/card/alibi-artist" target="_blank">Alibi Artist</a> (Underhand of the Emperor, 4)
            </li>
            <li>
            <a href="https://fiveringsdb.com/card/hidden-moon-dojo" target="_blank">Hidden Moon Dōjō</a> (Elemental Cycle, 68)
            </li>
            <li>
            <a href="https://fiveringsdb.com/card/mirumoto-daisho" target="_blank">Mirumoto Daisho</a> (Children of the Empire, 58)
            </li>
            <li>
            <a href="https://fiveringsdb.com/card/prayers-to-ebisu" target="_blank">Prayers to Ebisu</a> (Children of the Empire, 82)
            </li>
            <li>
            <a href="https://fiveringsdb.com/card/chronicler-of-conquests" target="_blank">Chronicler of Conquests</a> (Dominion Cycle, 35)
            </li>
					</ul>
				</article>
            </section>
            <section>
                <anchored-heading @heading="add" :level="1">Simplified Game Mechanics</anchored-heading>
                <p>
                    A number of rules present in the stronghold format are ignored when playing the skirmish format.
                </p>
                <article>
                    <anchored-heading @heading="add" :level="3">Dynasty Phase</anchored-heading>
					<ul>
						<li>
							<b>No passing fate</b> – The player who passes first during the dynasty phase does not gain 1 fate.
						</li>
						<li>
							<b>No actions from hand</b> – During the dynasty phase, players cannot play cards from their hand
							unless those cards are Reaction or Interrupt events.
						</li>
					</ul>
				</article>
                <article>
                    <anchored-heading @heading="add" :level="3">Conflict Phase</anchored-heading>
					<ul>
						<li>
							<b>One Conflict</b> – During the conflict phase, each player has only one conflict opportunity.
							Players may still gain conflict opportunities by card effects.
						</li>
						<li>
							<b>Imperial Favor is type-agnostic</b> – The Imperial Favor applies to each conflict regardless
							of type.
						</li>
						<li>
							<b>No unopposed honor loss</b> – When a defending player loses a conflict with no defending
							characters, they do not lose 1 honor.
						</li>
					</ul>
				</article>
				<article>
                    <anchored-heading @heading="add" :level="3">Fate Phase</anchored-heading>
					<ul>
						<li>
							<b>No fate on unclaimed rings</b> – Skip step 4.4 of the fate phase (“place fate on unclaimed
							rings”).
						<ul>
							<li>
								Note: Fate can still be spent to or placed on rings by card effects.
							</li>
						</ul>
						</li>
						<li>
							<b>Cards are not discarded from broken provinces</b> – During step 4.6 of the fate phase,
							players do not have to discard faceup cards from their broken provinces unless they wish
							to do so.
						</li>
					</ul>
				</article>
				<article>
					<anchored-heading @heading="add" :level="2">Ring Effects</anchored-heading>
				    <ul>
              <li>
                <b>Three new ring effects</b> – The air, earth, and water rings have modified effects to
                make this format easier to learn and more fun to play.
              </li>
            </ul>
                    <p>
                        <b><span class="icon icon-element-air"></span> Air</b>:
						Take 1 honor from your opponent.
                    </p>
                    <p>
                        <b><span class="icon icon-element-earth"></span> Earth</b>:
						Either draw 1 card from your conflict deck or discard 1 random card from your opponent's hand.
                    </p>
                    <p>
                        <b><span class="icon icon-element-fire"></span> Fire</b>:
						Choose a character in play and either honor or dishonor it.
                    </p>
                    <p>
                        <b><span class="icon icon-element-water"></span> Water</b>:
						Choose a character in any player’s home area with 1 or fewer fate on it and either ready or bow it.
                    </p>
                    <p>
                        <b><span class="icon icon-element-void"></span> Void</b>:
						Choose a character and remove 1 fate from it.
                    </p>
				</article>
				<article>
					<anchored-heading @heading="add" :level="2">Dueling</anchored-heading>
				    <ul>
              <li>
                <b>Bid First, Skill Second</b> – Instead of adding the dueling characters’ skills to
                each players’ bids in a duel, players compare their bids directly to determine the
                outcome of a duel. The player whose dueling character has a higher skill value adds
                1 to their bid to increase their duel total.
              </li>
            </ul>
				</article>
				<article>
					<anchored-heading @heading="add" :level="2">The Rule of Three</anchored-heading>
					<p>
						Most base game values are reduced to three (or six). The “Rule of Three” is a memory aid to
						assist players in recalling that most game values not printed on a card do not go above three.
					</p>
					<ul>
						<li>
							<b>Three Provinces</b> – Each player has 3 provinces, each of which has 3 strength, no
							element, and no game text.
						</li>
						<ul>
							<li>
								For more information on provinces, see “Province Tokens” below.
							</li>
							<li>
								If all three of a player’s provinces are broken, they immediately lose the game.
							</li>
						</ul>
						<li>
							<b>Three Cards in Hand</b> – During setup, each player draws and mulligans to 3 cards.
							(There is no hand size limit.)
						</li>
						<li>
							<b>Honor Dials 1-3</b> – Each player cannot select a number higher than 3 on their honor
							dial when instructed to do so (such as during the draw phase, or during a duel).
						</li>
						<li>
							<b>Six Fate</b> – Each player collects 6 fate at the start of each dynasty phase.
						</li>
						<li>
							<b>Six Honor</b> – Each player starts the game with 6 honor.
						</li>
						<ul>
							<li>
								If a player ever has 12 honor, they win the game.
							</li>
							<li>
								If a player ever has 0 honor, they lose the game.
							</li>
						</ul>
						<li>
							<b>Six Influence</b> – Each player has 6 influence to spend on out-of-clan cards during
							deckbuilding.
						</li>
						<li>
							<b>Reduced Reshuffle</b> – If a player reshuffles an empty deck, they lose 3 honor.
						</li>
					</ul>
				</article>
				<article>
					<anchored-heading @heading="add" :level="2">Province Tokens</anchored-heading>
					<ul>
						<li>
							<b>Token Cards</b> – Each province token is represented by a province card back. Province
							tokens have the following attributes:
						</li>
						<ul>
							<li>
								Provinces have 3 strength, no element, and no game text.
							</li>
							<li>
								Provinces are neither faceup nor facedown for the purposes of card effects. They are
								never revealed.
							</li>
						</ul>
						<li>
							<b>Breaking a province</b> – When a province is broken, take its token and set it aside,
							out of play. The province will continue to refill with cards from a player’s dynasty deck
							even though the token has been set aside.
						</li>
					</ul>
				</article>
				<article>
					<anchored-heading @heading="add" :level="2">More Than Two Players</anchored-heading>
					<ul>
						<li>
							<b>The Draw Phase</b> – Instead of two players comparing their bids against one another,
							each player compares their honor bid against all other players. When comparing 3 or more
							honor bids, each player gives 1 honor to each player who bid lower than them.
						</li>
						<li>
							<b>Declaring Conflicts</b> – Each player has one conflict opportunity. This allows up to
							five players to declare conflicts in a single game round.
						</li>
						<li>
							<b>Imperial Favor</b> – If a single player’s total glory is higher than each other player’s,
							then that player claims the Imperial Favor. If two or more players are tied for having the highest
							total, the Imperial Favor remains in its current state (either unclaimed or with the player who
							currently has it).
						</li>
					</ul>
				</article>
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
      this.$store.commit('changeDocumentTitle', 'Skirmish Rules');
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
