"use strict";

Vue.component(
  'list', {
    template: '\
    <li class="collection-item avatar">\
      <i class="material-icons circle">folder</i>\
      <span class="title">{{ meme.name }}</span>\
      <p>{{ meme.date }}<br>{{ meme.caption }}</p>\
      <a href="#!" class="secondary-content" v-on:click="$emit(\'remove\')"><i class="material-icons">delete_forever</i></a>\
    </li>',
    props: ['meme']
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
      .then(response => {
		  this.meme_list = response.data;
	  })
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
