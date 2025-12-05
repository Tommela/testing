import type { PropsWithChildren } from 'react'

import { ThemeProvider } from 'next-themes'
import { COMMON } from '~/constants'
import I18nProvider from '~/providers/i18n-provider'
import { QueryProvider } from '~/providers/query-provider'

export const Provider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryProvider>
      <ThemeProvider
        attribute='class'
        defaultTheme={COMMON.THEMES.LIGHT}
        value={{ light: COMMON.THEMES.LIGHT }}
        enableSystem
        disableTransitionOnChange
      >
        <I18nProvider>{children}</I18nProvider>
      </ThemeProvider>
    </QueryProvider>
  )
}
