import {
  Autocomplete,
  ColorInput,
  FileInput,
  JsonInput,
  MultiSelect,
  NativeSelect,
  NumberInput,
  PasswordInput,
  PinInput,
  Select,
  TagsInput,
  Textarea,
  TextInput,
} from '@mantine/core'
import { IconAt } from '@tabler/icons-react'
import type { ReactNode } from 'react'
import { bool, demo, opt, sizes, type Values } from './playground'

const fruits = ['Apple', 'Banana', 'Cherry', 'Grape', 'Orange']

// Props every Mantine input shares, so one set of controls drives them all
const controls = {
  variant: opt(['default', 'filled', 'unstyled']),
  size: opt(sizes, 'sm'),
  radius: opt(sizes, 'sm'),
  label: bool(true),
  description: bool(),
  error: bool(),
  disabled: bool(),
  withAsterisk: bool(),
  leftSection: bool(),
}

const toProps = (v: Values<typeof controls>) => ({
  variant: v.variant,
  size: v.size,
  radius: v.radius,
  label: v.label ? 'Label' : undefined,
  description: v.description ? 'Description' : undefined,
  placeholder: 'Placeholder',
  error: v.error ? 'Error message' : undefined,
  disabled: v.disabled,
  withAsterisk: v.withAsterisk,
  leftSection: v.leftSection ? <IconAt size={16} /> : undefined,
})

const input = (name: string, render: (p: ReturnType<typeof toProps>) => ReactNode) =>
  demo('Inputs', {
    name,
    controls,
    render: (v) => render(toProps(v)),
    matrix: { rows: 'size', cols: 'variant', fixed: { label: false, description: false } },
    stretch: true,
  })

export const inputs = [
  input('TextInput', (p) => <TextInput {...p} />),
  input('Textarea', (p) => <Textarea {...p} autosize minRows={2} />),
  input('PasswordInput', (p) => <PasswordInput {...p} />),
  input('NumberInput', (p) => <NumberInput {...p} />),
  input('Select', (p) => <Select {...p} data={fruits} />),
  input('MultiSelect', (p) => <MultiSelect {...p} data={fruits} />),
  input('Autocomplete', (p) => <Autocomplete {...p} data={fruits} />),
  input('TagsInput', (p) => <TagsInput {...p} data={fruits} />),
  input('NativeSelect', ({ placeholder: _, ...p }) => <NativeSelect {...p} data={fruits} />),
  input('JsonInput', (p) => <JsonInput {...p} formatOnBlur autosize minRows={3} />),
  input('FileInput', (p) => <FileInput {...p} />),
  input('ColorInput', ({ leftSection: _, ...p }) => <ColorInput {...p} />),
  // PinInput has no label, description or variant, so it gets its own controls
  demo('Inputs', {
    name: 'PinInput',
    controls: {
      size: opt(sizes, 'sm'),
      radius: opt(sizes, 'sm'),
      type: opt(['alphanumeric', 'number']),
      length: opt(['4', '5', '6']),
      mask: bool(),
      error: bool(),
      disabled: bool(),
    },
    render: (v) => (
      <PinInput size={v.size} radius={v.radius} type={v.type} length={Number(v.length)} mask={v.mask} error={v.error} disabled={v.disabled} />
    ),
    matrix: { rows: 'size', cols: 'radius' },
  }),
]
