//main js file

//the data model is a bit of a separate component
var aucteraden = {};

aucteraden.Card = function(data) {
	this.rank = m.prop(data.rank);
	this.suits = m.prop(data.suits);
	this.name = m.prop(data.name);
	this.image = m.prop(data.image);
};

aucteraden.Rules = function() {
	return m("div", {className: "rules"}, [
		m("ol", [
			m("li", "Buy a card from the market."),
			m("li", "Play to the tableau."),
			m("li", "The market refills."),
			m("li", "Game over?")
		])
	]);
};

aucteraden.Deck = function() {
	deck = [];
	deck.push(makeCard('Ace', ['Knots'], 'Ace of Knots', '1_ace_knots.png',1));
	deck.push(makeCard('Ace', ['Leaves'], 'Ace of Leaves', '1_ace_leaves.png',1));
	deck.push(makeCard('Ace', ['Moons'], 'Ace of Moons', '1_ace_moons.png',1));
	deck.push(makeCard('Ace', ['Suns'], 'Ace of Suns', '1_ace_suns.png',1));
	deck.push(makeCard('Ace', ['Waves'], 'Ace of Waves', '1_ace_waves.png',1));
	deck.push(makeCard('Ace', ['Wyrms'], 'Ace of Wyrms', '1_ace_wyrms.png',1));
	deck.push(makeCard('2', ['Moons', 'Knots'], 'the AUTHOR', '2_author.png',2));
	deck.push(makeCard('2', ['Suns', 'Wyrms'], 'the DESERT', '2_desert.png',2));
	deck.push(makeCard('2', ['Waves', 'Leaves'], 'the ORIGIN', '2_origin.png',2));
	deck.push(makeCard('3', ['Moons', 'Waves'], 'the JOURNEY', '3_journey.png',3));
	deck.push(makeCard('3', ['Suns', 'Knots'], 'the PAINTER', '3_painter.png',3));
	deck.push(makeCard('3', ['Leaves', 'Wyrms'], 'the SAVAGE', '3_savage.png',3));
	deck.push(makeCard('4', ['Wyrms', 'Knots'], 'the BATTLE', '4_battle.png',4));
	deck.push(makeCard('4', ['Moons', 'Suns'], 'the MOUNTAIN', '4_mountain.png',4));
	deck.push(makeCard('4', ['Waves', 'Leaves'], 'the SAILOR', '4_sailor.png',4));
	deck.push(makeCard('5', ['Suns', 'Waves'], 'the DISCOVERY', '5_discovery.png',5));
	deck.push(makeCard('5', ['Moons', 'Leaves'], 'the FOREST', '5_forest.png',5));
	deck.push(makeCard('5', ['Wyrms', 'Knots'], 'the SOLDIER', '5_soldier.png',5));
	deck.push(makeCard('6', ['Moons', 'Waves'], 'the LUNATIC', '6_lunactic.png',6));
	deck.push(makeCard('6', ['Leaves', 'Knots'], 'the MARKET', '6_market.png',6));
	deck.push(makeCard('6', ['Suns', 'Wyrms'], 'the PENITENT', '6_penitent.png',6));
	deck.push(makeCard('7', ['Suns', 'Knots'], 'the CASTLE', '7_castle.png',7));
	deck.push(makeCard('7', ['Waves', 'Wyrms'], 'the CAVE', '7_cave.png',7));
	deck.push(makeCard('7', ['Moons', 'Leaves'], 'the CHANCE MEETING', '7_chance_meeting.png',7));
	deck.push(makeCard('8', ['Wyrms', 'Knots'], 'the BETRAYAL', '8_betrayal.png',8));
	deck.push(makeCard('8', ['Moons', 'Suns'], 'the DIPLOMAT', '8_diplomat.png',8));
	deck.push(makeCard('8', ['Waves', 'Leaves'], 'the MILL', '8_mill.png',8));
	deck.push(makeCard('9', ['Waves', 'Wyrms'], 'the DARKNESS', '9_darkness.png',9));
	deck.push(makeCard('9', ['Leaves', 'Knots'], 'the MERCHANT', '9_merchant.png',9));
	deck.push(makeCard('9', ['Moons', 'Suns'], 'the PACT', '9_pact.png',9));
	if (m.route.param("extended") == "extended") {
		deck.push(makeCard('PAWN', ['Waves', 'Leaves', 'Wyrms'], 'the BORDERLAND', 'pawn_borderland.png',10));
		deck.push(makeCard('PAWN', ['Moons', 'Suns', 'Leaves'], 'the HARVEST', 'pawn_harvest.png',10));
		deck.push(makeCard('PAWN', ['Suns', 'Waves', 'Knots'], 'the LIGHT KEEPER', 'pawn_light_keeper.png',10));
		deck.push(makeCard('PAWN', ['Moons', 'Wyrms', 'Knots'], 'the WATCHMAN', 'pawn_watchman.png',10));
		deck.push(makeCard('COURT', ['Moons', 'Waves', 'Knots'], 'the CONSUL', '11_court_consul.png',11));
		deck.push(makeCard('COURT', ['Suns', 'Waves', 'Wyrms'], 'the ISLAND', '11_court_island.png',11));
		deck.push(makeCard('COURT', ['Moons', 'Leaves', 'Wyrms'], 'the RITE', '11_court_rite.png',11));
		deck.push(makeCard('COURT', ['Suns', 'Leaves', 'Knots'], 'the WINDOW', '11_court_window.png',11));
	}
	deck.push(makeCard('CROWN', ['Knots'], 'the WINDFALL', 'crown_knots.png',12));
	deck.push(makeCard('CROWN', ['Leaves'], 'the END', 'crown_leaves.png',12));
	deck.push(makeCard('CROWN', ['Moons'], 'the HUNTRESS', 'crown_moons.png',12));
	deck.push(makeCard('CROWN', ['Suns'], 'the BARD', 'crown_suns.png',12));
	deck.push(makeCard('CROWN', ['Waves'], 'the SEA', 'crown_waves.png',12));
	deck.push(makeCard('CROWN', ['Wyrms'], 'the CALAMITY', 'crown_wyrms.png',12));
	if (m.route.param("extended") != "base" ) {
		deck.push(makeCard('', [], 'the EXCUSE', 'excuse.png', 0));
	}
	return deck;
	
	function makeCard(rank, suits, name, image, value) {
		return new aucteraden.Card({
			rank: rank,
			suits: suits,
			name: name,
			image: image,
			value: value
		});
	};
};

