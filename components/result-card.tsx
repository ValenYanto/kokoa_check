import { Disease } from "@/lib/data"
import { DiagnosticResult } from "@/lib/data"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { formatPercentage, getCertaintyColor } from "@/lib/utils"
import { CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react"
import { Button } from "./ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import Link from "next/link"

interface ResultCardProps {
  result: DiagnosticResult
  disease: Disease
  rank: number
}

export function ResultCard({ result, disease, rank }: ResultCardProps) {
  const certaintyPercentage = formatPercentage(result.certaintyFactor)
  const certaintyColor = getCertaintyColor(result.certaintyFactor)
  
  // Determine severity icon
  const SeverityIcon = () => {
    if (result.certaintyFactor >= 0.7) {
      return <AlertTriangle className="h-5 w-5 text-red-500" />
    } else if (result.certaintyFactor >= 0.4) {
      return <Info className="h-5 w-5 text-yellow-500" />
    } else {
      return <CheckCircle className="h-5 w-5 text-green-500" />
    }
  }
  
  return (
    <Card className={cn(
      "transition-all duration-200",
      rank === 0 ? "border-orange-500 dark:border-orange-700 shadow-lg" : ""
    )}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <SeverityIcon />
              {disease.name}
            </CardTitle>
            <CardDescription>{disease.id}</CardDescription>
          </div>
          <div className={cn("text-lg font-bold", certaintyColor)}>
            {certaintyPercentage}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{disease.description}</p>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="remedies">
            <AccordionTrigger className="text-sm font-medium">Penanganan</AccordionTrigger>
            <AccordionContent>
              {disease.remedies && disease.remedies.length > 0 ? (
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {disease.remedies.map((remedy, i) => (
                    <li key={i}>{remedy}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">Tidak ada informasi penanganan.</p>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter>
        <Link href={`/info/${disease.id}`} className="w-full">
          <Button variant="outline" className="w-full">
            Lihat Detail
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

// Add cn function if not imported
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ")
}