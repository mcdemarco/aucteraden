//main js file
'use strict';

//the data model is a bit of a separate component
var aucteraden = {};

aucteraden.Card = function(data) {
	this.rank = m.prop(data.rank);
	this.suits = m.prop(data.suits);
	this.name = m.prop(data.name);
	this.image = m.prop(data.image);
	this.value = m.prop(data.value);
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
		deck.push(makeCard('PAWN', ['Waves', 'Leaves', 'Wyrms'], 'the BORDERLAND', 'pawn_borderland.png',0));
		deck.push(makeCard('PAWN', ['Moons', 'Suns', 'Leaves'], 'the HARVEST', 'pawn_harvest.png',0));
		deck.push(makeCard('PAWN', ['Suns', 'Waves', 'Knots'], 'the LIGHT KEEPER', 'pawn_light_keeper.png',0));
		deck.push(makeCard('PAWN', ['Moons', 'Wyrms', 'Knots'], 'the WATCHMAN', 'pawn_watchman.png',0));
		deck.push(makeCard('COURT', ['Moons', 'Waves', 'Knots'], 'the CONSUL', '11_court_consul.png',0));
		deck.push(makeCard('COURT', ['Suns', 'Waves', 'Wyrms'], 'the ISLAND', '11_court_island.png',0));
		deck.push(makeCard('COURT', ['Moons', 'Leaves', 'Wyrms'], 'the RITE', '11_court_rite.png',0));
		deck.push(makeCard('COURT', ['Suns', 'Leaves', 'Knots'], 'the WINDOW', '11_court_window.png',0));
	}
	deck.push(makeCard('CROWN', ['Knots'], 'the WINDFALL', 'crown_knots.png',10));
	deck.push(makeCard('CROWN', ['Leaves'], 'the END', 'crown_leaves.png',10));
	deck.push(makeCard('CROWN', ['Moons'], 'the HUNTRESS', 'crown_moons.png',10));
	deck.push(makeCard('CROWN', ['Suns'], 'the BARD', 'crown_suns.png',10));
	deck.push(makeCard('CROWN', ['Waves'], 'the SEA', 'crown_waves.png',10));
	deck.push(makeCard('CROWN', ['Wyrms'], 'the CALAMITY', 'crown_wyrms.png',10));
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
		play: aucteraden.makeBlank(),
		foundation: aucteraden.makeFoundation(),
		market: [],
		marketType: m.route.param("market"),
		message: "",
		over: false,
		score: {total: 0, badTokenPenalty: -30, suit: {Moons: -5, Suns: -5, Knots: -5, Waves: -5, Leaves: -5, Wyrms: -5, total: -30}},
		splayed: false,
		unpaid:  {suits: [], price: 0},
		discards: 0,
		tokens: {Moons: 4, Suns: 4, Knots: 4, Waves: 4, Leaves: 4, Wyrms: 4}
	};
	game = aucteraden.score(game);
	game = aucteraden.drawMarket(game);
	return game;
};

aucteraden.Rules = function() {
	return m("div", [
		m("ol", [
			m("li", "Buy a card from the market by clicking on it.  When you have a choice of payment, the options will be highlighted; click one to pay.  If you cannot afford, can't place, or don't like the market cards, click Discard Market to draw more."),
			m("li", "Play your purchased card by clicking on an empty tableau spot.  Use the + buttons to shift the tableau if necessary.  Aces and Crowns may not be adjacent, nor may Pawns and Courts."),
			m("li", "The market refills automatically.  Some cards may be discarded when refilling; click on the Waste pile to see all discards."),
			m("li", "When the tableau is full or the Market is empty, the game is over.")
		])
	]);
};

aucteraden.Scoring = function() {
	return m("div", [
		m("ul", [
			m("li", "The longest run in each suit is scored on a sliding scale from -5VP for fewer than 2 cards to 30VP for 7 or more cards."),
			m("li", "You get bonus points for having the Ace (1VP), Crown (2VP) or both (4VP) in a run."),
			m("li", "You are penalized 3VP each time you discard the market."),
			m("li", "You are penalized 5VP for every hole remaining in your tableau."),
			m("li", "You are penalized 5VP for each unspent or fully spent token suit.")
		]),
		m("p", ["A score of 40 is a win, while 50 is a commanding win.	 For more detailed rules, see ", 
			m("a", {href: "./"}, "the scoresheet"),
			"."
		])
	]);
};

/* debug */

