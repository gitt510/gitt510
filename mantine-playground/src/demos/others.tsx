import { Pagination, Rating, SegmentedControl, Slider } from '@mantine/core'
import { bool, colors, demo, opt, sizes } from './playground'

export const others = [
  demo('Others', {
    name: 'SegmentedControl',
    controls: {
      color: opt(['default', ...colors]),
      size: opt(sizes, 'sm'),
      radius: opt(sizes, 'sm'),
      orientation: opt(['horizontal', 'vertical']),
      fullWidth: bool(),
      withItemsBorders: bool(true),
      disabled: bool(),
    },
    render: ({ color, ...p }) => (
      <SegmentedControl {...p} color={color === 'default' ? undefined : color} data={['React', 'Vue', 'Svelte']} />
    ),
    matrix: { rows: 'size', cols: 'radius' },
  }),
  demo('Others', {
    name: 'Slider',
    controls: {
      color: opt(colors),
      size: opt(sizes, 'md'),
      radius: opt(sizes, 'xl'),
      marks: bool(),
      labelAlwaysOn: bool(),
      inverted: bool(),
      disabled: bool(),
    },
    render: ({ marks, ...p }) => (
      <Slider {...p} defaultValue={40} marks={marks ? [{ value: 20, label: '20%' }, { value: 50, label: '50%' }, { value: 80, label: '80%' }] : undefined} />
    ),
    matrix: { rows: 'color', cols: 'size' },
    stretch: true,
  }),
  demo('Others', {
    name: 'Rating',
    controls: {
      color: opt(colors, 'yellow'),
      size: opt(sizes, 'sm'),
      count: opt(['5', '10']),
      fractions: opt(['1', '2', '4']),
      readOnly: bool(),
    },
    render: ({ count, fractions, ...p }) => <Rating {...p} count={Number(count)} fractions={Number(fractions)} defaultValue={2.5} />,
    matrix: { rows: 'color', cols: 'size' },
  }),
  demo('Others', {
    name: 'Pagination',
    controls: {
      color: opt(colors),
      size: opt(sizes, 'sm'),
      radius: opt(sizes, 'sm'),
      withEdges: bool(),
      withControls: bool(true),
      disabled: bool(),
    },
    render: (p) => <Pagination {...p} total={10} defaultValue={3} />,
    matrix: { rows: 'size', cols: 'radius' },
  }),
]
