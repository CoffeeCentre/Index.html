import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PageHero, Section } from "@/components/section";

const FAQS = [
  {
    q: "Do I need prior experience to take a Foundation course?",
    a: "No prior experience is required for any Foundation level course. Our Foundation programmes are designed for complete beginners and provide a comprehensive introduction to each discipline. Whether you've never made an espresso or are a passionate home enthusiast, you'll feel comfortable and supported.",
  },
  {
    q: "What certifications are recognised internationally?",
    a: "All SCA (Specialty Coffee Association) and CQI (Coffee Quality Institute) certifications we offer are recognised globally. The Q Grader certification is the gold standard for coffee quality assessment worldwide and is required by many specialty coffee companies.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Full refunds are available up to 14 days before your course start date. Cancellations within 14 days receive a 50% refund or full credit towards a future course. We understand circumstances change, so we're always happy to discuss rescheduling options.",
  },
  {
    q: "Is parking available?",
    a: "Yes, free parking is available on-site at Forest Hill Business Centre. We also have excellent public transport links—Forest Hill station is a 10-minute walk, with frequent services from London Bridge and Victoria.",
  },
  {
    q: "What equipment do you use for training?",
    a: "Our training centre features professional-grade equipment including La Marzocco and Victoria Arduino espresso machines, Mahlkönig grinders, and a full brew bar with V60, Chemex, and other manual methods. For roasting courses, we use sample roasters and have access to our production roastery.",
  },
];

export default function Faq() {
  return (
    <>
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about training at Coffee Centre London"
      />
      <Section>
        <div className="mx-auto max-w-[800px]">
          <Accordion type="single" collapsible defaultValue="item-0">
            {FAQS.map((item, i) => (
              <AccordionItem key={item.q} value={`item-${i}`}>
                <AccordionTrigger>
                  <h4 className="font-sans text-base text-charcoal">
                    {item.q}
                  </h4>
                </AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>
    </>
  );
}
