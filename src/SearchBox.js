const SearchBoxSymbol = Symbol("SearchBox");

const SearchBox = {
  props: ["value"],
  data: () => ({
    isOpen: { value: false },
    selected: { value: null },
    label: { value: "" },
  }),
  provide() {
    return {
      [SearchBoxSymbol]: {
        isOpen: this.$data.isOpen,
        select: this.select,
        selected: this.$data.selected,
        label: this.$data.label,
        setLabel: this.setLabel,
      },
    };
  },
  methods: {
    select(value) {
      this.$data.selected.value = value;
      this.$emit("input", value);
      this.$nextTick(() => {
        this.close();
      });
    },
    setLabel(value) {
      this.$data.label.value = value;
    },
    close() {
      this.$data.isOpen.value = false;
    },
  },
  render(h) {
    return h(
      "div",
      {},
      this.$slots.default
        ? this.$slots.default
        : this.$scopedSlots.default({
            isOpen: this.$data.isOpen.value,
          })
    );
  },
};

const SearchBoxLabel = {
  render(h) {
    return h("span", {}, this.$slots.default);
  },
};

const SearchBoxInput = {
  inject: {
    context: SearchBoxSymbol,
  },
  render(h) {
    return h(
      "input",
      {
        attrs: {
          type: "text",
        },
        domProps: {
          value: this.context.label.value,
        },
        on: {
          keyup: e => {
            this.$emit("keyup", e);
          },
        },
      },
      this.context.selected.value
    );
  },
};

const SearchBoxResult = {
  inject: {
    context: SearchBoxSymbol,
  },
  props: ["gotResults"],
  watch: {
    gotResults(newValue) {
      this.context.isOpen.value = newValue;
    },
  },
  render(h) {
    return h("ul", {}, this.$slots.default);
  },
};

const SearchBoxResultItem = {
  inject: {
    context: SearchBoxSymbol,
  },
  props: ["value", "label"],
  render(h) {
    return h(
      "li",
      {
        attrs: {
          role: "option",
        },
        on: {
          click: () => {
            this.context.select(this.value);
            this.context.setLabel(this.label);
          },
        },
      },
      this.$slots.default
    );
  },
};

export default {
  SearchBox,
  SearchBoxLabel,
  SearchBoxInput,
  SearchBoxResult,
  SearchBoxResultItem,
};
