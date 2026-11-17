import { ActionIcon, Button, CloseButton } from '@mantine/core'
import { IconDownload, IconHeart } from '@tabler/icons-react'
import type { ReactNode } from 'react'
import { bool, colors, demo, opt, sizes, type Values } from './playground'

// Props Button and ActionIcon share
const controls = {
  variant: opt(['filled', 'light', 'outline', 'subtle', 'transparent', 'default', 'white', 'gradient']),
  color: opt(colors),
  size: opt(sizes, 'sm'),
  radius: opt(sizes, 'sm'),
  disabled: bool(),
  loading: bool(),
}

// Variants read better as rows: Button has 8 of them
const button = (name: string, render: (p: Values<typeof controls>) => ReactNode) =>
  demo('Buttons', { name, controls, render, matrix: { rows: 'variant', cols: 'size' } })

const group = (p: Values<typeof controls>, orientation: 'horizontal' | 'vertical') => (
  <Button.Group orientation={orientation}>
    <Button {...p}>First</Button>
    <Button {...p}>Second</Button>
    <Button {...p}>Third</Button>
  </Button.Group>
)

export const buttons = [
  button('Button', (p) => <Button {...p}>Button</Button>),
  button('Button with sections', (p) => (
    <Button {...p} leftSection={<IconDownload size={16} />} rightSection={<IconHeart size={16} />}>
      Download
    </Button>
  )),
  button('ActionIcon', (p) => (
    <ActionIcon {...p} aria-label="Like">
      <IconHeart style={{ width: '70%', height: '70%' }} />
    </ActionIcon>
  )),
  button('Button.Group', (p) => group(p, 'horizontal')),
  button('Button.Group vertical', (p) => group(p, 'vertical')),
  // CloseButton only has two variants and no color or loading
  demo('Buttons', {
    name: 'CloseButton',
    controls: { variant: opt(['subtle', 'transparent']), size: opt(sizes, 'sm'), radius: opt(sizes, 'sm'), disabled: bool() },
    render: (p) => <CloseButton {...p} aria-label="Close" />,
    matrix: { rows: 'variant', cols: 'size' },
  }),
]
