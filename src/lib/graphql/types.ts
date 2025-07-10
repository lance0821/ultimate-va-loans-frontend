export interface ContentPageType {
  id: string
  title: string
  slug: string
  intro?: string
  body?: unknown[]
  firstPublishedAt?: string
  metaDescription?: string
  metaKeywords?: string
  ogTitle?: string
  ogDescription?: string
  seoTitle?: string
}