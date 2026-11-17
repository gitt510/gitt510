_default:
    @just --list

# Open the keyboard view in the browser
[working-directory('keyboards')]
open-keyboard:
    pnpm install --silent
    pnpm dev --open

# Open the Mantine playground in the browser
[working-directory('mantine-playground')]
open-mantine-playground:
    pnpm install --silent
    pnpm dev --open
