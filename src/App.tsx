import { useEffect } from 'react'
import { loadMetaPixelAfterPaint } from './lib/pixel'
import Hero from './sections/Hero'
import AuthorityBar from './sections/AuthorityBar'
import Problem from './sections/Problem'
import Objection from './sections/Objection'
import Differential from './sections/Differential'
import Deliverables from './sections/Deliverables'
import Schedule from './sections/Schedule'
import Professors from './sections/Professors'
import Experience from './sections/Experience'
import Offer from './sections/Offer'
import Audience from './sections/Audience'
import Faq from './sections/Faq'
import FinalCta from './sections/FinalCta'
import StickyCta from './components/StickyCta'

export default function App() {
  useEffect(loadMetaPixelAfterPaint, [])

  return (
    <>
      <main className="min-h-dvh bg-navy">
        <Hero />
        <AuthorityBar />
        <Problem />
        <Objection />
        <Differential />
        <Deliverables />
        <Schedule />
        <Professors />
        <Experience />
        <Offer />
        <Audience />
        <Faq />
        <FinalCta />
      </main>
      <StickyCta />
    </>
  )
}