aucteraden.debug = function(msg) {
	//comment out this line to turn off debugging.
	//if (console) console.log(msg);
	return;
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

aucteraden.isBlank = function(card) {
	return card.name() == "blank";
};

aucteraden.makeBlank = function() {
	return new aucteraden.Card({
		rank: "BLANK",
		suits: [],
		name: "blank",
		image: "blank.png"
	});
};

aucteraden.makeFoundation = function() {
	return [0,1,2,3].map(function(idx) {
		return [0,1,2,3].map(function(jdx) {
			return aucteraden.makeBlank();
		});
	});
};

aucteraden.shiftFoundation = function(game,direction) {
	var sayNo = "..can't expand in that direction.";
	game.message = "Shifting tableau.";
	aucteraden.debug("Shift " + direction);
	switch(direction) {

		case "top":
		//If the last row is blanks, we can move it to the first row.
		if (game.foundation[3].reduce(function(acc,card) {return (acc && aucteraden.isBlank(card));}, true))
			game.foundation.unshift(game.foundation.pop());
		else
			game.message += sayNo;
		break;

		case "bottom":
		//If the top row is blanks, we can move it to the last row.
		if (game.foundation[0].reduce(function(acc,card) {return (acc && aucteraden.isBlank(card));}, true))
			game.foundation.push(game.foundation.shift());
		else
			game.message += sayNo;
		break;

		case "left":
		//If every last card is blank, we can move them all to first place.
		if (game.foundation.reduce(function(acc,subarray) {return (acc && aucteraden.isBlank(subarray[3]));}, true))
			game.foundation.forEach(function(subarray,idx) {
				game.foundation[idx].unshift(game.foundation[idx].pop());
			});
		else
			game.message += sayNo;
		break;

		case "right":
		//If every first card is blank, we can move them all to last place.
		if (game.foundation.reduce(function(acc,subarray) {return (acc && aucteraden.isBlank(subarray[0]));}, true))
			game.foundation.forEach(function(subarray,idx) {
				game.foundation[idx].push(game.foundation[idx].shift());
			});
		else
			game.message += sayNo;
		break;
	};

	return game;
};

aucteraden.ranksCanNeighbor = function(rank1,rank2) {
	//If either is not a special card, they can neighbor.
	if (["Ace","CROWN","PAWN","COURT"].indexOf(rank1) < 0)
		return true;
	else if (["Ace","CROWN","PAWN","COURT"].indexOf(rank2) < 0)
		return true;
	else if (rank1 == rank2) //Same special card not good.
		return false;
	else if (["PAWN","COURT"].indexOf(rank1) > -1 && ["PAWN","COURT"].indexOf(rank2) > -1)
		return false;
	else if (["Ace","CROWN"].indexOf(rank1) > -1 && ["Ace","CROWN"].indexOf(rank2) > -1)
		return false;
	else
		return true;
};


/* tableau helper functions */

aucteraden.findNeighbors = function(tableau,r,c) {
	//Returns all neighbors, real or blank.
	var neighborArray = [];
	var theCard;
	[-1,1].forEach(function(val) {
		if (r + val >= 0 && r + val <= 3) {
			theCard = tableau[r+val][c];
			neighborArray.push(theCard);
		}
		if (c + val >= 0 && c + val <= 3) {
			theCard = tableau[r][c+val];
			neighborArray.push(theCard);
		}
	});

	return neighborArray;
};

aucteraden.legalNeighbors = function(tableau,r,c,newRank) {
	//Return true if a card of newRank can neighbor everything orthog to the given row,column in tableau.
	//Used in positionChecker to test all positions, and when playing a card to test a single position.

	//For degenerate values of newRank, return true.
	if (["Ace","CROWN","PAWN","COURT"].indexOf(newRank) < 0)
		return true;

	var neighborArray = aucteraden.findNeighbors(tableau,r,c);

	//Accumulates truth until we hit a false.
  var isLegal = neighborArray.reduce(function(acc,neighborCard) {
		var neighborly = aucteraden.ranksCanNeighbor(neighborCard.rank(),newRank);
		return (acc && neighborly);
	},true);
	return isLegal;
};


/* suit and price checking */

aucteraden.findOne = function (haystack, arr) {
	//boolean helper function from SO for suit comparison
	return arr.some(function (v) {
		return haystack.indexOf(v) >= 0;
	});
};

aucteraden.positionChecker = function(tableau, newRank) {
	//Can you play it?  There's at least one blank space, but...

	//If the rank is innocent, just return true.
	if (["Ace","CROWN","PAWN","COURT"].indexOf(newRank) < 0)
		return true;

	//Check each spot in the tableau until we find one that is legal.
	for (var idr = 0; idr < 4; idr++) {
		for (var idc = 0; idc < 4; idc++) {
			var candidateSpot = tableau[idr][idc];
			if (aucteraden.isBlank(candidateSpot) && aucteraden.legalNeighbors(tableau,idr,idc,newRank))
				return true;
		};
	};

	//Didn't find a legal placement.
	return false;
};

aucteraden.priceChecker = function(tokens, suitCard, price) {
	//Can you afford it?
	var cardSuits = suitCard.suits();
	if (suitCard.rank() == "PAWN" || suitCard.rank() == "COURT")
		price++;
	if (price == 0)
		return true;
	for (var s = 0; s < cardSuits.length; s++) {
		if (tokens[cardSuits[s]] >= price)
			return true;
	}
	return false;
};

aucteraden.rankChecker = function(suitCard, row) {
	//Degenerate case (adding to an empty foundation).
	var aces = m.route.param("market") == "aces";
	if (!aces && row.length == 0)
		return true;
	//Normal case.
	var cardSuits = suitCard.suits();
	var rowSuits;
	return aucteraden.findOne(cardSuits, rowSuits);
};

//foundation template
aucteraden.viewFoundation = function(ctrl) {
	var tableauArray = ctrl.game.foundation;
	return m("div", {className: "foundationWrapper"}, [
		["right","left","bottom","top"].map(function(dir) {
			return m("button[type=button]", {className: "arrow", style: dir + ":0;", onclick: ctrl.shift.bind(ctrl,dir)}, "+");
		}),
	  tableauArray.map(function(currRowArray,idr) {
			if (currRowArray.length > 0) {
				return m("div", {className: "foundation"}, [
					currRowArray.map(function(card,idc) {
						return m("img", {className: "card", src: "cards/" + card.image(), style: "left: 1em", onclick: aucteraden.isBlank(card) ? ctrl.play.bind(ctrl,idr,idc) : ""});
					})
				]);
			} else {
				//This case no longer occurs.
				return m("div", {className: "foundation"}, [
					m("img", {className: "card", src: "cards/blank.png", style: "left: 1em"})
				]);
			}
	  })
	]);
};



/* market refill is complicated */

aucteraden.clearMarket = function(game) {
	game.waste = game.waste.concat(game.market);
	game.market = [];
	game = aucteraden.drawMarket(game);
	return game;
};

aucteraden.discardMarket = function(game) {
	//Like the Excuse refresh, but we need to log it for scoring.
	if (game.deck.length == 0) {
		game.message = "No more cards to draw.";
	} else {
		game = aucteraden.clearMarket(game);
		game.discards++;
		game = aucteraden.score(game);
	}
	return game;
};

aucteraden.drawExcuse = function(game) {
	//Should be checked by the caller but no harm in rechecking.
	if (game.deck[game.deck.length-1].name() == 'the EXCUSE') {
		var drawn = game.deck.pop();
		game.message = "Drew the EXCUSE and cleared the market.";
		aucteraden.debug("Drew the EXCUSE and cleared the market.");
		aucteraden.debug(game.market.reduce(function(acc,cardObj){return acc + " " + cardObj.name();},"Market was: "));
		game.waste.push(drawn);
		game = aucteraden.clearMarket(game);
	}
	return game;
};

aucteraden.drawMarket = function(game) {
	game.message = "";
	aucteraden.debug("Drawing the market.");
	switch (game.marketType) {
		case "normal":
			//Note that if the market is empty, the first rolling is simple.
			game = aucteraden.drawRollingOnce(game);
			game = aucteraden.drawSimpleOnce(game);
			game = aucteraden.drawSimpleOnce(game);
			break;
		
		case "rolling":
			if (game.market.length == 0) {
				game = aucteraden.drawSimpleOnce(game);
				game = aucteraden.drawSimpleOnce(game);
				game = aucteraden.drawSimpleOnce(game);
			} else {
				game = aucteraden.drawRollingRecursive(game);
			}
			break;

		case "volatile":
			game = aucteraden.drawRollingRecursive(game);
			break;
	}
	game = aucteraden.done(game);
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
			aucteraden.debug("Drew " + drawn.name() + ".");
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
			aucteraden.debug("Drew " + drawn.name() + " (rolling).");
			var suits = drawn.suits();
			//Suit nuking removes matching cards from the market.
			for (var idx = game.market.length; idx > 0; idx--) {
				var cardObj = game.market[idx-1];
				if (cardObj.hasOwnProperty("suits") && aucteraden.findOne(cardObj.suits(),suits)) {
					aucteraden.debug("Discarded " + cardObj.name() + ".");
					game.waste.push(game.market.splice(idx-1,1)[0]);
				};
			};
			game.market.push(drawn);
		}
	}
	return game;
};

