"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  clearDiagnosticHistory,
  formatPercentage,
  getDiagnosticHistory,
  getCertaintyColor,
} from "@/lib/utils"
import Link from "next/link"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash2 } from "lucide-react"
import {
  PageTransition,
  SlideIn,
  AnimatedHeading,
  AnimatedCard,
  FadeIn,
} from "@/components/ui/animated-components"

export default function RiwayatPage() {
  const [history, setHistory] = useState<any[]>([])

  useEffect(() => {
    setHistory(getDiagnosticHistory())
  }, [])

  const handleClearHistory = () => {
    clearDiagnosticHistory()
    setHistory([])
  }

  if (history.length === 0) {
    return (
      <PageTransition>
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
          <SlideIn direction="right">
            <AnimatedHeading>
              <h1 className="text-2xl font-bold">Riwayat Diagnosa Kosong</h1>
              <p className="text-muted-foreground">
                Anda belum melakukan diagnosa atau riwayat telah dihapus.
              </p>
            </AnimatedHeading>
          </SlideIn>
          <FadeIn delay={0.2}>
            <Link href="/diagnosa">
              <Button>Mulai Diagnosa</Button>
            </Link>
          </FadeIn>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Header */}
        <SlideIn direction="left">
          <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
            <AnimatedHeading>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Riwayat Diagnosa</h1>
                <p className="text-muted-foreground">
                  Riwayat diagnosa yang telah Anda lakukan sebelumnya
                </p>
              </div>
            </AnimatedHeading>
            <FadeIn delay={0.2}>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Hapus Semua
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Hapus Semua Riwayat?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Tindakan ini tidak dapat dibatalkan. Semua riwayat diagnosa akan dihapus secara permanen.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction onClick={handleClearHistory}>
                      Hapus
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </FadeIn>
          </div>
        </SlideIn>

        {/* Cards */}
        <div className="space-y-4">
          {history.slice().reverse().map((item) => {
            const date = new Date(item.date).toLocaleString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
            return (
              <AnimatedCard key={item.id} delay={0.1}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Diagnosa pada {date}</CardTitle>
                    <CardDescription>
                      {item.userInputs.length} gejala dipilih
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {item.results.length > 0 ? (
                      <div className="space-y-4">
                        <h3 className="font-medium">Hasil Teratas:</h3>
                        <div className="space-y-2">
                          {item.results.map((result: any) => (
                            <div key={result.diseaseId} className="flex justify-between items-center border-b pb-2">
                              <span>{result.diseaseName}</span>
                              <span className={getCertaintyColor(result.certaintyFactor)}>
                                {formatPercentage(result.certaintyFactor)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="text-muted-foreground">Tidak ada hasil yang tersimpan.</p>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Link href="/hasil" className="w-full">
                      <Button variant="outline" className="w-full">
                        Lihat Detail
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </AnimatedCard>
            )
          })}
        </div>
      </div>
    </PageTransition>
  )
}
