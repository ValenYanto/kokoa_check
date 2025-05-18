// NO "use client" di sini! jadi ini Server Component
import { diseases } from "@/lib/data"
import InfoDetailClient from "@/components/InfoDetailClient"

export function generateStaticParams() {
  return diseases.map((d) => ({
    id: d.id,
  }))
}

export default function DiseaseDetailPage({ params }: { params: { id: string } }) {
  // Hanya pass params.id ke Client Component
  return <InfoDetailClient diseaseId={params.id} />
}
