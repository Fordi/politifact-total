Politifact Truth Totaler
------------------------

This Chrome/Chromium extension adds a column to Politifact's personality
scorecards with a weighted sum of checks indicating the person's rated
honesty.

The formula is simple:

```
          1 * True + 0.75 * MostlyTrue + 0.5 * HalfTrue + 0.25 * MostlyFalse - 0.5 * PantsOnFire
Honesty = --------------------------------------------------------------------------------------
                  True + MostlyTrue + HalfTrue + MostlyFalse + False + PantsOnFire
```

## Installation

* Clone this repo to your machine
* in Chrome/Chromium, go to `chrome://extensions`
* flip on "Developer mode" in the upper right-hand corner
* click "Load unpacked"
* Browse to this repository's `src` folder.
