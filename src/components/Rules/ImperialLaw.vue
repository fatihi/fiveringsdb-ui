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
            <h2>THE IMPERIAL LAW</h2>
            <p>
                Coming Soon!
            </p>
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