aucteraden.shuffle = function(deck) {
	var shuffled = [];
	while(deck.length > 0) {
		pos = Math.floor(Math.random() * deck.length);
		taken = deck.splice(pos,1);
		card = taken[0];
		shuffled.push(taken[0]);
	}
	
	return shuffled;
};

aucteraden.drawMarket = function(game) {
	switch (game.marketType) {
	case "normal":
		game = aucteraden.drawNormal(game);
		break;
		
	case "rolling":
		game = aucteraden.drawRolling(game);
		break;
	}
	return game;
};

aucteraden.Game = function() {
	var game = {
		deck: aucteraden.shuffle(aucteraden.Deck()),
		waste: [],
		tableau: [],
		foundation: [[],[],[]],
		reserve: [[],[],[]],
		market: [],
		marketType: m.route.param("market"),
		message: ""
	};
	game = aucteraden.drawMarket(game);
	return game;
};

aucteraden.nextFoundation = function(rankCard, foundation) {
	//Determine what the next foundation for that rank should be.
	var rank = rankCard.rank();
	var ranks = [0,0,0].map(function(initialVal,idx) {
		return foundation[idx].reduce(function(acc,cardObj) {
			return (cardObj.rank() == rank) ? acc + 1 : acc;
		}, initialVal);
	});
	if (ranks[0] > ranks[1])
		return 1;
	else if (ranks[1] > ranks[2])
		return 2;
	else
		return 0;
};

aucteraden.findOne = function (haystack, arr) {
	//boolean helper function from SO for suit comparison
	return arr.some(function (v) {
		return haystack.indexOf(v) >= 0;
	});
};

aucteraden.suitChecker = function(suitCard, row, aceReserve) {
	//Degenerate case (adding to an empty foundation).
	var aces = m.route.param("market") == "aces";
	if (!aces && row.length == 0)
		return true;
	//Normal case.
	var cardSuits = suitCard.suits();
	var rowSuits = (aces ? aceReserve.map(function(cardObj,idx) { return cardObj.suits()[0]; }, []) : row[row.length - 1].suits());
	return aucteraden.findOne(cardSuits, rowSuits);
};

//row template
aucteraden.rows = function(cardArray, classStub, shift) {
	return m("div", {className: classStub + "Wrapper"},
	         [0,1,2].map(function(val,idx) {
		         return m("div", {className: classStub}, [
			         m("img", {className: "card", src: "cards/blank.png"}),
			         cardArray[val].map(function(card,index) {
				         return m("img", {className: "card", src: "cards/" + card.image(), style: shift ? "left: " + index * 20 + "px": ""});
			         })
		         ]);
	         }));
};

