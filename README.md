# Aucteraden

Aucteraden is a solitaire Decktet game by Jack Neal; full rules are available at [the Decktet wiki](http://decktet.wikidot.com/game:aucteraden).

## Scoresheet

While playing the Decktet solitaire game Aucteraden I got annoyed with the complicated scorekeeping, so I wrote a scoresheet program using Vue.js.

The scoresheet includes an interactive rules summary for the game.

## Game

I started out implementing the game in Vue with Vuex to integrate with the scoresheet, but then switched to Mithril 0.2.5 (so it doesn't).  The game includes autosave, full undo capability, various variants (intentionally created by the author as well as accidentally invented by users), and a black moons option.

## Version

Let's call it 1.0.

## Credits

This implementation is by M. C. DeMarco; you may be interested in my other [Decktet games](http://mcdemarco.net/games/decktet/).

The [Decktet](http://www.decktet.com) is the creation of P.D. Magnus.

The Decktet card images were released under a Creative Commons License by P.D. Magnus; the suit images are taken from the cards.

The background texture is "Skulls" by Adam, from [Subtle Patterns](http://subtlepatterns.com/skulls/).
