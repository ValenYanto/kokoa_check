// Symptom data
export interface Symptom {
  id: string;
  name: string;
  description?: string;
  image?: string;
}

// Disease data
export interface Disease {
  id: string;
  name: string;
  description?: string;
  image?: string;
  remedies?: string[];
}

// Rule with certainty factor
export interface Rule {
  symptomId: string;
  certaintyFactor: number;
}

// Diagnostic result
export interface DiagnosticResult {
  diseaseId: string;
  diseaseName: string;
  certaintyFactor: number;
  rules?: Rule[];
}

// Symptom input from user
export interface SymptomInput {
  symptomId: string;
  userCertainty: number;
}

// Symptoms (gejala)
export const symptoms: Symptom[] = [
  { id: "G1", name: "Warna Buah Berubah Menjadi Coklat Kehitaman" },
  { id: "G2", name: "Biji menjadi Busuk" },
  { id: "G3", name: "Buah Menjadi Busuk dan Basah" },
  { id: "G4", name: "Batangnya Berwarna lebih gelap/kehitaman" },
  { id: "G5", name: "Batang Membengkak" },
  { id: "G6", name: "Batangnya Busuk dan Basah" },
  { id: "G7", name: "Warna Daun menguning dengan berbecak-becak hijau kecil" },
  { id: "G8", name: "Daun Gugur" },
  { id: "G9", name: "Ranting Terlihat tanpa daun" },
  { id: "G10", name: "Permukaan kulit ranting menjadi kasar dan belang" },
  { id: "G11", name: "Daun Layu" },
  { id: "G12", name: "Daun Mengering" },
  { id: "G13", name: "Terdapat Benang-benang Putih pada Bagian Akar" },
  { id: "G14", name: "Terdapat Selaput Berwarna Merah Coklat Tua Pada Akar" },
  { id: "G15", name: "Terdapat Kerak Tanah Pada Akar" },
  { id: "G16", name: "Akar menjadi busuk, basah, lunak, dan berair" },
  { id: "G17", name: "Warna Buah berubah menjadi hijau & Terdapat becak-becak merah jambu/hijau tua" },
  { id: "G18", name: "Akar Membengkak" },
  { id: "G19", name: "Buah Menjadi Bengkak dan Berlendir" },
  { id: "G20", name: "Ranting tampak seperti sapu dan menghitam" },
  { id: "G21", name: "Buah Berwarna Coklat diliputi jamur berwarna putih kotor" },
  { id: "G22", name: "Pada Buah Mentah jika dibelah membujur, terdapat garis coklat, kelabu/hitam" },
  { id: "G23", name: "Biji menjadi Hancur" },
  { id: "G24", name: "Pada Ranting tampak mengkilap sangat mirip seperti sarang laba-laba, dan dibagian bawahnya berwarna hitam" },
  { id: "G25", name: "Terdapat Bintik/Bercak Cokelat tidak teratur pada daun muda" },
  { id: "G26", name: "Buah Menjadi Kecil" },
  { id: "G27", name: "Buah Menjadi Keras" },
  { id: "G28", name: "Buah Menjadi Kering" },
  { id: "G29", name: "Warna Buah Berubah Menjadi Belang Kuning Hijau" },
  { id: "G30", name: "Pada Permukaan Kulit terdapat lubang gerekan kecil" },
  { id: "G31", name: "Biji Kakao berukuran kecil" },
  { id: "G32", name: "Biji Kakao tidak bernas" },
  { id: "G33", name: "Biji Kakao Berwarna kehitaman" },
  { id: "G34", name: "Biji Kakao saling melekat satu dengan lainnya" },
  { id: "G35", name: "Pada permukaan buah terdapat bercak – bercak bekas tusukan berwarna cokelat kehitaman" },
  { id: "G36", name: "Ranting Mengering dan Meranggas" },
  { id: "G37", name: "Permukaan Kulit Buah Retak dan Berkerut" },
  { id: "G38", name: "Cabang Berlubang" },
  { id: "G39", name: "Daun Berlubang" },
  { id: "G40", name: "Ranting Layu" },
  { id: "G41", name: "Ranting Kering" },
  { id: "G42", name: "Ranting Mati" },
  { id: "G43", name: "Proses Pembentukan Buah Kakao Lambat" },
  { id: "G44", name: "Buah Berlubang" }
];

