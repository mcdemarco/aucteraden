//main js file
'use strict';

//the data model is a bit of a separate component
var aucteraden = {};

aucteraden.Card = function(data) {
	this.rank = m.prop(data.rank);
	this.suits = m.prop(data.suits);
	this.name = m.prop(data.name);
	this.image = m.prop(data.image);
};

aucteraden.Deck = function() {
	var deck = [];
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

aucteraden.Game = function() {
	var game = {
		deck: aucteraden.shuffle(aucteraden.Deck()),
		waste: [],
		tableau: [],
		foundation: [],
		reserve: [[],[],[],[]],
		market: [],
		marketType: m.route.param("market"),
		message: "",
		over: false,
		splayed: false,
		discards: 0,
		tokens: [4,4,4,4,4,4]
	};
	game = aucteraden.drawMarket(game,true);
	return game;
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

/* deck functions */

aucteraden.shuffle = function(deck) {
	var shuffled = [];
	while(deck.length > 0) {
		var pos = Math.floor(Math.random() * deck.length);
		var taken = deck.splice(pos,1);
		shuffled.push(taken[0]);
	}
	
	return shuffled;
};

/* suit and price checking */

aucteraden.findOne = function (haystack, arr) {
	//boolean helper function from SO for suit comparison
	return arr.some(function (v) {
		return haystack.indexOf(v) >= 0;
	});
};

aucteraden.priceChecker = function(suitCard, price) {
	//Can you afford it?
	//var cardSuits = suitCard.suits();
	//console.log(suitCard);
	return true;
};

aucteraden.rankChecker = function(suitCard, row, aceReserve) {
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
aucteraden.rows = function(cardArray) {
	return m("div", {className: "foundationWrapper"},
	         cardArray.map(function(subArray,idx) {
		         return m("div", {className: "foundation"}, [
			         subArray.map(function(card,index) {
				         return m("img", {className: "card", src: "cards/" + card.image(), style: "left: 1em"});
			         })
		         ]);
	         }));
};

/* market refill is complicated */

aucteraden.clearMarket = function(game) {
	game.waste = game.waste.concat(game.market);
	game.market = [];
	game = aucteraden.drawInitial(game);
	return game;
};

aucteraden.discardMarket = function(game) {
	//Like the Excuse refresh, but we need to log it for scoring.
	game = aucteraden.clearMarket(game);
	game.discards++;
	return game;
};

aucteraden.drawExcuse = function(game) {
	//Should be checked by the caller but no harm in rechecking.
	if (game.deck[game.deck.length-1].name() == 'the EXCUSE') {
		var drawn = game.deck.pop();
		game.message = "Drew the EXCUSE and cleared the market.";
		console.log("Drew the EXCUSE and cleared the market.");
		console.log(game.market.reduce(function(acc,cardObj){return acc + " " + cardObj.name();},"Market was: "));
		game.waste.push(drawn);
		game = aucteraden.clearMarket(game);
	}
	return game;
};

aucteraden.drawInitial = function(game) {
	//Draw all three cards without suit checking.
	//May still be an excuse, and may not actually be the initial draw.
	game = aucteraden.drawSimpleOnce(game);
	game = aucteraden.drawSimpleOnce(game);
	game = aucteraden.drawSimpleOnce(game);
	return game;
};

aucteraden.drawMarket = function(game,initial) {
	game.message = "";
	console.log("Drawing the market.");
	if (initial) {
		game = aucteraden.drawInitial(game);
	} else {
		switch (game.marketType) {
			case "normal":
			//We need 
			game = aucteraden.drawRollingOnce(game);
			game = aucteraden.drawSimpleOnce(game);
			game = aucteraden.drawSimpleOnce(game);
			break;
		
			case "rolling":
			game = aucteraden.drawRollingRecursive(game);
			break;
		}
		game = aucteraden.done(game);
	}
	return game;
};

aucteraden.drawSimpleOnce = function(game) {
	//A market draw with no suit checking.
	if (game.market.length < 3 && game.deck.length > 0) {
		if (game.deck[game.deck.length-1].name() == 'the EXCUSE')
			game = aucteraden.drawExcuse(game);
		else {
			var drawn = game.deck.pop();
			game.market.push(drawn);
			game.message = "Drew " + drawn.name() + ". ";
			console.log("Drew " + drawn.name() + ".");
		}
	}
	return game;
};

aucteraden.drawRollingOnce = function(game) {
	//A market draw that can discard other market cards based on suits.
	if (game.market.length < 3 && game.deck.length > 0) {
		if (game.deck[game.deck.length-1].name() == 'the EXCUSE') {
			game = aucteraden.drawExcuse(game);
		} else {
			var drawn = game.deck.pop();
			game.message = "Drew " + drawn.name() + ". ";
			console.log("Drew " + drawn.name() + " (rolling once).");
			var suits = drawn.suits();
			//Suit nuking removes matching cards from the market.
			for (var idx = game.market.length; idx > 0; idx--) {
				var cardObj = game.market[idx-1];
				if (cardObj.hasOwnProperty("suits") && aucteraden.findOne(cardObj.suits(),suits)) {
					console.log("Discarded " + cardObj.name() + ".");
					game.waste.push(game.market.splice(idx-1,1)[0]);
				};
			};
			game.market.push(drawn);
		}
	}
	return game;
};

aucteraden.drawRollingRecursive = function(game) {
	while (game.market.length < 3 && game.deck.length > 0) {
		console.log("roll in");
		game = aucteraden.drawRollingOnce(game);
		console.log("roll out");
	}
	return game;
};

/* acquisitions */

aucteraden.buy = function(game,price) {
	//Buy a card from the market.
	if (game.over)
		return game;

	var playCard = game.market[price];
	console.log("Trying to buy " + playCard.name() + ".");

	if (aucteraden.priceChecker(playCard,price)) {
		game.foundation.push(game.market.splice(price,1));
		console.log("Played " + playCard.name() + " to tableau.");
		game = aucteraden.drawMarket(game);
	} else
		game.message = "You cannot afford that card.";
	return game;
};

aucteraden.play = function(game) {
	//Play the purchased card to the foundation.
	//game.message = "Played " + playCard.name() + " to row " + (found + 1) + ".";
	game = aucteraden.done(game);
	return game;
};

/* endgame */

aucteraden.done = function(game) {
	//Evaluate the game state for a victory.
	var gameOver;
	if (game.market.length == 0)
		gameOver = true;
	else if (game.foundation.reduce(function(acc, cur) {return acc + cur.length;},0) == 16)
		gameOver = true;
	else
		gameOver = false;
	if (gameOver) {
		game.message = "Game over!";
		game.over = gameOver;
	}
	return game;
};

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
	
	this.discard = function() {
		this.game = aucteraden.discardMarket();
	};
	
	this.buy = function(row) {
		this.game = aucteraden.buy(this.game,row);
	};

	this.play = function() {
		this.game = aucteraden.play(this.game);
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
						m("img", {className: "card", src: "cards/" + (ctrl.game.deck.length > 0 ? "back.png" : "blank.png")})
					]),
					m("div", {className: "waste"}, [
						m("h4","Waste (" + ctrl.game.waste.length + ")"),
						m("img", {className: "card", src: "cards/blank.png"}),
						ctrl.game.waste.map(function(cardObj,index) {
							return m("img", {className: "card", src: "cards/" + cardObj.image(), onclick: function() {ctrl.game.splayed = !ctrl.game.splayed;}, style: "left: " + (ctrl.game.splayed ? index * 20 : 0) + "px"});
						})
					])
				]),
				// Market.
				m("div", {className: "marketWrapper"}, [
					[2,1,0].map(function(row) {
						return m("div", {className: "stock"}, [
							m("h4", (row == 0 ? "Free" : row + " Token" + (row == 2 ? "s" : ""))),
							m("img", {className: "card", src: "cards/" + (ctrl.game.market[row] ? ctrl.game.market[row].image() : "blank.png"), onclick: ctrl.buy.bind(ctrl,row)})
						]);
					})
				])
			]),

			// Foundation
			aucteraden.rows(ctrl.game.foundation)
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
