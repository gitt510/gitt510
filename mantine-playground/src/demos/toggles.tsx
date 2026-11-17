import { Checkbox, Chip, Radio, Switch } from '@mantine/core'
import { bool, colors, demo, opt, sizes } from './playground'

// Label, description and error behave the same across Checkbox, Radio and Switch
const common = {
  color: opt(colors),
  size: opt(sizes, 'sm'),
  radius: opt(sizes, 'sm'),
  labelPosition: opt(['right', 'left']),
  checked: bool(true),
  label: bool(true),
  description: bool(),
  error: bool(),
  disabled: bool(),
}

const text = (v: { label: boolean; description: boolean; error: boolean }) => ({
  label: v.label ? 'Label' : undefined,
  description: v.description ? 'Description' : undefined,
  error: v.error ? 'Error message' : undefined,
})

// `key` remounts the toggle when the `checked` control changes, while clicks still work in between
export const toggles = [
  demo('Toggles', {
    name: 'Checkbox',
    controls: { variant: opt(['filled', 'outline', 'light']), ...common, indeterminate: bool() },
    render: ({ checked, label, description, error, ...p }) => (
      <Checkbox key={String(checked)} defaultChecked={checked} {...p} {...text({ label, description, error })} />
    ),
    matrix: { rows: 'variant', cols: 'size' },
  }),
  demo('Toggles', {
    name: 'Radio',
    controls: { variant: opt(['filled', 'outline', 'light']), ...common },
    render: ({ checked, label, description, error, ...p }) => (
      <Radio key={String(checked)} defaultChecked={checked} {...p} {...text({ label, description, error })} />
    ),
    matrix: { rows: 'variant', cols: 'size' },
  }),
  demo('Toggles', {
    name: 'Switch',
    controls: { ...common, onOffLabel: bool(), withThumbIndicator: bool(true) },
    render: ({ checked, label, description, error, onOffLabel, ...p }) => (
      <Switch
        key={String(checked)}
        defaultChecked={checked}
        onLabel={onOffLabel ? 'ON' : undefined}
        offLabel={onOffLabel ? 'OFF' : undefined}
        {...p}
        {...text({ label, description, error })}
      />
    ),
    matrix: { rows: 'radius', cols: 'size' },
  }),
  demo('Toggles', {
    name: 'Chip',
    controls: {
      variant: opt(['outline', 'filled', 'light']),
      color: opt(colors),
      size: opt(sizes, 'sm'),
      radius: opt(sizes, 'xl'),
      checked: bool(true),
      disabled: bool(),
    },
    render: ({ checked, ...p }) => (
      <Chip key={String(checked)} defaultChecked={checked} {...p}>
        Chip
      </Chip>
    ),
    matrix: { rows: 'variant', cols: 'size' },
  }),
]