// Diseases (penyakit)
export const diseases: Disease[] = [
  { 
    id: "P1", 
    name: "Busuk Buah", 
    description: "Penyakit busuk buah kakao disebabkan oleh jamur Phytophthora palmivora yang menyerang buah kakao.",
    remedies: [
      "Pemangkasan cabang untuk meningkatkan sirkulasi udara",
      "Penyemprotan fungisida berbahan tembaga",
      "Pengumpulan dan pemusnahan buah yang terinfeksi"
    ]
  },
  { 
    id: "P2", 
    name: "Kanker Batang", 
    description: "Penyakit kanker batang disebabkan oleh jamur Phytophthora palmivora yang menyerang bagian batang kakao.",
    remedies: [
      "Mengerok bagian yang terinfeksi hingga jaringan yang sehat",
      "Pemberian fungisida pada bagian yang sudah dikerok",
      "Mengecat batang dengan kapur untuk mencegah serangan"
    ]
  },
  { 
    id: "P3", 
    name: "Vascular Streak Dieback (VSD)", 
    description: "Penyakit VSD disebabkan oleh jamur Oncobasidium theobromae yang menyerang pembuluh xylem tanaman kakao.",
    remedies: [
      "Pemangkasan ranting yang terinfeksi",
      "Penanaman klon tahan VSD",
      "Penggunaan fungisida sistemik"
    ]
  },
  { 
    id: "P4", 
    name: "Penyakit Akar", 
    description: "Penyakit akar disebabkan oleh beberapa jenis jamur yang menyerang sistem perakaran tanaman kakao.",
    remedies: [
      "Menjaga drainase yang baik",
      "Aplikasi fungisida pada area perakaran",
      "Pencabutan dan pemusnahan tanaman yang sudah parah"
    ]
  },
  { 
    id: "P5", 
    name: "Tunas Bengkak", 
    description: "Penyakit tunas bengkak disebabkan oleh infeksi jamur yang menyebabkan pembengkakan pada tunas tanaman.",
    remedies: [
      "Pemangkasan tunas yang terinfeksi",
      "Penyemprotan fungisida",
      "Menjaga kebersihan kebun"
    ]
  },
  { 
    id: "P6", 
    name: "Penyakit Sapu", 
    description: "Penyakit sapu disebabkan oleh jamur yang menginfeksi dan mengubah struktur ranting menjadi seperti sapu.",
    remedies: [
      "Pemangkasan ranting yang terinfeksi",
      "Penyemprotan fungisida",
      "Sanitasi kebun"
    ]
  },
  { 
    id: "P7", 
    name: "Busuk Buah Monilia", 
    description: "Penyakit busuk buah yang disebabkan oleh jamur Moniliophthora roreri yang menyerang buah kakao.",
    remedies: [
      "Pemanenan buah secara teratur",
      "Pemusnahan buah yang terinfeksi",
      "Penyemprotan fungisida preventif"
    ]
  },
  { 
    id: "P8", 
    name: "Jamur Upas", 
    description: "Penyakit yang disebabkan oleh jamur Upasia salmonicolor yang menyerang batang dan cabang tanaman kakao.",
    remedies: [
      "Pemangkasan cabang yang terinfeksi",
      "Pengolesan fungisida pada bagian yang terinfeksi",
      "Menjaga sanitasi kebun"
    ]
  },
  { 
    id: "P9", 
    name: "Penyakit Antraknosa", 
    description: "Penyakit yang disebabkan oleh jamur Colletotrichum gloeosporioides yang menyerang daun dan buah kakao.",
    remedies: [
      "Penyemprotan fungisida",
      "Pemangkasan bagian yang terinfeksi",
      "Menjaga kelembaban yang sesuai"
    ]
  },
  { 
    id: "P10", 
    name: "Penggerek Buah Kakao", 
    description: "Serangan hama penggerek buah kakao (Conopomorpha cramerella) yang merusak buah dan biji kakao.",
    remedies: [
      "Panen buah secara teratur",
      "Penggunaan insektisida yang sesuai",
      "Sanitasi lingkungan kebun"
    ]
  },
  { 
    id: "P11", 
    name: "Kepik Penghisap Buah", 
    description: "Serangan hama kepik yang menghisap cairan dari buah kakao dan menyebabkan kerusakan.",
    remedies: [
      "Penyemprotan insektisida",
      "Penggunaan musuh alami",
      "Sanitasi kebun"
    ]
  },
  { 
    id: "P12", 
    name: "Penggerek Cabang", 
    description: "Serangan hama penggerek yang merusak cabang tanaman kakao.",
    remedies: [
      "Pemangkasan cabang yang terserang",
      "Penyemprotan insektisida",
      "Pemasangan perangkap"
    ]
  },
  { 
    id: "P13", 
    name: "Ulat Kilan/Jengkal", 
    description: "Serangan hama ulat yang memakan daun tanaman kakao.",
    remedies: [
      "Penyemprotan insektisida",
      "Penggunaan musuh alami",
      "Pemantauan populasi secara teratur"
    ]
  },
  { 
    id: "P14", 
    name: "Kumbang Daun Crysomelidae", 
    description: "Serangan hama kumbang yang memakan daun tanaman kakao.",
    remedies: [
      "Penyemprotan insektisida",
      "Penggunaan perangkap",
      "Sanitasi kebun"
    ]
  },
  { 
    id: "P15", 
    name: "Tikus dan Tupai", 
    description: "Serangan hewan pengerat yang memakan buah dan merusak tanaman kakao.",
    remedies: [
      "Pemasangan perangkap",
      "Penggunaan rodentisida",
      "Pemasangan pagar penghalang"
    ]
  }
];

