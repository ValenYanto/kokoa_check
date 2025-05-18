"use client"   // di sini yang butuh useState/useEffect

import { useEffect, useState } from "react"
import { diseases, rules, symptoms } from "@/lib/data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import { 
  AnimatedCard, 
  AnimatedHeading, 
  AnimatedList, 
  AnimatedListItem, 
  FadeIn, 
  PageTransition, 
  SlideIn 
} from "@/components/ui/animated-components"
import { motion } from "framer-motion"

export default function InfoDetailClient({ diseaseId }: { diseaseId: string }) {
    const [mounted, setMounted] = useState(false)
  
    // Set mounted after initial render for hydration
    useEffect(() => {
      setMounted(true)
    }, [])
    
    // Prevent hydration mismatch
    if (!mounted) {
      return null
    }
    
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
      <PageTransition>
        <div className="space-y-6">
          <SlideIn direction="left">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
              <Link href="/info">
                <motion.div whileHover={{ x: -3 }} whileTap={{ scale: 0.97 }}>
                  <Button variant="outline" size="sm">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Kembali
                  </Button>
                </motion.div>
              </Link>
              <AnimatedHeading>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">{disease.name}</h1>
                  <p className="text-muted-foreground">{disease.id}</p>
                </div>
              </AnimatedHeading>
            </div>
          </SlideIn>
          
          <AnimatedCard delay={0.1}>
            <Card>
              <CardHeader>
                <CardTitle>Deskripsi</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{disease.description || "Tidak ada deskripsi tersedia."}</p>
              </CardContent>
            </Card>
          </AnimatedCard>
          
          <AnimatedCard delay={0.2}>
            <Card>
              <CardHeader>
                <CardTitle>Gejala yang Terkait</CardTitle>
                <CardDescription>
                  Gejala-gejala yang sering ditemukan pada penyakit ini
                </CardDescription>
              </CardHeader>
              <CardContent>
                {relatedSymptoms.length > 0 ? (
                  <AnimatedList>
                    <ul className="space-y-2">
                      {relatedSymptoms.map((symptom: any, index) => (
                        <AnimatedListItem key={symptom.id}>
                          <motion.li 
                            className="flex justify-between items-center border-b pb-2"
                            whileHover={{ backgroundColor: "rgba(0,0,0,0.02)", paddingLeft: "8px" }}
                            transition={{ duration: 0.2 }}
                          >
                            <span>{symptom.name}</span>
                            <motion.span 
                              className="text-sm text-muted-foreground"
                              whileHover={{ fontWeight: "bold" }}
                            >
                              CF: {(symptom.certaintyFactor * 100).toFixed(0)}%
                            </motion.span>
                          </motion.li>
                        </AnimatedListItem>
                      ))}
                    </ul>
                  </AnimatedList>
                ) : (
                  <p className="text-muted-foreground">Tidak ada gejala terkait yang tersedia.</p>
                )}
              </CardContent>
            </Card>
          </AnimatedCard>
          
          <AnimatedCard delay={0.3}>
            <Card>
              <CardHeader>
                <CardTitle>Penanganan</CardTitle>
                <CardDescription>
                  Rekomendasi untuk mengatasi penyakit ini
                </CardDescription>
              </CardHeader>
              <CardContent>
                {disease.remedies && disease.remedies.length > 0 ? (
                  <AnimatedList>
                    <ul className="list-disc pl-5 space-y-2">
                      {disease.remedies.map((remedy, index) => (
                        <AnimatedListItem key={index}>
                          <motion.li
                            whileHover={{ x: 2 }}
                            transition={{ duration: 0.2 }}
                          >
                            {remedy}
                          </motion.li>
                        </AnimatedListItem>
                      ))}
                    </ul>
                  </AnimatedList>
                ) : (
                  <p className="text-muted-foreground">Tidak ada informasi penanganan yang tersedia.</p>
                )}
              </CardContent>
            </Card>
          </AnimatedCard>
          
          <FadeIn delay={0.4}>
            <div className="flex justify-between">
              <Link href="/diagnosa">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button>
                    Mulai Diagnosa
                  </Button>
                </motion.div>
              </Link>
              <Link href="/info">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button variant="outline">
                    Lihat Penyakit Lainnya
                  </Button>
                </motion.div>
              </Link>
            </div>
          </FadeIn>
        </div>
      </PageTransition>
    )

  // … sisanya persis seperti kode lama-mu, tapi gunakan prop diseaseId …
}