aucteraden.drawRollingRecursive = function(game) {
	aucteraden.debug("Begin rolling market draw.");
	while (game.market.length < 3 && game.deck.length > 0) {
		game = aucteraden.drawRollingOnce(game);
	}
	aucteraden.debug("End rolling market draw.");
	return game;
};

/* acquisitions */

aucteraden.buy = function(game,row) {
	//Buy a card from the market.
	if (game.over)
		return game;
	//Buy a card from the market.
	if (game.play.name() != "blank") {
		game.message = "Play previous card first.";
		return game;
	}
	if (game.unpaid.price) {
		game.message = "Pay for previous card first.";
		return game;
	}

	var buyCard = game.market[row];
	aucteraden.debug("Trying to buy " + buyCard.name() + ".");

	if (!aucteraden.priceChecker(game.tokens,buyCard,row)) {
		game.message = "You cannot afford that card.";
	} else if (!aucteraden.positionChecker(game.foundation,buyCard.rank())) {
		game.message = "You cannot play that card.";
	} else {
		game.play = game.market.splice(row,1)[0];
		aucteraden.debug("Buying " + buyCard.name() + ".");
		game.message = ("Buying " + buyCard.name() + ".");
		game = aucteraden.autopay(game,buyCard,row);
	} 
	return game;
};

