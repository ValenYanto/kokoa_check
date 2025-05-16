"use client"                                         // 1. Client Component

import { useState } from "react"                    // 2. useState
import { diseases } from "@/lib/data"
import {
  Card, CardContent, CardDescription,
  CardHeader, CardTitle
} from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function InfoPage() {
  const [query, setQuery] = useState("")             // state untuk query
  // 3. Filter diseases by name (case-insensitive)
  const filtered = diseases.filter((d) =>
    d.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Informasi Penyakit Tanaman Kakao
        </h1>
        <p className="text-muted-foreground">
          Pelajari berbagai jenis penyakit yang umum menyerang tanaman kakao
        </p>
      </div>
      
      {/* 4. SearchBar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Cari penyakit..."
          className="pl-9"
          value={query}                         // bind value
          onChange={(e) => setQuery(e.target.value)}  // update state
        />
      </div>
      
      {/* gunakan filtered, bukan diseases */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((disease) => (
          <Card
            key={disease.id}
            className="group hover:shadow-lg transition-all duration-200"
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{disease.name}</span>
                <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </CardTitle>
              <CardDescription>{disease.id}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {disease.description || "Tidak ada deskripsi tersedia."}
              </p>
              <Link href={`/info/${disease.id}`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground"
                >
                  Lihat Detail
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-muted-foreground">
            Tidak ada penyakit cocok dengan &ldquo;{query}&rdquo;.
          </p>
        )}
      </div>
    </div>
  )
}
