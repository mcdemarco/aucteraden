const state =  {		
	extended: false
};

const mutations = {
	extend (state) {
		state.extended = !state.extended;
	}
};

const actions = {
	toggleExtendedDeck({commit}) {
		commit('extend');
	}
};

const getters = {
	extended: function(state) {return state.extended;}
};

var settings = {
	state: state,
	mutations: mutations,
	actions: actions,
	getters: getters
};
