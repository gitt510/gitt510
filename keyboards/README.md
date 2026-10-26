# keyboards

## Layers

| Layer  | Trigger            | File                 |
|--------|--------------------|----------------------|
| Base   | —                  | `us-65.base.json`    |
| Lower  | Cmd hold           | `us-65.lower.json`   |
| Raise  | Ctrl hold          | `us-65.raise.json`   |
| Adjust | Cmd + Ctrl hold    | reserved, no file    |
| Util   | Caps hold          | `us-65.util.json`    |
| Launch | R-Shift hold       | `us-65.launch.json`  |
| Vendor | Fn hold            | out of scope         |

## Decisions

- The JSON files here are the source of truth for the keymap
- Karabiner in the private dotfiles repo is the implementation of the keymap, kept in sync by hand for now
- Each layer file carries the board name, since its contents depend on the physical layout
- Each layer file holds only bindings set up in dotfiles, not macOS or app defaults
- Lower, Raise and Adjust keep their Planck / QMK names, so Caps takes the name Util
- `fkeys.json` lists an F-key only when an app outside Karabiner binds it and dotfiles holds that app's config
- A layer key that sends such an F-key states `send` instead of a label

## Files

| File                 | Holds                                   |
|----------------------|-----------------------------------------|
| `us-65.base.json`    | physical layout and base labels         |
| `us-65.<layer>.json` | trigger and per-key overrides           |
| `fkeys.json`         | F-key → binding app and action          |

## Viewer

```sh
pnpm install
pnpm dev
```

- The viewer shows a sent F-key on the keycap and its binding on hover
