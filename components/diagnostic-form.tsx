"use client"

import { useState, useEffect } from "react"
import { symptoms, rules, diseases } from "@/lib/data"
import { Button } from "./ui/button"
import { SymptomCard } from "./symptom-card"
import { calculateDiagnosticResults, saveDiagnosticHistory } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Input } from "./ui/input"

// Categorize symptoms by part
const categorizedSymptoms = {
  buah: symptoms.filter(s => 
    s.name.toLowerCase().includes("buah") || 
    s.name.toLowerCase().includes("biji")),
  batang: symptoms.filter(s => 
    s.name.toLowerCase().includes("batang") || 
    s.name.toLowerCase().includes("cabang") || 
    s.name.toLowerCase().includes("ranting")),
  daun: symptoms.filter(s => 
    s.name.toLowerCase().includes("daun")),
  akar: symptoms.filter(s => 
    s.name.toLowerCase().includes("akar")),
  lainnya: symptoms.filter(s => 
    !s.name.toLowerCase().includes("buah") && 
    !s.name.toLowerCase().includes("biji") &&
    !s.name.toLowerCase().includes("batang") && 
    !s.name.toLowerCase().includes("cabang") && 
    !s.name.toLowerCase().includes("ranting") &&
    !s.name.toLowerCase().includes("daun") && 
    !s.name.toLowerCase().includes("akar"))
}

export function DiagnosticForm() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<Record<string, number>>({})
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()
  
  const handleSelectSymptom = (symptomId: string, certainty: number) => {
    setSelectedSymptoms(prev => {
      const updated = { ...prev }
      
      // If certainty is 0, remove the symptom
      if (certainty === 0) {
        delete updated[symptomId]
      } else {
        updated[symptomId] = certainty
      }
      
      return updated
    })
  }
  
  const handleSubmit = () => {
    // Convert selected symptoms to the format needed for calculation
    const userInputs = Object.entries(selectedSymptoms).map(([symptomId, userCertainty]) => ({
      symptomId,
      userCertainty
    }))
    
    // Calculate results
    const diseaseNames = Object.fromEntries(
      diseases.map(disease => [disease.id, disease.name])
    )
    
    const results = calculateDiagnosticResults(rules, userInputs, diseaseNames)
    
    // Save to history
    saveDiagnosticHistory(new Date(), userInputs, results)
    
    // Redirect to results page
    router.push("/hasil")
  }
  
  const filteredSymptoms = searchTerm
    ? symptoms.filter(s => 
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.id.toLowerCase().includes(searchTerm.toLowerCase()))
    : []
  
  const hasSelectedSymptoms = Object.keys(selectedSymptoms).length > 0
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Pilih Gejala yang Diamati</h2>
        <p className="text-muted-foreground">
          Geser slider untuk menunjukkan tingkat keyakinan Anda terhadap gejala yang diamati pada tanaman kakao.
        </p>
      </div>
      
      <div className="sticky top-[72px] z-10 bg-background pt-2 pb-4 border-b mb-6">
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
            <Button 
              onClick={() => setSelectedSymptoms({})}
              variant="outline"
              size="sm"
            >
              Reset
            </Button>
          </div>
        )}
      </div>
      
      {searchTerm ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredSymptoms.map(symptom => (
            <SymptomCard
              key={symptom.id}
              symptom={symptom}
              onSelectSymptom={handleSelectSymptom}
              initialValue={selectedSymptoms[symptom.id] || 0}
            />
          ))}
        </div>
      ) : (
        <Tabs defaultValue="buah">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="buah">Buah</TabsTrigger>
            <TabsTrigger value="batang">Batang</TabsTrigger>
            <TabsTrigger value="daun">Daun</TabsTrigger>
            <TabsTrigger value="akar">Akar</TabsTrigger>
            <TabsTrigger value="lainnya">Lainnya</TabsTrigger>
          </TabsList>
          
          <TabsContent value="buah" className="mt-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {categorizedSymptoms.buah.map(symptom => (
                <SymptomCard
                  key={symptom.id}
                  symptom={symptom}
                  onSelectSymptom={handleSelectSymptom}
                  initialValue={selectedSymptoms[symptom.id] || 0}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="batang" className="mt-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {categorizedSymptoms.batang.map(symptom => (
                <SymptomCard
                  key={symptom.id}
                  symptom={symptom}
                  onSelectSymptom={handleSelectSymptom}
                  initialValue={selectedSymptoms[symptom.id] || 0}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="daun" className="mt-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {categorizedSymptoms.daun.map(symptom => (
                <SymptomCard
                  key={symptom.id}
                  symptom={symptom}
                  onSelectSymptom={handleSelectSymptom}
                  initialValue={selectedSymptoms[symptom.id] || 0}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="akar" className="mt-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {categorizedSymptoms.akar.map(symptom => (
                <SymptomCard
                  key={symptom.id}
                  symptom={symptom}
                  onSelectSymptom={handleSelectSymptom}
                  initialValue={selectedSymptoms[symptom.id] || 0}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="lainnya" className="mt-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {categorizedSymptoms.lainnya.map(symptom => (
                <SymptomCard
                  key={symptom.id}
                  symptom={symptom}
                  onSelectSymptom={handleSelectSymptom}
                  initialValue={selectedSymptoms[symptom.id] || 0}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
      
      <div className="sticky bottom-0 py-4 bg-background border-t flex justify-end">
        <Button 
          onClick={handleSubmit}
          disabled={!hasSelectedSymptoms}
          size="lg"
        >
          Analisis Hasil
        </Button>
      </div>
    </div>
  )
}