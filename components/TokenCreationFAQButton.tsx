import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const TokenCreationFAQButton = () => {
    const faqs = [
        {
            question: "What is Token Vesting?",
            answer: "Token vesting is a process of gradually distributing tokens over time according to a predetermined schedule. It helps ensure long-term commitment from token holders and prevents large sell-offs."
        },
        {
            question: "Why do I need to connect my wallet?",
            answer: "Connecting your wallet is necessary to create and deploy your token contract. It also ensures that you have control over the token creation process and can manage your tokens securely."
        },
        {
            question: "How much does it cost?",
            answer: "The cost varies depending on network conditions and the complexity of your token contract. You'll need to pay network fees (gas) for deploying the contract."
        },
        {
            question: "What is the difference between an investor and employee contract?",
            answer: "Investor contracts typically have different vesting schedules and terms compared to employee contracts. Investor contracts may have longer lock-up periods and different distribution mechanisms."
        },
        {
            question: "Why won't it accept my uploaded file?",
            answer: "Files must meet specific format requirements and size limitations. Ensure you're using the correct file format (CSV or JSON) and that the file size is under the maximum limit."
        },
        {
            question: "Can I vest tokens that receive rewards or dividends?",
            answer: "Yes, tokens that receive rewards or dividends can be vested. The vesting contract can be configured to handle reward distributions appropriately."
        },
        {
            question: "What is a lockup period?",
            answer: "A lockup period is a duration during which tokens cannot be transferred or sold. It's commonly used to ensure long-term commitment from token holders."
        },
        {
            question: "Can I organise a call with someone from Team Finance?",
            answer: "Yes, you can schedule a call with our team for additional support or questions about token creation and vesting."
        },
        {
            question: "Where will I be able to see my vested tokens after deploying the contract?",
            answer: "After deployment, you can view your vested tokens in the dashboard section of the platform and in your connected wallet."
        }
    ];

    return (
        <div className="fixed top-6 right-6 z-50">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full w-12 h-12">
                        <HelpCircle className="h-6 w-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle className="text-2xl font-bold">FAQs</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                        <Accordion type="single" collapsible className="w-full">
                            {faqs.map((faq, index) => (
                                <AccordionItem key={index} value={`item-${index}`}>
                                    <AccordionTrigger className="text-left">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default TokenCreationFAQButton;