"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Leaf,
  Microscope,
  ClipboardList,
  Info,
  ArrowRight,
  ChartArea,
} from "lucide-react";
import {
  AnimatedCard,
  AnimatedHeading,
  FadeIn,
  PageTransition,
  PulseAnimation,
  SlideIn,
} from "@/components/ui/animated-components";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { diseases } from "@/lib/data";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { motion } from "framer-motion";

const diseaseCategories = [
  {
    name: "Penyakit Jamur",
    value: diseases.filter((d) =>
      d.description?.toLowerCase().includes("jamur")
    ).length,
  },
  {
    name: "Hama",
    value: diseases.filter((d) => d.description?.toLowerCase().includes("hama"))
      .length,
  },
  {
    name: "Penyakit Lain",
    value:
      diseases.length -
      diseases.filter(
        (d) =>
          d.description?.toLowerCase().includes("jamur") ||
          d.description?.toLowerCase().includes("hama")
      ).length,
  },
];

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
];

export default function Home() {
  return (
    <PageTransition>
      <div className="w-full space-y-8">
        <section className="w-full space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-16">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center mx-auto">
            <PulseAnimation>
              <Leaf className="h-16 w-16 text-green-600" />
            </PulseAnimation>
            
            <AnimatedHeading>
              <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
                Sistem Diagnosis Tanaman Kakao
              </h1>
            </AnimatedHeading>
            
            <FadeIn delay={0.3}>
              <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                Identifikasi masalah pada tanaman kakao Anda dengan cepat dan akurat
                menggunakan sistem pakar berbasis certainty factor.
              </p>
            </FadeIn>
            
            <FadeIn delay={0.5}>
              <div className="flex gap-4">
                <Link href="/diagnosa">
                  <Button size="lg" className="relative overflow-hidden group">
                    <span className="relative z-10">Mulai Diagnosa</span>
                    <motion.div
                      className="absolute inset-0 bg-green-700"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ zIndex: 5 }}
                    />
                  </Button>
                </Link>
                <Link href="/info">
                  <Button variant="outline" size="lg">
                    Pelajari Lebih Lanjut
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="w-full py-8 md:py-12 lg:py-16">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <AnimatedCard delay={0.1}>
                <Card>
                  <CardHeader>
                    <Microscope className="h-10 w-10 text-green-600 mb-2" />
                    <CardTitle>Diagnosa Akurat</CardTitle>
                    <CardDescription>
                      Menggunakan metode Certainty Factor untuk memberikan hasil
                      diagnosa yang akurat
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Sistem ini menganalisis gejala-gejala yang Anda masukkan dan
                      menghitung kemungkinan penyakit atau hama dengan tingkat
                      keyakinan berdasarkan basis pengetahuan pakar.
                    </p>
                  </CardContent>
                </Card>
              </AnimatedCard>

              <AnimatedCard delay={0.2}>
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
                      Mencakup 44 gejala yang umum ditemukan pada tanaman kakao dan
                      15 jenis penyakit atau hama yang dapat diidentifikasi dengan
                      tepat.
                    </p>
                  </CardContent>
                </Card>
              </AnimatedCard>

              <AnimatedCard delay={0.3}>
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
                      Setiap hasil diagnosa disertai dengan informasi tentang
                      penyakit dan saran penanganan untuk membantu Anda mengatasi
                      masalah pada tanaman kakao.
                    </p>
                  </CardContent>
                </Card>
              </AnimatedCard>
            </div>
          </div>
        </section>

        <SlideIn direction="right" delay={0.2}>
          <section>
            <Card>
              <CardHeader className="flex flex-col items-center text-center">
                <ChartArea className="h-10 w-10 text-green-600 mb-2" />
                <CardTitle>Distribusi Jenis Penyakit</CardTitle>
                <CardDescription>
                  Sistem kami mencakup berbagai jenis penyakit dan hama yang umum
                  menyerang tanaman kakao.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <motion.div 
                  className="h-[300px] w-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={diseaseCategories}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {diseaseCategories.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Legend align="center" verticalAlign="bottom" />
                    </PieChart>
                  </ResponsiveContainer>
                </motion.div>
              </CardContent>
            </Card>
          </section>
        </SlideIn>

        <FadeIn delay={0.3}>
          <section className="w-full border-t py-12">
            <div className="container mx-auto space-y-6 text-center">
              <h2 className="text-3xl font-bold tracking-tighter">
                Mulai Diagnosa Tanaman Kakao Anda
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Tanaman kakao yang sehat menghasilkan buah berkualitas tinggi.
                Identifikasi masalah sejak dini untuk meningkatkan produktivitas.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/diagnosa">
                  <Button size="lg" className="gap-2 my-2">
                    Mulai Diagnosa
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.div>
                  </Button>
                </Link>
              </motion.div>
            </div>
          </section>
        </FadeIn>
      </div>
    </PageTransition>
  );
}