aucteraden.autopay = function(game,buyCard,row) {
	var cardSuits = buyCard.suits();
	var price = row;
	if (buyCard.rank() == "PAWN" || buyCard.rank() == "COURT")
		price++;
	if (price == 0)
		return game;
	var payableSuits = cardSuits.filter(function(suit) {
		return game.tokens[suit] >= price;
	});
	if (payableSuits.length == 1)
		game.tokens[payableSuits[0]] -= price;
	else 
		game.unpaid = {suits: payableSuits, price: price};
	return game;
};

aucteraden.pay = function(game,suit) {
	//Pay with a particular suit.
	game.tokens[suit] -= game.unpaid.price;
	aucteraden.debug("Paid " + game.unpaid.price + " " + suit + ".");
	game.unpaid.suits = [];
	game.unpaid.price = 0;
	return game;
};

aucteraden.play = function(game,r,c) {
	//Play the purchased card to the foundation.
	if (game.unpaid.price) {
		game.message = "Pay for the card before playing it.";
	} else if (!aucteraden.legalNeighbors(game.foundation,r,c,game.play.rank())) {
		//Neighbor checking explicit position.
		//There is at least one a legal placement for this card, 
		//but no guarantee the user picked it.
		game.message = "That placement is not allowed.";
	} else {
		game.foundation[r][c] = game.play;
		aucteraden.debug("Played " + game.play.name() + " to the tableau.");
		game.message = "Played " + game.play.name() + " to the tableau.";
		game.play = aucteraden.makeBlank();
		//Score here.
		game = aucteraden.score(game);
		game = aucteraden.done(game);
		//Rechecks for doneness.
		game = aucteraden.drawMarket(game);
	}
	return game;
};

/* endgame */

aucteraden.done = function(game) {
	//Evaluate the game state for a victory.
	var gameOver;
	if (game.market.length == 0)
		gameOver = true;
	else if (game.foundation.reduce(function(acc, cur) {
		return acc + cur.reduce(function(ac2,cu2) {
			return ac2 + (aucteraden.isBlank(cu2) ? 0 : 1);},0);
	},0) == 16)
		gameOver = true;
	else
		gameOver = false;
	if (gameOver) {
		game.message = "Game over!";
		game.over = gameOver;
	}
	return game;
};

aucteraden.findSingleCards = function(tableau,suit) {
	var runs = [];
	tableau.forEach(function(row,idr) {
		row.forEach(function(card,idc) {

			if (card.suits().indexOf(suit) > -1) {
				//Only one card in each single card run.
				var scoreArray = [];
				var scorable = {row:idr,column:idc,value:card.value(),rank:card.rank()};
				scoreArray.push(scorable);
				runs.push(scoreArray);
			}
		});
	});
	return runs;
};

