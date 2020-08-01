import {
  SearchBox,
  SearchBoxLabel,
  SearchBoxInput,
  SearchBoxResult,
  SearchBoxResultItem,
} from "./SearchBox";

function install(Vue) {
  Vue.component("SearchBox", SearchBox);
  Vue.component("SearchBoxLabel", SearchBoxLabel);
  Vue.component("SearchBoxInput", SearchBoxInput);
  Vue.component("SearchBoxResult", SearchBoxResult);
  Vue.component("SearchBoxResultItem", SearchBoxResultItem);
}

export { install };
