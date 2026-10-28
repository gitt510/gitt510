_default:
    @just --list

# Open the keyboard view in the browser
[working-directory('keyboards')]
open-keyboard:
    pnpm install --silent
    pnpm dev --open
