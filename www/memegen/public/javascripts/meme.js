"use strict";

Vue.component(
  'list', {
    template: '\
      <li class="collection-item">\
        <div class="row valign-wrapper">\
          <div class="col s10">{{ name }}</div>\
		  <div class="col s2 secondary-content">\
            <a v-on:click="$emit(\'remove\')" class="btn-flat waves-effect waves-purple red">Remove\
              <i class="material-icons left">remove_circle</i>\
		    </a>\
		  </div>\
        </div>\
      </li>\
    ',
    props: ['name']
})

var vm = new Vue({
  el: '#app',

  data: {
    meme_list: [],
	loading: true,
	errored: false
  },

  mounted() {
    axios
      .get('/meme/list')
      .then(response => {this.meme_list = response.data})
      .catch(error => {
		  console.log(error);
		  this.errored = true;
	  })
      .finally(() => this.loading = false);
  },

  methods: {
    removeMeme(index) {
      axios
        .get('/meme/' + this.meme_list[index]._id + '/delete')
        .then(response => this.meme_list.splice(index, 1))
        .catch(error => {
			console.log(error);
		});
    }
  }
});
