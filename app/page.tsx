"ise client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Leaf, Microscope, ClipboardList, Info, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { diseases } from "@/lib/data";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const diseaseCategories = [
  { name: 'Penyakit Jamur', value: diseases.filter(d => d.description?.toLowerCase().includes('jamur')).length },
  { name: 'Hama', value: diseases.filter(d => d.description?.toLowerCase().includes('hama')).length },
  { name: 'Penyakit Lain', value: diseases.length - diseases.filter(d => 
    d.description?.toLowerCase().includes('jamur') || 
    d.description?.toLowerCase().includes('hama')
  ).length }
];

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))'];

export default function Home() {
  return (
    <div className="w-full space-y-8">
      <section className="w-full space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-16">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center mx-auto">
          <Leaf className="h-16 w-16 text-green-600" />
          <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
            Sistem Diagnosis Tanaman Kakao
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Identifikasi masalah pada tanaman kakao Anda dengan cepat dan akurat menggunakan sistem pakar berbasis certainty factor.
          </p>
          <div className="flex gap-4">
            <Link href="/diagnosa">
              <Button size="lg">Mulai Diagnosa</Button>
            </Link>
            <Link href="/info">
              <Button variant="outline" size="lg">Pelajari Lebih Lanjut</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full py-8 md:py-12 lg:py-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card>
              <CardHeader>
                <Microscope className="h-10 w-10 text-green-600 mb-2" />
                <CardTitle>Diagnosa Akurat</CardTitle>
                <CardDescription>
                  Menggunakan metode Certainty Factor untuk memberikan hasil diagnosa yang akurat
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Sistem ini menganalisis gejala-gejala yang Anda masukkan dan menghitung kemungkinan penyakit atau hama dengan tingkat keyakinan berdasarkan basis pengetahuan pakar.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <ClipboardList className="h-10 w-10 text-green-600 mb-2" />
                <CardTitle>44 Gejala & 15 Penyakit</CardTitle>
                <CardDescription>
                  Basis pengetahuan yang komprehensif untuk identifikasi masalah
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Mencakup 44 gejala yang umum ditemukan pada tanaman kakao dan 15 jenis penyakit atau hama yang dapat diidentifikasi dengan tepat.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Info className="h-10 w-10 text-green-600 mb-2" />
                <CardTitle>Saran Penanganan</CardTitle>
                <CardDescription>
                  Dapatkan rekomendasi untuk mengatasi masalah
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Setiap hasil diagnosa disertai dengan informasi tentang penyakit dan saran penanganan untuk membantu Anda mengatasi masalah pada tanaman kakao.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="w-full py-12 bg-muted/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter">
                Distribusi Jenis Penyakit
              </h2>
              <p className="text-muted-foreground">
                Sistem kami mencakup berbagai jenis penyakit dan hama yang umum menyerang tanaman kakao.
              </p>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={diseaseCategories}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {diseaseCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>
      
      <section className="w-full border-t py-12">
        <div className="container mx-auto space-y-6 text-center">
          <h2 className="text-3xl font-bold tracking-tighter">
            Mulai Diagnosa Tanaman Kakao Anda
          </h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Tanaman kakao yang sehat menghasilkan buah berkualitas tinggi. Identifikasi masalah sejak dini untuk meningkatkan produktivitas.
          </p>
          <Link href="/diagnosa">
            <Button size="lg" className="gap-2">
              Mulai Diagnosa
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}