aucteraden.drawNormal = function(game) {
	if (game.market.length < 3) {
		//We shouldn't be here if it isn't, but who knows.
	}

	while (game.market.length < 3) {
		var drawn = game.deck.pop();
		if (drawn.name() == 'the EXCUSE') {
			game.waste = game.waste.concat(game.market);
			game.waste.push(drawn);
			game.market = [];
		} else 
			game.market.push(drawn);
	}
	return game;
};

aucteraden.drawRolling = function(game) {
	[0,1,2].map(function(val,idx) {
		[0,1,2].map(function(val2,idx2) {
			game.market[val].push(game.deck.pop());
		});
	});
	return game;
};

aucteraden.draw = function(game) {
	if (game.deck.length > 0) {
		game.waste.push(game.deck.pop());
		game.message = "";
	} else {
		game.message = "Dealt last card.";
	}
	return game;
};

aucteraden.turn = function(game) {
	game = aucteraden.drawMarket(game);
	if (game.deck.length == 0) 
		game.message += " No more cards.";
	return game;
}

aucteraden.play = function(game) {
	//Play a card from the waste or reserve(s) to the appropriate foundation row.
	if (game.waste.length > 0) {
		var playCard = game.waste[game.waste.length - 1];
		var found = aucteraden.nextFoundation(playCard,game.foundation);
		var playRow = game.foundation[found];
		var aceReserve = game.reserve[found];
		if (aucteraden.suitChecker(playCard,playRow,aceReserve)) {
			game.foundation[found].push(game.waste.pop());
			game.message = "Played " + playCard.name() + " to row " + (found + 1) + ".";
			game = aucteraden.won(game);
		} else
			game.message = "Suits do not match row " + (found + 1) + ".";
	}
	return game;
};

aucteraden.playReserve = function(game,row) {
	//Play a card from the waste or reserve(s) to the appropriate foundation row.
	if (game.reserve[row].length > 0) {
		var playCard = game.reserve[row][game.reserve[row].length - 1];
		var found = aucteraden.nextFoundation(playCard,game.foundation);
		var playRow = game.foundation[found];
		if (aucteraden.suitChecker(playCard,playRow)) {
			game.foundation[found].push(game.reserve[row].pop());
			game.message = "Played " + playCard.name() + " to row " + (found + 1) + ".";
			game = aucteraden.won(game);
		} else
			game.message = "Suits do not match row " + (found + 1) + ".";
	}
	return game;
};

aucteraden.won = function(game) {
	//Evaluate the game state for a victory.
	var victory;
	if (game.waste.length > 0 || game.deck.length > 0 )
		victory = false;
	else if (game.marketType == "reserve" && (game.reserve[2].length > 0 || game.reserve[1].length > 0 || game.reserve[0].length > 0))
		victory = false;
	else
		victory = true;
	if (victory)
		game.message = "Victory!";
	return game;
}

//modal module
var modal = {
	visible: m.prop(false),
	view: function(body) {
		return modal.visible() ? m("div.modal", body()) : "";
	}
};

//The variants module.
var variants = {};

variants.Version = function(data) {
	this.type = m.prop(data.type);
	this.title = m.prop(data.title);
	this.description = m.prop(data.description);
	this.rules = m.prop(data.rules);
};

variants.VersionList = function() {
	var list = [];
	list.push(makeVersion("normal", "Normal market", "The usual market rules.", "market cards are only checked against the first drawn card."));
	list.push(makeVersion("rolling", "Rolling market", "A volatile market variant.", "market cards are checked on all draws."));
	return list;

	function makeVersion(type, title, description, rules) {
		return new variants.Version({
			type: type,
			title: title,
			description: description,
			rules: m("div", [
				m("h2", "Turn Order"),
				aucteraden.Rules(),
				m("p", " For this version (" + title + "), " + rules),
				m("button[type=button]", {onclick: modal.visible.bind(this, false)}, "Close")
			])
		});
	}
};

variants.Extended = function(data) {
	this.type = m.prop(data.type);
	this.title = m.prop(data.title);
	this.description = m.prop(data.description);
};

variants.ExtendedDeck = function() {
	var list = [];
	list.push(makeExtended("base","Base deck","Don't use the extended deck."));
	list.push(makeExtended("excuse","Base + Excuse","Include the Excuse from the extended deck."));
	list.push(makeExtended("extended","Extended deck","Include all cards from the extended deck."));
	return list;
	
	function makeExtended(type, title, description) {
		return new variants.Extended({
			type: type,
			title: title,
			description: description
		});
	}	
};

