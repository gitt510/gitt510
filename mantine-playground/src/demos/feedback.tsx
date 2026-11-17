import { Loader, Progress, RingProgress, Text } from '@mantine/core'
import { bool, colors, demo, opt, sizes } from './playground'

export const feedback = [
  demo('Feedback', {
    name: 'Loader',
    controls: { type: opt(['oval', 'bars', 'dots']), color: opt(colors), size: opt(sizes, 'md') },
    render: (p) => <Loader {...p} />,
    matrix: { rows: 'type', cols: 'size' },
  }),
  demo('Feedback', {
    name: 'Progress',
    controls: {
      value: opt(['10', '40', '75', '100'], '40'),
      color: opt(colors),
      size: opt(sizes, 'md'),
      radius: opt(sizes, 'sm'),
      striped: bool(),
      animated: bool(),
    },
    render: ({ value, ...p }) => <Progress {...p} value={Number(value)} />,
    matrix: { rows: 'size', cols: 'value' },
    stretch: true,
  }),
  demo('Feedback', {
    name: 'RingProgress',
    controls: {
      value: opt(['25', '50', '75', '100'], '50'),
      color: opt(colors),
      size: opt(['60', '80', '120', '160'], '120'),
      thickness: opt(['4', '8', '12', '16'], '12'),
      roundCaps: bool(),
      label: bool(true),
    },
    render: (v) => (
      <RingProgress
        size={Number(v.size)}
        thickness={Number(v.thickness)}
        roundCaps={v.roundCaps}
        sections={[{ value: Number(v.value), color: v.color }]}
        label={v.label ? <Text ta="center" size="xs">{v.value}%</Text> : undefined}
      />
    ),
    matrix: { rows: 'thickness', cols: 'size' },
  }),
]
