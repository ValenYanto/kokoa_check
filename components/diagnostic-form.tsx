"use client"

import { useState } from "react"
import { symptoms, rules, diseases } from "@/lib/data"
import { Button } from "./ui/button"
import { SymptomCard } from "./symptom-card"
import { calculateDiagnosticResults, saveDiagnosticHistory } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs"
import { Input } from "./ui/input"
import {
  AnimatedHeading,
  FadeIn,
  AnimatedList,
  AnimatedListItem,
  SlideIn,
  PageTransition,
} from "./ui/animated-components"

// Categorize symptoms by part
const categorizedSymptoms = {
  buah: symptoms.filter((s) =>
    s.name.toLowerCase().includes("buah") ||
    s.name.toLowerCase().includes("biji")
  ),
  batang: symptoms.filter((s) =>
    s.name.toLowerCase().includes("batang") ||
    s.name.toLowerCase().includes("cabang") ||
    s.name.toLowerCase().includes("ranting")
  ),
  daun: symptoms.filter((s) =>
    s.name.toLowerCase().includes("daun")
  ),
  akar: symptoms.filter((s) =>
    s.name.toLowerCase().includes("akar")
  ),
  lainnya: symptoms.filter((s) =>
    !s.name.toLowerCase().includes("buah") &&
    !s.name.toLowerCase().includes("biji") &&
    !s.name.toLowerCase().includes("batang") &&
    !s.name.toLowerCase().includes("cabang") &&
    !s.name.toLowerCase().includes("ranting") &&
    !s.name.toLowerCase().includes("daun") &&
    !s.name.toLowerCase().includes("akar")
  ),
}

export function DiagnosticForm() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<Record<string, number>>({})
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  const handleSelectSymptom = (symptomId: string, certainty: number) => {
    setSelectedSymptoms((prev) => {
      const updated = { ...prev }
      if (certainty === 0) {
        delete updated[symptomId]
      } else {
        updated[symptomId] = certainty
      }
      return updated
    })
  }

  const handleSubmit = () => {
    const userInputs = Object.entries(selectedSymptoms).map(([symptomId, userCertainty]) => ({ symptomId, userCertainty }))
    const diseaseNames = Object.fromEntries(diseases.map((d) => [d.id, d.name]))
    const results = calculateDiagnosticResults(rules, userInputs, diseaseNames)
    saveDiagnosticHistory(new Date(), userInputs, results)
    router.push("/hasil")
  }

  const filteredSymptoms = searchTerm
    ? symptoms.filter((s) =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : []

  const hasSelectedSymptoms = Object.keys(selectedSymptoms).length > 0

  return (
    <PageTransition>
      <div className="space-y-6">
        <SlideIn direction="left">
          <AnimatedHeading>
            <h2 className="text-2xl font-bold">Pilih Gejala yang Diamati</h2>
            <p className="text-muted-foreground">
              Geser slider untuk menunjukkan tingkat keyakinan Anda terhadap gejala yang diamati pada tanaman kakao.
            </p>
          </AnimatedHeading>
        </SlideIn>

        <FadeIn delay={0.1}>
          <div className="sticky top-0 z-10 bg-background pt-2 pb-4 border-b mb-6">
            <Input
              type="search"
              placeholder="Cari gejala..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-4"
            />
            {hasSelectedSymptoms && (
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  {Object.keys(selectedSymptoms).length} gejala dipilih
                </p>
                <Button onClick={() => setSelectedSymptoms({})} variant="outline" size="sm">
                  Reset
                </Button>
              </div>
            )}
          </div>
        </FadeIn>

        {searchTerm ? (
          <AnimatedList>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredSymptoms.map((symptom) => (
                <AnimatedListItem key={symptom.id}>
                  <SymptomCard
                    symptom={symptom}
                    onSelectSymptom={handleSelectSymptom}
                    value={selectedSymptoms[symptom.id] || 0}
                  />
                </AnimatedListItem>
              ))}
            </div>
            {filteredSymptoms.length === 0 && (
              <p className="col-span-full text-center text-muted-foreground">
                Tidak ada diagnosa yang cocok dengan “{searchTerm}”.
              </p>
            )}
          </AnimatedList>
        ) : (
          <Tabs defaultValue="buah">
            <TabsList className="grid grid-cols-5">
              <TabsTrigger value="buah">Buah</TabsTrigger>
              <TabsTrigger value="batang">Batang</TabsTrigger>
              <TabsTrigger value="daun">Daun</TabsTrigger>
              <TabsTrigger value="akar">Akar</TabsTrigger>
              <TabsTrigger value="lainnya">Lainnya</TabsTrigger>
            </TabsList>

            <TabsContent value="buah" className="mt-6">
              <AnimatedList>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {categorizedSymptoms.buah.map((symptom) => (
                    <AnimatedListItem key={symptom.id}>
                      <SymptomCard
                        symptom={symptom}
                        onSelectSymptom={handleSelectSymptom}
                        value={selectedSymptoms[symptom.id] || 0}
                      />
                    </AnimatedListItem>
                  ))}
                </div>
              </AnimatedList>
            </TabsContent>

            <TabsContent value="batang" className="mt-6">
              <AnimatedList>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {categorizedSymptoms.batang.map((symptom) => (
                    <AnimatedListItem key={symptom.id}>
                      <SymptomCard
                        symptom={symptom}
                        onSelectSymptom={handleSelectSymptom}
                        value={selectedSymptoms[symptom.id] || 0}
                      />
                    </AnimatedListItem>
                  ))}
                </div>
              </AnimatedList>
            </TabsContent>

            <TabsContent value="daun" className="mt-6">
              <AnimatedList>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {categorizedSymptoms.daun.map((symptom) => (
                    <AnimatedListItem key={symptom.id}>
                      <SymptomCard
                        symptom={symptom}
                        onSelectSymptom={handleSelectSymptom}
                        value={selectedSymptoms[symptom.id] || 0}
                      />
                    </AnimatedListItem>
                  ))}
                </div>
              </AnimatedList>
            </TabsContent>

            <TabsContent value="akar" className="mt-6">
              <AnimatedList>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {categorizedSymptoms.akar.map((symptom) => (
                    <AnimatedListItem key={symptom.id}>
                      <SymptomCard
                        symptom={symptom}
                        onSelectSymptom={handleSelectSymptom}
                        value={selectedSymptoms[symptom.id] || 0}
                      />
                    </AnimatedListItem>
                  ))}
                </div>
              </AnimatedList>
            </TabsContent>

            <TabsContent value="lainnya" className="mt-6">
              <AnimatedList>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {categorizedSymptoms.lainnya.map((symptom) => (
                    <AnimatedListItem key={symptom.id}>
                      <SymptomCard
                        symptom={symptom}
                        onSelectSymptom={handleSelectSymptom}
                        value={selectedSymptoms[symptom.id] || 0}
                      />
                    </AnimatedListItem>
                  ))}
                </div>
              </AnimatedList>
            </TabsContent>
          </Tabs>
        )}

        <FadeIn delay={0.3}>
          <div className="sticky bottom-0 py-4 bg-background border-t flex justify-end">
            <Button onClick={handleSubmit} disabled={!hasSelectedSymptoms} size="lg">
              Analisis Hasil
            </Button>
          </div>
        </FadeIn>
      </div>
    </PageTransition>
  )
}