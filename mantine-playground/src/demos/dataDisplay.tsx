import { Avatar, Badge, Indicator, ThemeIcon } from '@mantine/core'
import { IconHeart, IconStar } from '@tabler/icons-react'
import { bool, colors, demo, opt, sizes } from './playground'

export const dataDisplay = [
  demo('Data display', {
    name: 'Badge',
    controls: {
      variant: opt(['filled', 'light', 'outline', 'dot', 'transparent', 'default', 'white', 'gradient']),
      color: opt(colors),
      size: opt(sizes, 'md'),
      radius: opt(sizes, 'xl'),
      leftSection: bool(),
      circle: bool(),
    },
    render: ({ leftSection, circle, ...p }) => (
      <Badge {...p} circle={circle} leftSection={leftSection ? <IconStar size={12} /> : undefined}>
        {circle ? '7' : 'Badge'}
      </Badge>
    ),
    matrix: { rows: 'variant', cols: 'size' },
  }),
  demo('Data display', {
    name: 'ThemeIcon',
    controls: {
      variant: opt(['filled', 'light', 'outline', 'transparent', 'default', 'white', 'gradient']),
      color: opt(colors),
      size: opt(sizes, 'md'),
      radius: opt(sizes, 'sm'),
    },
    render: (p) => (
      <ThemeIcon {...p}>
        <IconHeart style={{ width: '70%', height: '70%' }} />
      </ThemeIcon>
    ),
    matrix: { rows: 'variant', cols: 'size' },
  }),
  demo('Data display', {
    name: 'Avatar',
    controls: {
      variant: opt(['light', 'filled', 'outline', 'transparent', 'default', 'white', 'gradient']),
      color: opt(colors),
      size: opt(sizes, 'md'),
      radius: opt(sizes, 'xl'),
      content: opt(['placeholder', 'initials']),
    },
    render: ({ content, ...p }) => <Avatar {...p} name={content === 'initials' ? 'Mantine UI' : undefined} />,
    matrix: { rows: 'variant', cols: 'size' },
  }),
  demo('Data display', {
    name: 'Indicator',
    controls: {
      position: opt(['top-end', 'top-start', 'top-center', 'middle-end', 'middle-start', 'bottom-end', 'bottom-start', 'bottom-center']),
      color: opt(colors),
      size: opt(['8', '10', '12', '16', '20'], '12'),
      radius: opt(sizes, 'xl'),
      label: bool(),
      withBorder: bool(),
      processing: bool(),
      disabled: bool(),
    },
    render: ({ size, label, ...p }) => (
      <Indicator {...p} size={label ? 16 : Number(size)} label={label ? 'New' : undefined}>
        <Avatar radius="sm" size="lg" />
      </Indicator>
    ),
    matrix: { rows: 'position', cols: 'size' },
  }),
]