//controller
variants.controller = function() {

	this.game = aucteraden.Game();
	this.versions = variants.VersionList();
	this.extended = variants.ExtendedDeck();
	
	this.reset = function() {
		this.game = aucteraden.Game();
	};
	
	this.turn = function() {
		this.game = aucteraden.turn(this.game);
	};

	this.play = function() {
		this.game = aucteraden.play(this.game);
	};

	this.playReserve = function(row) {
		this.game = aucteraden.playReserve(this.game,row);
	};

};

//view

variants.view = function(ctrl) {

	return m("div", {className: "bodyWrapper"}, [
		m("main", [
			m("div", {className: "leftColumn"}, [
				m("header", [
					m("h1", "Aucteraden"),
					m("p", {className: "description"}, "a solitaire card game for the Decktet by Jack Neal")
				]),
				m("div", {className: "buttonWrapper"}, [
					m("button[type=button]", {onclick: ctrl.reset.bind(ctrl)}, "Restart"),
					m("button[type=button]", {onclick: modal.visible.bind(ctrl, true)}, "Rules")
				]),
				m("div", {className: "versionWrapper"}, [
					m("div", {className: "nowrapp"}, [
						m("b", "Version: "),
						m('select', { onchange : function() { m.route(this.value + "/" + m.route.param("extended")); }}, [
							ctrl.versions.map(function(v, i) {
								if (v.type() == m.route.param("market"))
									return m('option', { value: v.type(), innerHTML: v.title(), selected: "selected" });
								else
									return m('option', { value: v.type(), innerHTML: v.title() });
							})
						])
					]),
					m("div", {className: "nowrapp"}, [
						m("b", "Deck: "),
						m('select', { onchange : function() {m.route(m.route.param("market") + "/" + this.value); }}, [
							ctrl.extended.map(function(e, i) {
								if (e.type() == m.route.param("extended"))
									return m('option', { value: e.type(), innerHTML: e.title(), selected: "selected" });
								else
									return m('option', { value: e.type(), innerHTML: e.title() });
							})
						])
					])
				]),
				m("div", {className: "roundWrapper"}, [
					m("div", {className: "message"}, ctrl.game.message)
				]),
				// Stock and waste.
				m("div", {className: "deckWrapper"}, [
					m("div", {className: "stock"}, [
						m("h4","Stock (" + ctrl.game.deck.length + ")"),
						m("img", {onclick: (ctrl.game.deck.length > 0 ? ctrl.turn.bind(ctrl) : ctrl.redeal.bind(ctrl)), className: "card", src: "cards/" + (ctrl.game.deck.length > 0 ? "back.png" : "blank.png")})
					]),
					m("div", {className: "waste"}, [
						m("h4","Waste (" + ctrl.game.waste.length + ")"),
						m("img", {className: "card", src: "cards/" + (ctrl.game.waste.length > 0 ? ctrl.game.waste[ctrl.game.waste.length - 1].image() : "blank.png"), onclick: ctrl.play.bind(ctrl)})
					])
				]),
				// Market.
				m("div", {className: "marketWrapper"}, [
					[2,1,0].map(function(row) {
						return m("div", {className: "stock"}, [
							m("h4", (row == 0 ? "Free" : row + " Token" + (row == 2 ? "s" : ""))),
							m("img", {className: "card", src: "cards/" + (ctrl.game.market[row] ? ctrl.game.market[row].image() : "blank.png"), onclick: ctrl.play.bind(ctrl)})
						]);
					})
				])
			]),

			// Reserve
			m("div", {className:  "reserveWrapper"},
	      [0,1,2].map(function(row,idx) {
		      return m("div", {className: "reserve"}, [
			      m("img", {className: "card", src: "cards/blank.png"}),
			      ctrl.game.reserve[row].map(function(card,index) {
				      return m("img", {className: "card", src: "cards/" + (m.route.param("market") == "reserve" && (row + 1 >= ctrl.game.round) ? "back.png" : card.image()), style: m.route.param("market") == "aces" ? "left: " + index * 20 + "px": "", onclick: (m.route.param("market") == "reserve" && (row + 1 < ctrl.game.round) ? ctrl.playReserve.bind(ctrl,row) : "" )});
			      })
		      ]);
	      })
			 ),
			
			// Foundation
			aucteraden.rows(ctrl.game.foundation, "foundation", true)
		]),
		modal.view(function() {
			return m("div", ctrl.versions.filter(function(v) {return v.type() == m.route.param("market"); })[0].rules());
		})
	]);
};

//setup routes to start w/ the `#` symbol
m.route.mode = "hash";

//define the routes
m.route(document.body, "normal/base", {
	":market/:extended": variants
});
