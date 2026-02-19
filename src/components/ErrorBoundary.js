'use client'
import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-[200px] p-8">
          <div className="text-center">
            <p className="text-sm text-slate-500">Something went wrong loading this section.</p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="mt-3 text-xs font-semibold uppercase tracking-wider hover:underline"
              style={{ color: 'var(--accent)' }}
            >
              Try Again
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
