import base from '../us-65.base.json'
import util from '../us-65.util.json'
import launch from '../us-65.launch.json'
import fkeyData from '../fkeys.json'

export type Key = {
  id: string
  tap: string
  shift?: string
  hold?: string
  width?: number
  note?: string
}

export type Override = Omit<Key, 'id' | 'width'> & { held?: boolean }

// a layer key either labels itself or sends an F-key that an app outside Karabiner binds
type LayerKey = Partial<Override> & { send?: string }

// F-keys bound by an app whose config lives in dotfiles
type FKey = { by: string; action: string }

export type Layer = {
  trigger: string
  keys: Record<string, Override>
}

export type Keymap = {
  name: string
  rows: Key[][]
  layers: Record<string, Layer>
}

const fkeys: Record<string, FKey> = fkeyData

function resolve({ send, ...key }: LayerKey): Override {
  if (!send) return key as Override
  const fkey = fkeys[send]
  const tap = send.toUpperCase()
  return { tap, ...(fkey && { note: `${tap} → ${fkey.by} ${fkey.action}` }), ...key }
}

function layer({ trigger, keys }: { trigger: string; keys: Record<string, LayerKey> }): Layer {
  return {
    trigger,
    keys: Object.fromEntries(Object.entries(keys).map(([id, key]) => [id, resolve(key)])),
  }
}

export const keymap: Keymap = {
  ...base,
  layers: { util: layer(util), launch: layer(launch) },
}
