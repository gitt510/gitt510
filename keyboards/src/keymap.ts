import data from '../us-65.json'

export type Key = {
  id: string
  tap: string
  shift?: string
  hold?: string
  width?: number
  note?: string
}

export type Override = Omit<Key, 'id' | 'width'> & { held?: boolean }

export type Layer = {
  trigger: string
  keys: Record<string, Override>
}

export type Keymap = {
  name: string
  rows: Key[][]
  layers: Record<string, Layer>
}

export const keymap: Keymap = data
