# Sound Files Directory

This directory contains sound effect files for the poker game.

## Required Sound Files

Place the following MP3 files in this directory:

- `fold.mp3` - Sound when a player folds
- `check.mp3` - Sound when a player checks
- `call.mp3` - Sound when a player calls
- `raise.mp3` - Sound when a player raises
- `bet.mp3` - Sound when a player places a bet
- `card-deal.mp3` - Sound of cards being dealt
- `card-flip.mp3` - Sound of a card being flipped
- `chip-stack.mp3` - Sound of chips being stacked/moved
- `win.mp3` - Victory/celebration sound
- `lose.mp3` - Defeat sound
- `button-click.mp3` - Generic button click sound
- `notification.mp3` - Notification/alert sound
- `your-turn.mp3` - Sound to alert player it's their turn

## Recommended Sources for Free Sound Effects

- [Freesound.org](https://freesound.org) - Creative Commons licensed sounds
- [Mixkit](https://mixkit.co/free-sound-effects/) - Free sound effects
- [Zapsplat](https://www.zapsplat.com) - Free sound effects (requires account)

## File Format

- Format: MP3 (for best browser compatibility)
- Sample rate: 44100 Hz recommended
- Bit rate: 128-192 kbps
- Duration: Keep sounds short (0.5-2 seconds) for game actions

## Fallback Behavior

If sound files are not present, the game will silently continue without playing sounds.
The sound toggle in the UI will still work, allowing users to enable/disable sounds.
