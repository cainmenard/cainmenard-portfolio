'use client'
import { useEffect } from 'react'

export function useFadeOnScroll() {
  useEffect(() => {
    const fadeEls = document.querySelectorAll('.fade-section')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' })
    fadeEls.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}
