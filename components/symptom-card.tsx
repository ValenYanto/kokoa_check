"use client"

import { Symptom } from "@/lib/data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Slider } from "./ui/slider"
import { Badge } from "./ui/badge"
import { cn } from "@/lib/utils"

interface SymptomCardProps {
  symptom: Symptom
  onSelectSymptom: (symptomId: string, certainty: number) => void
  value: number
}

export function SymptomCard({ symptom, onSelectSymptom, value }: SymptomCardProps) {
  // Controlled component: value prop drives slider
  const handleChange = (newValues: number[]) => {
    const newValue = newValues[0]
    onSelectSymptom(symptom.id, newValue)
  }

  return (
    <Card
      className={cn(
        "transition-all duration-200",
        value > 0 ? "border-green-500 dark:border-green-700 shadow-md" : ""
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            {symptom.name}
          </CardTitle>
          {value > 0 && (
            <Badge
              variant="outline"
              className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
            >
              Terpilih
            </Badge>
          )}
        </div>
        <CardDescription className="text-xs">{symptom.id}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-1 flex justify-between text-xs">
          <span>Tidak Yakin</span>
          <span>Sangat Yakin</span>
        </div>
        <Slider
          value={[value]}
          max={1}
          step={0.1}
          onValueChange={handleChange}
          className="my-2"
        />
        <div className="text-right text-sm font-medium">
          {value === 0 ? (
            <span className="text-muted-foreground">Tidak dipilih</span>
          ) : (
            <span className="text-green-600 dark:text-green-400">
              {(value * 100).toFixed(0)}%
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