aucteraden.expandRuns = function(tableau,runs,suit) {
	var newRuns = [];
	var card;
	runs.forEach(function(runArray,idx) {
		var run = runArray[runArray.length-1];
		var r = run.row;
		var c = run.column;
		var newArray;
		[-1,1].forEach(function(val) {
			if (r + val >= 0 && r + val <= 3) {
				card = tableau[r+val][c];
				if (card.suits().indexOf(suit) > -1 && card.value() > run.value) {
					newArray = runArray.slice();
					newArray.push({row:r+val,column:c,value:card.value(),rank:card.rank()});
				  newRuns.push(newArray);
				}
			}
			if (c + val >= 0 && c + val <= 3) {
				card = tableau[r][c+val];
				if (card.suits().indexOf(suit) > -1 && card.value() > run.value) {
					newArray = runArray.slice();
					newArray.push({row:r,column:c+val,value:card.value(),rank:card.rank()});
					newRuns.push(newArray);
				}
			}
		});
	});
	return newRuns;
};

aucteraden.findRuns = function(tableau,suit) {
	//Return all runs for the suit, in a special scoreable format.
	var runs = aucteraden.findSingleCards(tableau,suit);
	if (runs.length <= 1)
		return runs;

	var lastRuns = runs;
	var nextRuns = runs;
	//Check next level.
	while (nextRuns.length > 0) {
		lastRuns = nextRuns;
		nextRuns = aucteraden.expandRuns(tableau,lastRuns,suit);
	}
	return lastRuns;
};

aucteraden.score = function(game) {
	//The complex part of scoring is runs.
	game = aucteraden.scoreRunsAndBonuses(game);

	game.score.total = game.score.suit.total;

	//Subtract penalties.
	var emptyTableauCount = game.foundation.reduce(function(acc,subarray) {
		return acc + subarray.reduce(function (ac2,card) {
			return ac2 + (aucteraden.isBlank(card) ? 1 : 0);
		}, 0);
	},0);
	game.score.total -= 5 * emptyTableauCount;

	var badTokenSuitCount = Object.keys(game.tokens).reduce(function(acc,key) {
		return acc + (game.tokens[key] == 0 || game.tokens[key] == 4 ? 1 : 0);
	},0);
	game.score.badTokenPenalty = -5 * badTokenSuitCount;

	game.score.total -= 5 * badTokenSuitCount;

  game.score.total -= 3 * game.discards;

	return game;
};

aucteraden.hasAce = function(singleRunArray) {
	return (singleRunArray[0].value == 1 || (singleRunArray.length > 1 && singleRunArray[1].value == 1));
};

aucteraden.runBonusCalculator = function(longestRunsArray) {
	//The crown will be the last card of the run, if it's there.
	var crownRunsArray = [];
	longestRunsArray.forEach(function(runArray,idx) {
		if (runArray[runArray.length-1].value == 10)
			crownRunsArray.push(runArray);
	});
	var aceIdx;
	if (crownRunsArray.length > 0) {
		aceIdx = crownRunsArray.reduce(function(acc,runArray,idx) {
			return Math.max(acc, (aucteraden.hasAce(runArray) ? idx : -1));
		},-1);
		if (aceIdx > -1)
			return 4;
		else 
			return 2;
	} else {
		aceIdx = longestRunsArray.reduce(function(acc,runArray,idx) {
			return Math.max(acc, (aucteraden.hasAce(runArray) ? idx : -1));
		},-1);
		if (aceIdx > -1) 
			return 1;
		else
			return 0;
	}
};

