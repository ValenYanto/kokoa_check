"use client"

import { useState, useEffect, useRef } from "react"
import { ResultCard } from "@/components/result-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Printer, Save } from "lucide-react"
import { diseases } from "@/lib/data"
import { getDiagnosticHistory } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { PrintResult } from "@/components/print-result"
import { useReactToPrint } from "react-to-print"

export default function HasilPage() {
  const [results, setResults] = useState<any[]>([])
  const [date, setDate] = useState<string>("")
  const printRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const history = getDiagnosticHistory()
    if (history.length > 0) {
      const latest = history[history.length - 1]
      setResults(latest.results)
      setDate(new Date(latest.date).toLocaleString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }))
    }
  }, [])
  
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  })
  
  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <h1 className="text-2xl font-bold">Tidak Ada Hasil Diagnosa</h1>
        <p className="text-muted-foreground">
          Anda belum melakukan diagnosa atau hasil tidak tersedia.
        </p>
        <Link href="/diagnosa">
          <Button>Mulai Diagnosa</Button>
        </Link>
      </div>
    )
  }
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Hasil Diagnosa</h1>
          <p className="text-muted-foreground">
            Diagnosa dilakukan pada: {date}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Cetak
          </Button>
          <Link href="/diagnosa">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Diagnosa Baru
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {results.slice(0, 3).map((result, index) => {
          const disease = diseases.find(d => d.id === result.diseaseId)
          
          if (!disease) return null
          
          return (
            <ResultCard
              key={result.diseaseId}
              result={result}
              disease={disease}
              rank={index}
            />
          )
        })}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Analisis Perbandingan</CardTitle>
          <CardDescription>
            Perbandingan tingkat keyakinan dari hasil diagnosa
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {results.slice(0, 5).map((result) => (
            <div key={result.diseaseId} className="space-y-1">
              <div className="flex justify-between">
                <span className="text-sm font-medium">
                  {result.diseaseName}
                </span>
                <span className="text-sm text-muted-foreground">
                  {(result.certaintyFactor * 100).toFixed(1)}%
                </span>
              </div>
              <Progress value={result.certaintyFactor * 100} className="h-2" />
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Hasil diagnosa menunjukkan persentase keyakinan berdasarkan gejala yang Anda pilih.
          </p>
        </CardFooter>
      </Card>
      
      <div className="border-t pt-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Catatan Penting</h2>
          <p className="text-muted-foreground">
            Hasil diagnosa ini didasarkan pada gejala yang Anda masukkan dan tingkat keyakinan Anda. 
            Untuk diagnosa yang lebih akurat, konsultasikan dengan ahli pertanian atau spesialis tanaman kakao.
          </p>
        </div>
      </div>

      <div className="hidden">
        <PrintResult ref={printRef} results={results} date={date} />
      </div>
    </div>
  )
}