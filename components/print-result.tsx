import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { formatPercentage } from "@/lib/utils"
import { Printer } from "lucide-react"
import { forwardRef } from "react"

interface PrintResultProps {
  results: any[]
  date: string
}

export const PrintResult = forwardRef<HTMLDivElement, PrintResultProps>(
  ({ results, date }, ref) => {
    return (
      <div ref={ref} className="p-8 bg-white">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold">Hasil Diagnosa Penyakit Tanaman Kakao</h1>
            <p className="text-muted-foreground">Diagnosa dilakukan pada: {date}</p>
          </div>

          <div className="space-y-4">
            {results.map((result, index) => (
              <div key={result.diseaseId} className="border p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{result.diseaseName}</h3>
                    <p className="text-sm text-muted-foreground">{result.diseaseId}</p>
                  </div>
                  <span className="text-lg font-bold">
                    {formatPercentage(result.certaintyFactor)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <p className="text-sm text-muted-foreground text-center">
              Hasil diagnosa ini bersifat indikatif. Untuk penanganan lebih lanjut, 
              silakan konsultasikan dengan ahli pertanian atau spesialis tanaman kakao.
            </p>
          </div>
        </div>
      </div>
    )
  }
)