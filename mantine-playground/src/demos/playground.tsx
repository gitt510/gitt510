import { Divider, Paper, SegmentedControl, Select, SimpleGrid, Stack, Switch, Table, Text, Title } from '@mantine/core'
import { useState, type ReactNode } from 'react'

// A page is described as data: its controls, how to render the component, and which two controls form the matrix

type OptionControl<O extends string = string> = { kind: 'option'; options: readonly O[]; default: O }
type BoolControl = { kind: 'bool'; default: boolean }
export type Controls = Record<string, OptionControl | BoolControl>

export type Values<C extends Controls> = { [K in keyof C]: C[K] extends OptionControl<infer O> ? O : boolean }

type OptionKey<C extends Controls> = { [K in keyof C]: C[K] extends OptionControl ? K : never }[keyof C] & string

export const opt = <const O extends string>(options: readonly O[], def: NoInfer<O> = options[0]): OptionControl<O> => ({
  kind: 'option',
  options,
  default: def,
})
export const bool = (def = false): BoolControl => ({ kind: 'bool', default: def })

export const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
export const colors = ['blue', 'gray', 'dark', 'red', 'green', 'yellow', 'grape', 'teal'] as const

export type PlaygroundConfig<C extends Controls> = {
  name: string
  controls: C
  render: (v: Values<C>) => ReactNode
  matrix?: { rows: OptionKey<C>; cols: OptionKey<C>; fixed?: Partial<Values<C>> }
  // Inputs and bars read better at full width; buttons and icons read better centered
  stretch?: boolean
}

export type Demo = { category: string; name: string; slug: string; element: ReactNode }

const slugify = (s: string) => s.toLowerCase().replaceAll(' ', '-')

export function demo<C extends Controls>(category: string, config: PlaygroundConfig<C>): Demo {
  return {
    category,
    name: config.name,
    slug: `${slugify(category)}/${slugify(config.name)}`,
    element: <Playground key={config.name} {...config} />,
  }
}

function Playground<C extends Controls>({ name, controls, render, matrix, stretch = false }: PlaygroundConfig<C>) {
  const [values, setValues] = useState(
    () => Object.fromEntries(Object.entries(controls).map(([k, c]) => [k, c.default])) as Values<C>,
  )
  const set = (key: string, value: string | boolean) => setValues((prev) => ({ ...prev, [key]: value }))

  const entries = Object.entries(controls)
  const options = entries.filter((e): e is [string, OptionControl] => e[1].kind === 'option')
  const bools = entries.filter(([, c]) => c.kind === 'bool')

  return (
    <Stack gap="lg" maw={1080}>
      <Title order={2}>{name}</Title>

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
        <Paper withBorder p="lg" radius="md">
          <Stack justify="center" align={stretch ? 'stretch' : 'center'} h="100%" mih={120}>
            {render(values)}
          </Stack>
        </Paper>

        <Paper withBorder p="lg" radius="md">
          <Stack gap="sm">
            {options.map(([key, c]) => (
              <Stack key={key} gap={4}>
                <Text size="xs" c="dimmed" ff="monospace">{key}</Text>
                {c.options.length <= 5 ? (
                  <SegmentedControl size="xs" data={[...c.options]} value={values[key] as string} onChange={(v) => set(key, v)} />
                ) : (
                  <Select size="xs" data={[...c.options]} value={values[key] as string} onChange={(v) => v && set(key, v)} allowDeselect={false} />
                )}
              </Stack>
            ))}
            {bools.length > 0 && <Divider />}
            <SimpleGrid cols={2} spacing="xs">
              {bools.map(([key]) => (
                <Switch key={key} label={key} checked={values[key] as boolean} onChange={(e) => set(key, e.currentTarget.checked)} />
              ))}
            </SimpleGrid>
          </Stack>
        </Paper>
      </SimpleGrid>

      {matrix && (
        <>
          <Title order={4}>
            {matrix.rows} × {matrix.cols}
          </Title>
          <Matrix
            rows={(controls[matrix.rows] as OptionControl).options}
            cols={(controls[matrix.cols] as OptionControl).options}
            cell={(r, c) => render({ ...values, ...matrix.fixed, [matrix.rows]: r, [matrix.cols]: c })}
          />
        </>
      )}
    </Stack>
  )
}

function Matrix(props: { rows: readonly string[]; cols: readonly string[]; cell: (row: string, col: string) => ReactNode }) {
  return (
    <Table.ScrollContainer minWidth={720}>
      <Table withTableBorder verticalSpacing="md">
        <Table.Thead>
          <Table.Tr>
            <Table.Th />
            {props.cols.map((c) => (
              <Table.Th key={c}>
                <Text size="sm" ff="monospace">{c}</Text>
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {props.rows.map((r) => (
            <Table.Tr key={r}>
              <Table.Td>
                <Text size="sm" ff="monospace">{r}</Text>
              </Table.Td>
              {props.cols.map((c) => (
                <Table.Td key={c}>{props.cell(r, c)}</Table.Td>
              ))}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  )
}
