import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ActionIcon, AppShell, ColorScheme, ColorSchemeProvider, Group, Header, MantineProvider, Text, ThemeIcon, useMantineColorScheme } from '@mantine/core'
import { useColorScheme } from '@mantine/hooks';
import { useState } from 'react';
import { IconTicket, IconMoon, IconSun } from '@tabler/icons';

function MyApp({ Component, pageProps }: AppProps) {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useState<ColorScheme>(preferredColorScheme);
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  const dark = colorScheme === 'dark';
  return (
    <>
      <Head>
        <title>usher | find the best ticket</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme,
            primaryColor: 'indigo'
          }}
        >
          <AppShell
            padding="md"
            header={
              <Header height={60} padding="md">
                <Group position="apart" align="center" direction="row">
                  <Group align="center" direction="row">
                    <ThemeIcon>
                      <IconTicket />
                    </ThemeIcon>
                    
                    <Text  weight={700}>
                      Usher
                    </Text>
                  </Group>
                  <ActionIcon
                    variant="outline"
                    color={dark ? 'yellow' : 'blue'}
                    onClick={() => toggleColorScheme()}
                    title="Toggle color scheme"
                  >
                    {dark ? (
                      <IconSun style={{ width: 18, height: 18 }} />
                    ) : (
                      <IconMoon style={{ width: 18, height: 18 }} />
                    )}
                  </ActionIcon>
                </Group>
              </Header>}
            styles={(theme) => ({
              main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
            })}
          >
            <Component {...pageProps} />
          </AppShell>
        </MantineProvider>
      </ColorSchemeProvider>
    </>

  )
}

export default MyApp
