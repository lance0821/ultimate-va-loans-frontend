import { ContentBlock } from './ContentBlock'
import { CalculatorEmbed } from './CalculatorEmbed'
import { FAQAccordion } from './FAQAccordion'
import type { StreamFieldData } from '@/types/cms'

interface StreamFieldRendererProps {
  content: StreamFieldData[]
}

export function StreamFieldRenderer({ content }: StreamFieldRendererProps) {
  if (!content) return null

  return (
    <div className="space-y-8">
      {content.map((block, index) => {
        switch (block.type) {
          case 'heading':
            return (
              <h2 key={index} className="text-3xl font-bold text-va-blue mb-4">
                {String(block.value)}
              </h2>
            )
          
          case 'paragraph':
            return (
              <ContentBlock key={index} className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: String(block.value) }} />
              </ContentBlock>
            )
          
          case 'image':
            const imageValue = block.value as { url: string; alt: string; caption?: string }
            return (
              <ContentBlock key={index}>
                <img
                  src={imageValue.url}
                  alt={imageValue.alt}
                  className="rounded-lg shadow-md w-full"
                />
                {imageValue.caption && (
                  <p className="text-sm text-gray-600 mt-2 text-center italic">
                    {imageValue.caption}
                  </p>
                )}
              </ContentBlock>
            )
          
          case 'quote':
            const quoteValue = block.value as { text: string; attribution?: string }
            return (
              <ContentBlock key={index}>
                <blockquote className="border-l-4 border-va-gold pl-6 py-4 bg-gray-50 rounded-r-lg">
                  <p className="text-lg font-medium text-gray-800 mb-2">
                    "{quoteValue.text}"
                  </p>
                  {quoteValue.attribution && (
                    <cite className="text-sm text-gray-600">
                      — {quoteValue.attribution}
                    </cite>
                  )}
                </blockquote>
              </ContentBlock>
            )
          
          case 'calculator_embed':
            const calcValue = block.value as { calculator_type: 'mortgage' | 'affordability' | 'funding_fee' }
            return (
              <ContentBlock key={index}>
                <CalculatorEmbed type={calcValue.calculator_type} />
              </ContentBlock>
            )
          
          case 'faq_section':
            const faqValue = block.value as { faqs: Array<{ id: string; question: string; answer: string }> }
            return (
              <ContentBlock key={index}>
                <FAQAccordion faqs={faqValue.faqs} />
              </ContentBlock>
            )
          
          default:
            return null
        }
      })}
    </div>
  )
}