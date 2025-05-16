import { diseases, rules, symptoms } from "@/lib/data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  return diseases.map((disease) => ({
    id: disease.id,
  }))
}

export default function DiseaseDetailPage({ params }: { params: { id: string } }) {
  const diseaseId = params.id
  
  const disease = diseases.find(d => d.id === diseaseId)
  
  if (!disease) {
    return notFound()
  }
  
  const diseaseRules = rules[diseaseId] || []
  const relatedSymptoms = diseaseRules.map(rule => {
    const symptom = symptoms.find(s => s.id === rule.symptomId)
    return {
      ...symptom,
      certaintyFactor: rule.certaintyFactor
    }
  }).filter(Boolean)
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
        <Link href="/info">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{disease.name}</h1>
          <p className="text-muted-foreground">{disease.id}</p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Deskripsi</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{disease.description || "Tidak ada deskripsi tersedia."}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Gejala yang Terkait</CardTitle>
          <CardDescription>
            Gejala-gejala yang sering ditemukan pada penyakit ini
          </CardDescription>
        </CardHeader>
        <CardContent>
          {relatedSymptoms.length > 0 ? (
            <ul className="space-y-2">
              {relatedSymptoms.map((symptom: any) => (
                <li key={symptom.id} className="flex justify-between items-center border-b pb-2">
                  <span>{symptom.name}</span>
                  <span className="text-sm text-muted-foreground">
                    CF: {(symptom.certaintyFactor * 100).toFixed(0)}%
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">Tidak ada gejala terkait yang tersedia.</p>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Penanganan</CardTitle>
          <CardDescription>
            Rekomendasi untuk mengatasi penyakit ini
          </CardDescription>
        </CardHeader>
        <CardContent>
          {disease.remedies && disease.remedies.length > 0 ? (
            <ul className="list-disc pl-5 space-y-2">
              {disease.remedies.map((remedy, index) => (
                <li key={index}>{remedy}</li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">Tidak ada informasi penanganan yang tersedia.</p>
          )}
        </CardContent>
      </Card>
      
      <div className="flex justify-between">
        <Link href="/diagnosa">
          <Button>
            Mulai Diagnosa
          </Button>
        </Link>
        <Link href="/info">
          <Button variant="outline">
            Lihat Penyakit Lainnya
          </Button>
        </Link>
      </div>
    </div>
  )
}