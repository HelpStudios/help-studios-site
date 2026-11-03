# Help Studios — logo source

Every lockup, mark and tile the brand is built from. All flat vector, no gradients,
no bitmaps, no fonts beyond the Inter that ships with the site.

```
mark-a-on-dark.svg   mark-a-on-light.svg   mark-a-mono.svg
mark-b-on-dark.svg   mark-b-on-light.svg
mark-d-on-dark.svg   mark-d-on-light.svg   mark-d-mono.svg
tile-a.svg           tile-d.svg
lockup-a-on-dark.svg       lockup-a-on-light.svg       lockup-a-mono.svg
lockup-a-stacked-on-dark.svg
lockup-b-on-dark.svg       lockup-c-on-dark.svg
lockup-d-on-dark.svg       lockup-d-on-light.svg       lockup-d-mono.svg
lockup-d-stacked-on-dark.svg
png/                 rendered masters (2400 px lockups, 1600 px stacked, 512 px tiles)
help/                the supplied artwork, cut for the site (see help/README.md)
```

## The supplied artwork

`help/` holds the brand as the studio actually drew it — two figures assembling
"help", the lower-case wordmark, the tagline — together with the cuts made from it
for the site's dark ground. It is a raster source, re-cut rather than redrawn, and
it is what the header and `og-image.png` carry. It does not replace the SVGs above:
those own the favicon, and they stay flat vector because a 16 px icon cannot hold a
gradient.

## The directions

| | Mark | Size | Reads as | Status |
|---|---|---|---|---|
| A | the signal | 32 × 40 | An H, two columns of data, one amber node above them | **Favicon** — `favicon.svg` and the touch icon still use it |
| B | two people, one line | 32 × 37 | Two figures joined by a crossbar, the right one amber | Candidate, not recommended at 16 px |
| C | words only | — | The wordmark with no mark beside it | Candidate, borrows A's tile for tabs |
| D | the join | 49 × 22 | Two jigsaw pieces, a socket, and an amber knob not yet in it | Candidate — see `tools/jigsaw-lab.html` |

Nothing on the live page points at B, C or D. The header and `og-image.png` carry
the supplied artwork in `help/` — the real logo, re-cut for dark and light grounds
by `tools/make-help-studios-assets.js`. `favicon.svg` stays with A until the
supplied mark has a reduction that survives 32 px (`help/README.md` explains why
the whole mark does not).

## Mark D — the join

Two 19 × 22 pieces, an 11-unit gap, and a knob that protrudes 8.3 and stops 2.7
short of the socket it belongs in. The knob is amber because it is the join that has
not been made yet; teal is data already in place. It is never shown interlocked —
the engine surfaces the join, it does not pretend the work is finished.

- Grid 49 × 22, ink exactly filling the viewBox, so it drops into any layout
  without guesswork.
- The socket is knocked out of the left piece with `fill-rule="evenodd"` — no mask,
  no clipPath, no ids. Two subpaths: the rounded body and the keyhole.
- The knob is a `<circle>` plus a `<rect>` in one ink, overlapping by 1.7 so the
  union has re-entrant corners and no seam. Both are painted *before* the body,
  whose edge covers the 1-unit overlap.
- Fills, not the family's 5-unit stroke: a 4-unit mouth drawn at stroke 5 would
  close itself. Do not "correct" this to match marks A and B.

## Colour is a token pair, never a gradient

| Ground | Structure | Accent |
|---|---|---|
| Dark (screen, the product) | teal `#2dd4bf` | amber `#eab308` |
| Light (paper, projector) | teal 700 `#0f766e` (4.9:1) | amber 700 `#b45309` (4.6:1) |
| One colour | `currentColor` | `currentColor` |

`#2dd4bf` measures 1.85:1 against white: the bright tokens are for screens only. The
`-mono` files take their colour from the text they sit beside and print from a
single plate.

## Rules

- **Ink fills the declared box.** `make-logo-masters.js` measures the real ink with
  `getBBox()` and fails the build if it leaves the viewBox, so a consumer cropping
  to the box can never clip a letter.
- **Class names are prefixed per colourway** (`.hsd-` dark, `.hsl-` light, `.hsm-`
  mono, `.hss-` stacked). An inlined SVG's `<style>` is *not* scoped to that svg, so
  two colourways on one page overwrite each other's ink. The A set still uses
  `.hs-wm-*` everywhere and therefore mis-renders in `logo-lab.html`; prefix any new
  file.
- **Clear space** is 1.5× the accent element's diameter on all four sides — 10.8
  units for D's knob, 10.8 for A's node. Nothing goes inside it: no rule, no border,
  no edge of the page.
- **Minimum sizes.** Mark D: 24 px / 8 mm (at 16 px the socket closes and only the
  pair reads). Marks A and B: 16 px / 5 mm. Horizontal lockup: 120 px / 30 mm wide.
  Stacked: 96 px wide.
- **Never** add a drop shadow, a gradient, a stroke around the mark, or a second
  accent colour. The amber is the only warm note in the system and it means one
  thing: something to look at.

## Rebuilding

```
node website/tools/make-logo-masters.js      # SVG -> png/ (fails on ink overflow)
node website/tools/make-logo-preview.js      # renders tools/logo-lab.html
node website/tools/make-jigsaw-preview.js    # renders tools/jigsaw-lab.html
```

The PNG masters are committed because `<img src="…svg">` cannot load a webfont, so
a lockup placed as an image would set its wordmark in Arial. The rasters are the
files to use in decks, email signatures and print; the SVGs are the files to use in
a page that inlines them.
