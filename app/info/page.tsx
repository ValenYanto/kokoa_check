import { diseases } from "@/lib/data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function InfoPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Informasi Penyakit Tanaman Kakao</h1>
        <p className="text-muted-foreground">
          Pelajari berbagai jenis penyakit yang umum menyerang tanaman kakao
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {diseases.map(disease => (
          <Card key={disease.id}>
            <CardHeader>
              <CardTitle>{disease.name}</CardTitle>
              <CardDescription>{disease.id}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {disease.description || "Tidak ada deskripsi tersedia."}
              </p>
              <Link href={`/info/${disease.id}`}>
                <Button variant="outline" size="sm" className="w-full">
                  Lihat Detail
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}