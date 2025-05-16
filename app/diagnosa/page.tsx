import { DiagnosticForm } from "@/components/diagnostic-form";

export default function DiagnosaPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Diagnosa Penyakit Tanaman Kakao</h1>
        <p className="text-muted-foreground">
          Pilih gejala-gejala yang Anda amati pada tanaman kakao dan tentukan tingkat keyakinan Anda.
        </p>
      </div>
      
      <DiagnosticForm />
    </div>
  );
}