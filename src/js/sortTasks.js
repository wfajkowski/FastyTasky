import Sortable from "sortablejs";

const el = document.querySelector(".list-group");
Sortable.create(el, {
  group: "localStorage-example",
  store: {
    /**
     * Get the order of elements. Called once during initialization.
     * @param   {Sortable}  sortable
     * @returns {Array}
     */
    get: function(sortable) {
      var order = localStorage.getItem(sortable.options.group.name);
      return order ? order.split("|") : [];
    },

    /**
     * Save the order of elements. Called onEnd (when the item is dropped).
     * @param {Sortable}  sortable
     */
    set: function(sortable) {
      var order = sortable.toArray();
      console.log(order);
      for (let i = 0; i < order.length; i++) {
        console.log(order[i], i);
      }

      localStorage.setItem(sortable.options.group.name, order.join("|"));
    }
  }
});