aucteraden.scoreRunsAndBonuses = function(game) {
	game.score.suit.total = ["Moons", "Suns", "Knots", "Waves", "Leaves", "Wyrms"].reduce(function(acc,suit) {
		//This is only finding the longest, not scoring Aces/Crowns/Both.
		var longRuns = aucteraden.findRuns(game.foundation,suit);
		var runLength = longRuns.length > 0 ? longRuns[0].length : 0;
		var runScore = [-5,-5,2,5,9,14,20,30,30,30,30,30][runLength];
		var runBonus = aucteraden.runBonusCalculator(longRuns);
		//aucteraden.debug(suit + ": " + runLength + " + " + runBonus + " = " + runScore);
		game.score.suit[suit] = runScore + runBonus; 
		return acc + runScore + runBonus;
	},0);
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
	list.push(makeVersion("rolling", "Rolling market", "A rolling market variant.", "market cards are checked on normal market refills, but not when the market is empty."));
	list.push(makeVersion("volatile", "Volatile market", "Another rolling market variant.", "market cards are checked on all draws."));
	return list;

	function makeVersion(type, title, description, rules) {
		return new variants.Version({
			type: type,
			title: title,
			description: description,
			rules: m("div", {className: "rules"}, [
				m("p", "The objective is to fill the tableau by forming long runs of orthogonally adjacent, increasing sequences of cards in each suit, preferably including Aces and/or Crowns.  Runs may snake around.  When playing with the extended deck, Pawns and Courts are below Aces."),
				m("h2", "Turn Order"),
				aucteraden.Rules(),
				m("p", " For this version (" + title + "), " + rules),
				m("h2", "Scoring"),
				aucteraden.Scoring(),
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
		this.game = aucteraden.discardMarket(this.game);
	};
	
	this.buy = function(row) {
		this.game = aucteraden.buy(this.game,row);
	};

	this.pay = function(key) {
		this.game = aucteraden.pay(this.game,key);
	};

	this.play = function(r,c) {
		this.game = aucteraden.play(this.game,r,c);
	};

	this.shift = function(direction) {
		this.game = aucteraden.shiftFoundation(this.game,direction);
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
				m("div", {className: "message"}, [
					m("h4", "Score: ", [
						m("span", {className: "legible"}, ctrl.game.score.total)
					])
				]),
				m("div", {className: "buttonWrapper"}, [
					m("button[type=button]", {className: "mainButton", onclick: ctrl.reset.bind(ctrl)}, "New Game"),
					m("button[type=button]", {className: "mainButton", onclick: modal.visible.bind(ctrl, true)}, "Rules"),
					m("button[type=button]", {className: "mainButton", onclick: ctrl.discard.bind(ctrl, true)}, "Discard Market" + (ctrl.game.discards ? " (" + ctrl.game.discards * -3 + ")" : ""))
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
					]),
					m("div", {className: "play"}, [
						m("h4", {className: ctrl.game.unpaid.price ? "message" : ""}, (ctrl.game.unpaid.price ? "Pay " + ctrl.game.unpaid.price : "Play")),
						m("img", {className: "card", src: "cards/" + ctrl.game.play.image()})
					])
				]),
				//Messages
				m("div", {className: "roundWrapper"}, [
					m("div", {className: "message"}, ctrl.game.message)
				]),
				// Market.
				m("div", {className: "marketWrapper"}, [
					[2,1,0].map(function(row) {
						return m("div", {className: "stock"}, [
							m("h4", (row == 0 ? "Free" : row + " Token" + (row == 2 ? "s" : "")) + (ctrl.game.market[row] && (ctrl.game.market[row].rank() == "PAWN" || ctrl.game.market[row].rank() == "COURT") ? " + 1" : "")),
							m("img", {className: "card", src: "cards/" + (ctrl.game.market[row] ? ctrl.game.market[row].image() : "blank.png"), onclick: ctrl.buy.bind(ctrl,row)})
						]);
					})
				]),
				m("p", {className: "description"}, [
					m("h4", [
						m("a", {href: "./"}, "Credits")
					])
				])
			]),

			// Tokens
			m("div", {className: "tokenWrapper"}, [
				Object.keys(ctrl.game.tokens).map(function(key) {
					return m("div", {className: (ctrl.game.unpaid.suits.indexOf(key) > -1 ? "tokenSetPay" : "tokenSet"), onclick: ctrl.pay.bind(ctrl,key)}, [
						[1,2,3,4].map(function(cnt) {
							if (ctrl.game.tokens[key] >= cnt)
								return m("div", {className: "tokenDiv"}, [
									m("img", {className: "token", src: "css/" + key.toLowerCase() + ".png"})
								]);
							else
								return m("div");
						})
					]);
				}),
				m("div", {className: "scoreDiv"}, ctrl.game.score.badTokenPenalty)
			]),

			// Foundation
			aucteraden.viewFoundation(ctrl),

			//Runs.
			m("div", {className: "scoreWrapper"}, [
				m("h4", "Runs"),
				Object.keys(ctrl.game.score.suit).map(function(key) {
					return m("div", {className: "scoreSet"}, [
						m("div", {className: "scoreDiv"}, [
							(key != "total" ?	m("img", {className: "token", src: "css/" + key.toLowerCase() + ".png" }) : m("hr")),
							m("div", {className: "score"}, ctrl.game.score.suit[key])
						])
					]);
				})
			]),

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
