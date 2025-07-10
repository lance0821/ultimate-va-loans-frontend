interface ContentBlockProps {
  children: React.ReactNode
  className?: string
}

export function ContentBlock({ children, className }: ContentBlockProps) {
  return <div className={`mb-6 ${className || ''}`}>{children}</div>
}