// Rules (aturan) mapping diseases to symptoms with certainty factors
export const rules: Record<string, Rule[]> = {
  "P1": [{"symptomId": "G1", "certaintyFactor": 0.5}, {"symptomId": "G2", "certaintyFactor": 0.5}, {"symptomId": "G3", "certaintyFactor": 0.75}],
  "P2": [{"symptomId": "G4", "certaintyFactor": 0.25}, {"symptomId": "G5", "certaintyFactor": 0.25}, {"symptomId": "G6", "certaintyFactor": 0.5}],
  "P3": [{"symptomId": "G7", "certaintyFactor": 0.75}, {"symptomId": "G8", "certaintyFactor": 0.75}, {"symptomId": "G9", "certaintyFactor": 0.75}, {"symptomId": "G10", "certaintyFactor": 0.25}],
  "P4": [{"symptomId": "G7", "certaintyFactor": 0.5}, {"symptomId": "G11", "certaintyFactor": 0.5}, {"symptomId": "G12", "certaintyFactor": 0.5}, {"symptomId": "G8", "certaintyFactor": 0.25}, {"symptomId": "G13", "certaintyFactor": 0.5}, {"symptomId": "G14", "certaintyFactor": 0.5}, {"symptomId": "G15", "certaintyFactor": 0.5}, {"symptomId": "G16", "certaintyFactor": 0.5}],
  "P5": [{"symptomId": "G17", "certaintyFactor": 0.25}, {"symptomId": "G6", "certaintyFactor": 0.25}, {"symptomId": "G18", "certaintyFactor": 0.25}],
  "P6": [{"symptomId": "G19", "certaintyFactor": 0.25}, {"symptomId": "G20", "certaintyFactor": 0.25}],
  "P7": [{"symptomId": "G19", "certaintyFactor": 0.25}, {"symptomId": "G21", "certaintyFactor": 0.25}, {"symptomId": "G22", "certaintyFactor": 0.25}, {"symptomId": "G2", "certaintyFactor": 0.25}, {"symptomId": "G23", "certaintyFactor": 0.25}],
  "P8": [{"symptomId": "G12", "certaintyFactor": 0.25}, {"symptomId": "G13", "certaintyFactor": 0.25}, {"symptomId": "G14", "certaintyFactor": 0.25}, {"symptomId": "G24", "certaintyFactor": 0.25}],
  "P9": [{"symptomId": "G25", "certaintyFactor": 0.25}, {"symptomId": "G7", "certaintyFactor": 0.25}, {"symptomId": "G14", "certaintyFactor": 0.25}, {"symptomId": "G13", "certaintyFactor": 0.25}, {"symptomId": "G12", "certaintyFactor": 0.25}, {"symptomId": "G26", "certaintyFactor": 0.25}, {"symptomId": "G27", "certaintyFactor": 0.25}, {"symptomId": "G28", "certaintyFactor": 0.25}],
  "P10": [{"symptomId": "G29", "certaintyFactor": 0.75}, {"symptomId": "G30", "certaintyFactor": 0.5}, {"symptomId": "G31", "certaintyFactor": 0.5}, {"symptomId": "G32", "certaintyFactor": 0.25}, {"symptomId": "G33", "certaintyFactor": 0.25}, {"symptomId": "G34", "certaintyFactor": 0.75}],
  "P11": [{"symptomId": "G35", "certaintyFactor": 0.5}, {"symptomId": "G11", "certaintyFactor": 0.25}, {"symptomId": "G8", "certaintyFactor": 0.25}, {"symptomId": "G36", "certaintyFactor": 0.5}, {"symptomId": "G37", "certaintyFactor": 0.25}, {"symptomId": "G28", "certaintyFactor": 0.5}],
  "P12": [{"symptomId": "G11", "certaintyFactor": 0.5}, {"symptomId": "G13", "certaintyFactor": 0.5}, {"symptomId": "G38", "certaintyFactor": 0.75}],
  "P13": [{"symptomId": "G39", "certaintyFactor": 0.5}, {"symptomId": "G40", "certaintyFactor": 0.25}, {"symptomId": "G41", "certaintyFactor": 0.25}, {"symptomId": "G42", "certaintyFactor": 0.25}],
  "P14": [{"symptomId": "G43", "certaintyFactor": 0.25}, {"symptomId": "G12", "certaintyFactor": 0.25}, {"symptomId": "G11", "certaintyFactor": 0.25}, {"symptomId": "G39", "certaintyFactor": 0.5}],
  "P15": [{"symptomId": "G44", "certaintyFactor": 0.5}]
};