import { legacyContent } from './legacyContent'
import { memo } from 'react'
import type { ReactNode } from 'react'

type LegacyMainProps = {
  children?: ReactNode
}

const LegacyPages = memo(function LegacyPages() {
  return <div className="legacy-pages" dangerouslySetInnerHTML={{ __html: legacyContent }} />
})

export function LegacyMain({ children }: LegacyMainProps) {
  return (
    <main id="main">
      <LegacyPages />
      {children}
    </main>
  )
}
