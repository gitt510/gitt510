import {
  ActionIcon,
  AppShell,
  Burger,
  Group,
  NavLink,
  ScrollArea,
  Text,
  Title,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconForms, IconHome, IconMoon, IconSun } from '@tabler/icons-react'
import { categories, demos } from './demos/registry'
import { useHashRoute } from './useHashRoute'

export default function App() {
  // Mobile and desktop keep separate open states, as in the Mantine docs
  const [mobileOpened, { toggle: toggleMobile, close: closeMobile }] = useDisclosure()
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true)
  const { setColorScheme } = useMantineColorScheme()
  const colorScheme = useComputedColorScheme('light')
  const route = useHashRoute()
  const current = demos.find((d) => d.slug === route)

  return (
    <AppShell
      header={{ height: 56 }}
      navbar={{ width: 240, breakpoint: 'sm', collapsed: { mobile: !mobileOpened, desktop: !desktopOpened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
            <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
            <Title order={4}>Mantine Playground</Title>
          </Group>
          <ActionIcon
            variant="default"
            onClick={() => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle color scheme"
          >
            {colorScheme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
          </ActionIcon>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="xs">
        <AppShell.Section grow component={ScrollArea}>
          <NavLink href="#" label="Home" leftSection={<IconHome size={18} />} active={!current} onClick={closeMobile} />
          <NavLink label="Components" leftSection={<IconForms size={18} />} defaultOpened>
            {categories.map((category) => (
              <NavLink key={category} label={category} defaultOpened>
                {demos
                  .filter((d) => d.category === category)
                  .map((d) => (
                    <NavLink
                      key={d.slug}
                      href={`#${d.slug}`}
                      label={d.name}
                      active={d.slug === route}
                      onClick={closeMobile}
                    />
                  ))}
              </NavLink>
            ))}
          </NavLink>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        {current?.element ?? (
          <>
            <Title order={2} mb="sm">Home</Title>
            <Text c="dimmed">Pick a component from the navbar.</Text>
          </>
        )}
      </AppShell.Main>
    </AppShell>
  )
}
