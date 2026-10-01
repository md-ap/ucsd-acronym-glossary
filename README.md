# UC San Diego Acronym Glossary (unofficial)

**Live site: https://md-ap.github.io/ucsd-acronym-glossary/**

UC San Diego runs on acronyms: **VIS**, **GEPA**, **TA**, **ERC**, **WLH**… This glossary
collects them in one place, ordered top-down (UC system → campus administration → schools
and colleges → departments and course codes → paperwork, services and buildings), so
newcomers don't have to guess.

> **Disclaimer:** this is a student project. It is not affiliated with or endorsed by
> UC San Diego or the University of California. Offices are renamed often; always confirm
> with the source linked on each entry.

## What's in it

As of October 2026 it has 1,100 entries in 15 sections, collected from official UCSD and
UC pages, including the useful part of Blink's own
[Acronyms and Abbreviations](https://blink.ucsd.edu/sponsor/blink/resources/aa.html) list
(checked against current pages, since that list still carries many retired names). Every
entry has the acronym, its official name, a one-sentence explanation, and a link to the
page that confirms it. Entries that could not be confirmed on an official page carry an
"unverified" badge.

You can browse by section or A–Z, search by acronym or name, and link straight to a search
with `?q=GEPA`.

## Contributing

Corrections and new acronyms are welcome. Either
[open an issue](https://github.com/md-ap/ucsd-acronym-glossary/issues/new) or edit the
data directly and send a pull request.

Each section is a file in `data/`. To add or fix an acronym, edit its section file and add
a block like this:

```js
  {
    acronym: "VIS",
    name: "Visual Arts",
    group: "subject-codes",
    parent: "Department of Visual Arts",
    description: "Subject code for Department of Visual Arts courses.",
    url: "https://visarts.ucsd.edu/",
    verified: true,
  },
```

| Field         | What it is                                                                       |
| ------------- | -------------------------------------------------------------------------------- |
| `acronym`     | The acronym as written at UCSD.                                                  |
| `name`        | Official full name, as it appears on UCSD pages.                                 |
| `group`       | Subsection within the file. Valid ids are listed in `data/sections.js`.          |
| `parent`      | Optional. The department or school it belongs to.                                |
| `description` | One short sentence: what it is and when a student runs into it.                  |
| `url`         | Official page that confirms the meaning.                                         |
| `verified`    | `true` if you saw it on an official page; `false` shows the "unverified" badge.  |
| `note`        | Optional. Former names, other meanings, or anything easy to confuse.             |

Ground rules:

1. **One official source per entry** (`ucsd.edu`, `universityofcalifornia.edu`). If you
   can't find one, use `verified: false`.
2. **When an office is renamed**, update the entry and keep the old name in `note`; people
   keep using it.
3. **One entry per meaning.** The same acronym can mean several things (APM is both a
   building and a manual); add each meaning in its own section.
4. For a new section, register it in `data/sections.js` and add its file to `index.html`.

## Running it locally

No install or server needed: clone the repository and open `index.html` in a browser.

```
index.html        page
styles.css        styles
app.js            search and rendering
data/sections.js  list of sections and subsections
data/NN-*.js      entries, one file per section
```

The site is published with GitHub Pages from the `main` branch, so merged changes go live
within a couple of minutes. If you fork it, set `REPO_URL` at the top of `app.js` to your
repository so the "Edit this section" and "Suggest an acronym" links point to it.
