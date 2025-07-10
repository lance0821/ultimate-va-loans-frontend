import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

interface FAQ {
  question: string
  answer: string
  id: string
}

interface FAQAccordionProps {
  faqs: FAQ[]
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq) => (
        <AccordionItem key={faq.id} value={faq.id}>
          <AccordionTrigger className="text-left">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent>
            <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}