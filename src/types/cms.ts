export interface StreamFieldData {
  type: string
  value: unknown
}

export interface ContentPageData {
  id: string
  title: string
  slug: string
  intro?: string
  body?: StreamFieldData[]
  firstPublishedAt?: string
  metaDescription?: string
  metaKeywords?: string
  ogTitle?: string
  ogDescription?: string
  seoTitle?: string
}

export interface FAQData {
  id: string
  question: string
  answer: string
  category?: string
}