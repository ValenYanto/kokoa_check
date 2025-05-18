"use client"

import { useState, useEffect } from "react"
import { diseases } from "@/lib/data"
import {
  Card, CardContent, CardDescription,
  CardHeader, CardTitle
} from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  AnimatedCard, 
  AnimatedHeading, 
  AnimatedList, 
  AnimatedListItem, 
  PageTransition 
} from "@/components/ui/animated-components"
import { motion } from "framer-motion"

export default function InfoPage() {
  const [query, setQuery] = useState("")
  const [mounted, setMounted] = useState(false)
  
  // Filter diseases by name (case-insensitive)
  const filtered = diseases.filter((d) =>
    d.name.toLowerCase().includes(query.toLowerCase())
  )
  
  // Set mounted after initial render
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Prevent hydration mismatch
  if (!mounted) {
    return null
  }

  return (
    <PageTransition>
      <div className="space-y-6">
        <AnimatedHeading>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Informasi Penyakit Tanaman Kakao
            </h1>
            <p className="text-muted-foreground">
              Pelajari berbagai jenis penyakit yang umum menyerang tanaman kakao
            </p>
          </div>
        </AnimatedHeading>
        
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cari penyakit..."
            className="pl-9"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </motion.div>
        
        <AnimatedList>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((disease, index) => (
              <AnimatedListItem key={disease.id}>
                <Card
                  className="group hover:shadow-lg transition-all duration-200"
                >
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{disease.name}</span>
                      <motion.div
                        initial={{ x: -5, opacity: 0 }}
                        whileHover={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </motion.div>
                    </CardTitle>
                    <CardDescription>{disease.id}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {disease.description || "Tidak ada deskripsi tersedia."}
                    </p>
                    <Link href={`/info/${disease.id}`}>
                      <motion.div whileTap={{ scale: 0.97 }}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full group-hover:bg-primary group-hover:text-primary-foreground"
                        >
                          Lihat Detail
                        </Button>
                      </motion.div>
                    </Link>
                  </CardContent>
                </Card>
              </AnimatedListItem>
            ))}
            {filtered.length === 0 && (
              <motion.p 
                className="col-span-full text-center text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Tidak ada penyakit cocok dengan &ldquo;{query}&rdquo;.
              </motion.p>
            )}
          </div>
        </AnimatedList>
      </div>
    </PageTransition>
  )
}