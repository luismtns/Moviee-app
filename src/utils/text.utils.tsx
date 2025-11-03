import React from 'react'

export const highlightText = (text: string, query: string): React.ReactNode => {
  if (!query.trim()) return text

  const parts = text.split(new RegExp(`(${query})`, 'gi'))

  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark
        key={index}
        style={{ backgroundColor: 'var(--ion-color-warning)', color: 'var(--ion-color-warning-contrast)' }}>
        {part}
      </mark>
    ) : (
      part
    )
  )
}
