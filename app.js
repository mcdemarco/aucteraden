Vue.use(Vuex);

var store = new Vuex.Store({
	state: {
		extended: false
	},
	mutations: {
		extend (state) {
			state.extended = !state.extended;
		}
	}
});


var app = new Vue({
  el: '#app',
	store,
	data: {
				crown: '',
				detail: {setup: false, buy: false, refill: false, play: false, end: false, score: false},
				suits: [{name: 'moons', length: 0, ace: false, crown: false, unspent: false},
								{name: 'suns', length: 0, ace: false, crown: false, unspent: false},
								{name: 'waves', length: 0, ace: false, crown: false, unspent: false},
								{name: 'leaves', length: 0, ace: false, crown: false, unspent: false},
								{name: 'wyrms', length: 0, ace: false, crown: false, unspent: false},
								{name: 'knots', length: 0, ace: false, crown: false, unspent: false}],
				discards: 0,
				unfilled: 0,
				scoreChart: [{count: 0, vp: -5},
										 {count: 1, vp: -5},
										 {count: 2, vp: 2},
										 {count: 3, vp: 5},
										 {count: 4, vp: 9},
										 {count: 5, vp: 14},
										 {count: 6, vp: 20},
										 {count: 7, vp: 30},
										 {count: 8, vp: 30},
										 {count: 9, vp: 30},
										 {count: 10, vp: 30},
										 {count: 11, vp: 30}]
  },
	computed: {
		extended: function () {
			return store.state.extended;
		},
				acbTotal: function () {
					var total = 0;
					Object.entries(this.suits).forEach(([key, val]) => {
						total += val.ace ? 1 : 0;
						total += val.crown ? 2 : 0;
						total += (val.ace && val.crown) ? 1 : 0;
					});
					return total;
				},
				suitTotal: function () {
					var total = [];
					var scoreList = [-5,-5,2,5,9,14,20,30,30,30,30,30];
					Object.entries(this.suits).forEach(([key, val]) => {
						total.push(val.length); // the value of the current key.
					});
					return total.reduce(function(acc, count) {
						return acc + scoreList[count];
					});
				},
				unspentTotal: function () {
					var total = [];
					Object.entries(this.suits).forEach(([key, val]) => {
						total.push(val.unspent ? -5 : 0); // the value of the current key.
					});
					return total.reduce(function(acc, pen) {
						return acc + pen;
					});
				},
				discardTotal: function () {
					return this.discards * -3;
				},
				unfilledTotal: function () {
					return this.unfilled * -5;
				},
				total: function () {
					return this.acbTotal + this.suitTotal + this.unspentTotal + this.unfilledTotal + this.discardTotal;
				}
			},
			methods: {
				extend: function(e) {this.$store.commit('extend');}, 
				getSuitName: function(idx) {return this.suits[idx-1].name;},
				rando: function(intr) {return Math.floor(Math.random() * intr + 1);}
			}
});
