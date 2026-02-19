'use client'
import { useState, useEffect } from 'react'

export function useSectionObserver() {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const sectionEls = document.querySelectorAll('section[id]')
    const navObs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) })
    }, { threshold: 0.15, rootMargin: '-80px 0px -50% 0px' })
    sectionEls.forEach(el => navObs.observe(el))
    return () => navObs.disconnect()
  }, [])

  return activeSection
}
