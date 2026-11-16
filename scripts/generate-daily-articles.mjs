import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const artikelDir = path.join(projectRoot, 'src', 'content', 'articles');

function getIsoDate(date = new Date()) {
  const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
  const wibDate = new Date(utc + (3600000 * 7));
  const year = wibDate.getFullYear();
  const month = String(wibDate.getMonth() + 1).padStart(2, '0');
  const day = String(wibDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const NATIONWIDE_TABLE = `## Tabel Jangkauan Fabrikasi & Pengiriman Unit Incinerator Se-Indonesia

AtasiLimbah melayani perancangan rekayasa termal, uji emisi cerobong isokinetik, hingga instalasi unit siap pakai (*turnkey project*) ke seluruh wilayah Nusantara:

| Wilayah / Koridor | Cakupan Kawasan Sasaran | Spesialisasi Tipe Unit | Moda Pengiriman Logistik | Estimasi Lead Time | Status Layanan |
|---|---|---|---|---|:---:|
| **Jabodetabek & Banten** | Jakarta, Cikarang, Karawang, Cilegon, Tangerang | Incinerator B3 Medis, Waste-to-Energy Industri | Armada Truk Tronton Lowbed | 1 – 2 Hari Kerja | Siap Survei & Pasang |
| **Jawa Barat & Bandung** | Bandung, Bogor, Sukabumi, Cirebon, Purwakarta | Incinerator Sampah Domestik TPS3R, Biochar | Truk Fuso Khusus Mesin Berat | 1 – 2 Hari Kerja | Siap Survei & Pasang |
| **Jawa Tengah & DIY** | Semarang, Solo, Cilacap, Magelang, Kendal KIK | Dual Chamber B3, Cyclone Wet Scrubber | Truk Ekspedisi Kargo Darat | 1 – 3 Hari Kerja | Siap Survei & Pasang |
| **Jawa Timur** | Surabaya SIER, Gresik JIIPE, Sidoarjo, Malang | Incinerator Mobile Container, Biochar Pirolisis | Truk Tronton & Self-Loader | 1 – 3 Hari Kerja | Siap Survei & Pasang |
| **Sumatera Hub** | Medan KIM, Batam, Pekanbaru, Palembang, Lampung | Incinerator PKS Sawit, Unit Medis RSUD | Truk Lintas & Kapal Feri Ro-Ro | 3 – 6 Hari Kerja | Siap Survei & Pasang |
| **Kalimantan & IKN** | Balikpapan IKN, Samarinda, Bontang, Banjarmasin | Containerized Camp Tambang, Unit Wet Scrubber | Kargo Peti Kemas Pelabuhan Surabaya | 5 – 8 Hari Kerja | Siap Survei & Pasang |
| **Sulawesi & Maluku** | Morowali IMIP, Makassar KIMA, Manado, Ambon | Incinerator Smelter Nikel, Limbah Medis Kepulauan | Kapal Pelni & Peti Kemas Laut | 6 – 10 Hari Kerja | Siap Survei & Pasang |
| **Bali & Nusa Tenggara** | Denpasar, Nusa Penida, Mandalika Lombok, Kupang | Zero Smoke Resort Wisata, Incinerator TPS3R | Truk Ekspedisi & Penyeberangan Feri | 3 – 5 Hari Kerja | Siap Survei & Pasang |
| **Papua Raya** | Timika Grasberg, Sorong, Jayapura, Merauke | Heavy Duty Mobile Incinerator Camp Tambang | Kargo Kapal Tol Laut & Kontainer Cepat | 8 – 15 Hari Kerja | Siap Survei & Pasang |`;

const STRATEGIC_LOCATIONS = [
  { name: 'Jakarta & Kepulauan Seribu', region: 'DKI Jakarta & Gugusan Pulau Resort', province: 'DKI Jakarta', focus: 'limbah medis rumah sakit rujukan tipe-A dan sampah domestik pulau terpencil tanpa TPA', challenge: 'keterbatasan lahan dan regulasi emisi perkotaan yang sangat ketat bebas asap hitam' },
  { name: 'Cikarang & Bekasi', region: 'Kawasan Industri Jababeka, EJIP & MM2100', province: 'Jawa Barat', focus: 'limbah padat manufaktur otomotif, kemasan plastik, dan lumpur IPAL industri kering', challenge: 'beban timbulan limbah industri tonase tinggi dan kebutuhan sertifikasi KLHK' },
  { name: 'Karawang', region: 'Kawasan Industri KIIC, Suryacipta & Bukit Indah', province: 'Jawa Barat', focus: 'destruksi limbah B3 padat pabrik perakitan dan sisa potongan material produksi', challenge: 'efisiensi konsumsi bahan bakar burner dan monitoring suhu ruang bakar stabil' },
  { name: 'Bogor & Puncak', region: 'Kawasan Wisata Puncak, Ciawi & Sentul', province: 'Jawa Barat', focus: 'sampah organik restoran, hotel resort pegunungan, dan TPS3R perumahan padat', challenge: 'kelembapan kadar air sampah sisa makanan tinggi dan bau pembakaran' },
  { name: 'Bandung Raya', region: 'Cimahi, Gedebage, Batujajar & Lembang', province: 'Jawa Barat', focus: 'sampah pasar tradisional berair, limbah kain perca tekstil, dan faskes puskesmas', challenge: 'kelebihan muatan TPA Sarimukti menuntut penanganan sampah mandiri di tingkat kecamatan' },
  { name: 'Cirebon & Indramayu', region: 'Kawasan Pantura Cirebon, Kanci & Balongan', province: 'Jawa Barat', focus: 'limbah padat industri pesisir, perikanan tangkap, dan klinik kesehatan daerah', challenge: 'korosi uap garam air laut pada cerobong dan penanganan abu terbang' },
  { name: 'Semarang & Kendal', region: 'Kawasan Industri Candi, Wijayakusuma & KIK', province: 'Jawa Tengah', focus: 'limbah garmen ekspor, sampah padat kawasan industri terpadu, dan rumah sakit', challenge: 'kebutuhan operasi continuous 16 jam kerja dengan pembersihan kerak abu otomatis' },
  { name: 'Solo / Surakarta', region: 'Solo Baru, Jebres & Kawasan Palur Sukoharjo', province: 'Jawa Tengah', focus: 'TPS-3R kelurahan mandiri, limbah medis klinik pratama, dan sampah pasar', challenge: 'penolakan warga terhadap asap cerobong menuntut wet scrubber tanpa asap kasat mata' },
  { name: 'Surabaya', region: 'Kawasan SIER Rungkut, Margomulyo & Kenjeran', province: 'Jawa Timur', focus: 'limbah B3 faskes rumah sakit daerah, perkantoran komersial, dan industri kimia', challenge: 'standar baku mutu emisi partikulat di bawah 50 mg/Nm3 sesuai Permen LHK' },
  { name: 'Gresik & Sidoarjo', region: 'Kawasan JIIPE Manyar, Berbek Industri & Waru', province: 'Jawa Timur', focus: 'residu industri kemasan, sludge limbah pabrik, dan sampah domestik pergudangan', challenge: 'titik leleh abu rendah yang menuntut batu tahan api alumina tinggi anti-slagging' },
  { name: 'Malang & Batu', region: 'Klojen, Lowokwaru & Kawasan Wisata Kota Batu', province: 'Jawa Timur', focus: 'sampah hotel wisata, sisa sayuran pasar induk, dan fasilitas kampus universitas', challenge: 'lingkungan wisata bersih menuntut incinerator higienis tanpa menimbulkan bau menyengat' },
  { name: 'Banyuwangi & Jember', region: 'Kawasan Agribisnis Ketapang, Songgon & Tanggul', province: 'Jawa Timur', focus: 'limbah biomassa perkebunan, tempurung kelapa menjadi biochar, dan sampah pedesaan', challenge: 'nilai tambah ekonomi abu biochar untuk pembenah tanah pertanian organik' },
  { name: 'Denpasar & Badung', region: 'Kuta, Nusa Dua, Seminyak & Sanur', province: 'Bali', focus: 'resort hotel bintang lima, beach club, villa komersial, dan pulau Nusa Penida', challenge: 'larangan pembuangan sampah ke TPA Suwung menuntut solusi musnah tuntas di properti' },
  { name: 'Mataram & Mandalika', region: 'Kawasan KEK Mandalika, Senggigi & Praya Lombok', province: 'Nusa Tenggara Barat', focus: 'event pariwisata internasional sirkuit balap, hotel, dan puskesmas wisata', challenge: 'fluktuasi lonjakan timbulan sampah saat event balap besar berlangsung' },
  { name: 'Medan & Deli Serdang', region: 'Kawasan Industri Medan (KIM 1-4) & Mabar', province: 'Sumatera Utara', focus: 'rumah sakit rujukan regional Sumatera, pabrik farmasi, dan oleokimia', challenge: 'pemusnahan jarum suntik, infus, dan jaringan patologi dengan suhu di atas 1.000°C' },
  { name: 'Batam & Bintan', region: 'Batamindo Mukakuning, Kabil & Kawasan Lagoi', province: 'Kepulauan Riau', focus: 'industri perakitan manufaktur, galangan kapal offshore, dan resort terisolasi', challenge: 'biaya pengiriman limbah keluar pulau mahal menuntut pengolahan mandiri in-situ' },
  { name: 'Pekanbaru & Dumai', region: 'Arengka, Rumbai, Pelintung & Minas', province: 'Riau', focus: 'camp perumahan perkebunan kelapa sawit, limbah klinik kebun, dan limbah CPO', challenge: 'lokasi remote pelosok kebun sawit yang membutuhkan incinerator mandiri bahan bakar solar' },
  { name: 'Palembang', region: 'Kertapati, Sungai Gerong & Plaju', province: 'Sumatera Selatan', focus: 'sampah domestik permukiman tepian Sungai Musi, TPS3R, dan rumah sakit umum', challenge: 'kadar air sampah sungai tinggi yang membutuhkan burner pengering awal' },
  { name: 'Bandar Lampung', region: 'Pelabuhan Panjang, Natar & Tarahan', province: 'Lampung', focus: 'karantina pelabuhan ekspor impor, rumah sakit provinsi, dan sentra industri pakan', challenge: 'pemusnahan sisa bahan organik karantina berisiko penyakit menular dari kapal luar' },
  { name: 'Balikpapan (IKN Hub)', region: 'Kariangau Interport, Samboja & Sepaku IKN', province: 'Kalimantan Timur', focus: 'penanganan sampah ramah lingkungan kawasan inti IKN Nusantara dan camp proyek', challenge: 'target zero emission dan konsep smart green city tanpa pembakaran liar terbuka' },
  { name: 'Samarinda & Kutai Barat', region: 'Palaran, Sungai Kunjang & Melak', province: 'Kalimantan Timur', focus: 'camp mess pekerja tambang batubara, klinik site tambang, dan logistik tongkang', challenge: 'lokasi pedalaman sungai yang sulit dijangkau armada angkut sampah kota' },
  { name: 'Bontang & Sangatta', region: 'Kawasan Pupuk Kaltim, LNG Badak & Pit KPC', province: 'Kalimantan Timur', focus: 'limbah industri petrokimia, limbah domestik kompleks perumahan karyawan pabrik', challenge: 'standar Keselamatan dan Kesehatan Kerja (K3) serta izin lingkungan migas yang ketat' },
  { name: 'Banjarmasin & Banjarbaru', region: 'Trisakti, Liang Anggang & Martapura', province: 'Kalimantan Selatan', focus: 'sampah pasar terapung, puskesmas lahan basah rawa gambut, dan TPS3R kota', challenge: 'tanah rawa berair yang tidak memungkinkan pembuatan TPA gali urug konvensional' },
  { name: 'Pontianak & Ketapang', region: 'Siantan, Rasau Jaya & Kawasan Smelter Tayan', province: 'Kalimantan Barat', focus: 'limbah biomassa pabrik kelapa sawit, limbah medis RSUD, dan camp mess bauksit', challenge: 'pengolahan limbah organik menjadi arang biochar penyubur tanah masam gambut' },
  { name: 'Makassar & Maros', region: 'Kawasan KIMA Daya, Daya & Bandara Sultan Hasanuddin', province: 'Sulawesi Selatan', focus: 'limbah medis faskes rujukan utama Indonesia Timur dan kargo karantina bandara', challenge: 'volume limbah medis infeksius harian tinggi yang wajib dimusnahkan dalam 24 jam' },
  { name: 'Morowali', region: 'Kawasan Industri IMIP Bahodopi & Fatufia', province: 'Sulawesi Tengah', focus: 'camp puluhan ribu karyawan smelter nikel, limbah medis poliklinik, dan kantin mess', challenge: 'volume sampah sisa makanan dan plastik harian masif di area terisolasi jauh dari kota' },
  { name: 'Manado & Bitung', region: 'Kawasan Wisata Bunaken, Malalayang & KEK Bitung', province: 'Sulawesi Utara', focus: 'sampah pengolahan perikanan pelabuhan, limbah rumah sakit, dan pulau wisata bahari', challenge: 'menjaga kebersihan laut dan terumbu karang dari pencemaran sampah plastik terapung' },
  { name: 'Ambon & Maluku Tengah', region: 'Teluk Ambon, Passo & Pulau Seram', province: 'Maluku', focus: 'RSUD kepulauan, sampah domestik kota pesisir, dan fasilitas karantina pelabuhan', challenge: 'kendala geografis pulau-pulau yang menuntut unit incinerator kompak mudah dipindah' },
  { name: 'Sorong & Raja Ampat', region: 'Kawasan Wisata Waisai, KEK Sorong & Misool', province: 'Papua Barat Daya', focus: 'pengolahan sampah mandiri resort ramah lingkungan di kepulauan konservasi dunia', challenge: 'kewajiban mutlak perlindungan ekosistem laut tanpa asap beracun atau abu berserakan' },
  { name: 'Timika & Tembagapura', region: 'Kawasan Kuala Kencana, Portsite & Mile 68', province: 'Papua Tengah', focus: 'camp pertambangan konsentrat tembaga-emas, rumah sakit tambang, dan mess karyawan', challenge: 'kondisi iklim curah hujan ekstrem tinggi di pegunungan terjal Papua' }
];

const INCINERATOR_ARCHETYPES = [
  {
    slugSuffix: 'incinerator-medis-limbah-b3-rumah-sakit-faskes',
    category: 'Limbah B3 Medis',
    serviceTitle: 'Incinerator Limbah B3 Medis Rumah Sakit & Faskes Dual Chamber Berizin',
    seoKeyword: 'incinerator medis limbah b3 rumah sakit',
    tags: ['incinerator limbah b3', 'incinerator medis rumah sakit', 'pemusnah jarum suntik', 'dual chamber 1000 derajat', 'permen lhk no 70 2016'],
    heroImage: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    coreNeed: 'pemusnahan tuntas limbah infeksius, jarum suntik, botol infus, kassa darah, dan jaringan patologi rumah sakit secara mandiri tanpa risiko penularan infeksi nosokomial serta memangkas biaya mahal transporter pihak ketiga',
    chamberSpec: 'Sistem Dual Chamber dengan Ruang Bakar Primer (800°C–900°C) dan Ruang Bakar Sekunder (> 1.000°C–1.150°C) dengan waktu tinggal gas (*gas retention time*) minimal 2 detik.',
    sopMandor: [
      '**Pastikan Suhu Ruang Sekunder Mencapai Minimal 1.000°C Sebelum Sampah Di-feed:** Jangan memasukkan limbah medis saat ruang sekunder masih dingin. Suhu di atas 1.000°C dengan retensi gas 2 detik mutlak diperlukan untuk mendestruksi senyawa dioksin dan furan secara kimiawi sebelum mencapai cerobong.',
      '**Pantau Tekanan Negatif Ruang Bakar Menggunakan Draft Gauge:** Pastikan ruang bakar selalu beroperasi pada tekanan negatif (-2 hingga -5 mm H2O) agar lidah api dan asap beracun tidak menyembur keluar saat pintu loading dibuka oleh operator.'
    ],
    tableHeaders: ['Parameter Kritis Incinerator B3', 'Standar Desain AtasiLimbah', 'Regulasi Baku Mutu Permen LHK'],
    tableRows: [
      ['Temperatur Ruang Primer', '800°C – 950°C (Pyrolysis Zone)', 'Minimal 800°C'],
      ['Temperatur Ruang Sekunder', '1.000°C – 1.150°C (Thermal Oxidation)', 'Minimal 1.000°C (Waktu tinggal 2 detik)'],
      ['Efisiensi Pembakaran (DRE)', 'Destruction & Removal Efficiency > 99.99%', 'Baku mutu ketat bebas patogen'],
      ['Sistem Pengendalian Emisi', 'Cyclone Separator + Wet Scrubber Multi-Stage', 'Partikulat < 50 mg/Nm3, CO < 100 mg/Nm3'],
      ['Bahan Isolasi Tahan Api', 'Castable Refractory C-16 Tahan 1.600°C', 'Ketebalan 150 mm dinding luar dingin aman disentuh']
    ]
  },
  {
    slugSuffix: 'mesin-incinerator-sampah-domestik-tps3r-desa-dan-pasar',
    category: 'Sampah Kering & Basah',
    serviceTitle: 'Mesin Incinerator Sampah Domestik TPS-3R Kelurahan & Pasar Tradisional',
    seoKeyword: 'incinerator sampah domestik tps3r pasar',
    tags: ['incinerator tps3r', 'incinerator sampah pasar', 'pengolahan sampah desa', 'mesin pembakar sampah tanpa asap', 'reduksi sampah perkotaan'],
    heroImage: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80',
    coreNeed: 'penanganan sampah rumah tangga, sisa dedaunan, kantong plastik, kardus, dan limbah basah pasar tradisional di tingkat kelurahan/TPS-3R guna menghentikan ketergantungan kirim truk sampah ke TPA yang sudah overload',
    chamberSpec: 'Ruang bakar berkapasitas 1 m³ hingga 10 m³ per batch dengan forced draft air blower bawah kisi dan burner awal berbahan bakar solar/minyak jelantah terfiltrasi.',
    sopMandor: [
      '**Pilah & Angin-anginkan Sampah Basah Sebelum Pembakaran:** Sampah sisa sayuran dan buah pasar memiliki kadar air > 70%. Tempatkan sampah basah di area penirisan atau campur dengan sampah kardus/daun kering dengan rasio 50:50 agar efisiensi konsumsi bahan bakar burner tetap hemat.',
      '**Sirkulasi Air Wet Scrubber Wajib Dinetralkan Menggunakan Soda Api:** Air bilas asap di bak penampung scrubber bersifat asam akibat mengikat gas SO2 dan HCl. Berikan tambahan kapur tohor atau cairan NaOH secara berkala agar pH air bilasan tetap netral (pH 7–8) dan tidak merusak impeller pompa stainless.'
    ],
    tableHeaders: ['Karakteristik Operasional', 'Spesifikasi Unit TPS-3R AtasiLimbah', 'Keuntungan untuk Pengelola'],
    tableRows: [
      ['Kapasitas Reduksi Volume', '1.000 kg hingga 5.000 kg per hari (8 Jam Operasi)', 'Mereduksi volume timbulan sampah hingga 95%'],
      ['Konsumsi Bahan Bakar', 'Hanya 5 – 8 Liter Solar saat pemanasan awal 30 menit', 'Setelah panas membara, api sustain mandiri dari sampah'],
      ['Sistem Peniup Udara (Blower)', 'Turbo Centrifugal Blower 1.5 HP – 3.0 HP', 'Pasokan oksigen melimpah pembakaran sempurna'],
      ['Penanganan Abu Residu', 'Abu Padat Bottom Ash Steril (5% dari Volume Awal)', 'Dapat dimanfaatkan sebagai campuran paving block'],
      ['Tingkat Kebisingan & Asap', 'Asap Keluar Cerobong Transparan Putih Uap Air', 'Bebas asap hitam pekat dan ramah permukiman']
    ]
  },
  {
    slugSuffix: 'mesin-carbonizer-biochar-pirolisis-biomassa-pertanian',
    category: 'Biochar',
    serviceTitle: 'Mesin Carbonizer Biochar Konversi Limbah Biomassa Menjadi Karbon Aktif',
    seoKeyword: 'mesin carbonizer biochar pirolisis biomassa',
    tags: ['carbonizer biochar', 'pirolisis biomassa', 'pembuat arang sekam', 'biochar kelapa sawit', 'penyubur tanah karbon aktif'],
    heroImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80',
    coreNeed: 'mengubah limbah tongkol jagung, tempurung kelapa, serbuk gergaji kayu, sekam padi, dan tandan kosong sawit menjadi arang biochar berkualitas tinggi berpori mikro untuk pembenah tanah, penyerap karbon (*carbon credit*), dan media tanam organik',
    chamberSpec: 'Retort chamber tertutup vakum oksigen rendah (*anoxic pyrolysis*) berputar atau vertikal pada rentang suhu pirolisis 450°C–650°C dengan sistem sirkulasi pemanfaatan syngas mandiri.',
    sopMandor: [
      '**Kendalikan Suhu Pirolisis pada Rentang 500°C–600°C:** Jangan membiarkan suhu melonjak melewati 700°C jika target Anda adalah biochar pertanian. Suhu yang terlalu tinggi akan membakar pori mikro dan mengurangi Kapasitas Tukar Kation (KTK) arang.',
      '**Kondensasi Asap Cair (Wood Vinegar / Asap Cair):** Sambungkan cerobong keluaran gas pirolisis ke pipa pendingin kondensor tembaga/stainless. Uap asap yang mengembun menghasilkan asap cair grade-3 yang bernilai jual tinggi sebagai biopestisida dan pengawet kayu alami.'
    ],
    tableHeaders: ['Komponen Mesin Carbonizer', 'Spesifikasi Rekayasa AtasiLimbah', 'Manfaat Hasil Produksi'],
    tableRows: [
      ['Tabung Reaktor Pirolisis', 'Baja Boiler Plate ASTM A516 Tebal 10–12 mm', 'Tahan panas pemanasan tidak langsung nonstop'],
      ['Pemanfaatan Syngas Otomatis', 'After-burner pembakar gas metana & CO mandiri', 'Menghemat energi pemanasan luar hingga 80%'],
      ['Kadar Karbon Tetap (Fixed Carbon)', 'Tinggi: 75% – 85% Kandungan Karbon Stabil', 'Mampu bertahan di dalam tanah hingga ratusan tahun'],
      ['Rasio Konversi Rendemen', '25% – 35% Bobot Kering Biomassa Input', '1 Ton limbah kering menghasilkan 300 kg biochar super'],
      ['Produk Sampingan Berharga', 'Penampung Asap Cair (Pyroligneous Acid)', 'Pupuk hayati cair pengusir hama serangga alami']
    ]
  },
  {
    slugSuffix: 'incinerator-mobile-containerized-site-tambang-dan-sawit',
    serviceTitle: 'Incinerator Mobile Containerized Portabel untuk Camp Tambang & Sawit',
    seoKeyword: 'incinerator mobile containerized tambang sawit',
    category: 'Custom & Mobile',
    tags: ['incinerator mobile', 'containerized incinerator', 'incinerator tambang batubara', 'incinerator camp sawit', 'pengolahan sampah remote site'],
    heroImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    coreNeed: 'pengolahan sampah mandiri di kawasan pelosok atau site proyek yang berpindah-pindah tanpa perlu membangun pondasi permanen yang memakan waktu dan izin sipil rumit',
    chamberSpec: 'Seluruh sistem (dual chamber, burner, panel PLC otomatis, fuel tank, dan wet scrubber lipat) terintegrasi rapi di dalam rangka kontainer standar ISO 20 Feet atau skid-mounted heavy duty.',
    sopMandor: [
      '**Pastikan Skid Kontainer Berada di Atas Landasan Beton atau Plat Baja Datar:** Saat menurunkan unit di site tambang/sawit pelosok, sediakan landasan yang padat dan rata untuk mencegah puntiran struktural pada engsel pintu kontainer dan jalur pipa bahan bakar.',
      '**Lakukan Pengecekan Filter Separator Bahan Bakar Solar Berkala:** Kualitas solar di pedalaman site sering mengandung endapan air dan lumpur sulfur. Pasang double water separator filter sebelum solar masuk ke pompa burner agar nozzle injeksi tidak tersumbat.'
    ],
    tableHeaders: ['Fitur Desain Mobile', 'Spesifikasi Sistem Containerized', 'Keunggulan Implementasi Site'],
    tableRows: [
      ['Bodi Pelindung Luar', 'Kontainer Modifikasi ISO 20 Feet Heavy Duty', 'Tahan cuaca hujan lebat, lumpur tambang, dan mudah dimobilisasi'],
      ['Sistem Angkut & Penanganan', 'Dilengkapi Corner Casting Crane & Forklift Pocket', 'Tinggal angkut truk flatbed tronton dari satu site ke site lain'],
      ['Instalasi Lapangan (Plug & Play)', 'Cukup sambungkan kabel genset 380V & pipa air', 'Siap beroperasi dalam waktu 2 jam pasca tiba di lokasi'],
      ['Otomasi Kontrol Operasional', 'Panel PLC Touchscreen dengan Interlock Keamanan', 'Bisa dioperasikan oleh teknisi lokal dengan pelatihan singkat'],
      ['Ketahanan Cuaca & Debu Tambang', 'Cat Epoksi Polyurethane Marine Grade 3 Lapis', 'Anti-karat terhadap paparan debu batubara dan air asam tambang']
    ]
  },
  {
    slugSuffix: 'sistem-wet-scrubber-dan-cyclone-separator-cerobong-incinerator',
    serviceTitle: 'Sistem Pengendalian Emisi Wet Scrubber & Cyclone Cerobong Incinerator',
    seoKeyword: 'wet scrubber cyclone cerobong incinerator',
    category: 'Pengendalian Emisi',
    tags: ['wet scrubber incinerator', 'cyclone separator abu', 'pengendali emisi gas buang', 'baku mutu emisi klhk', 'nozzle spray asam basa'],
    heroImage: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
    coreNeed: 'menghilangkan partikulat debu terbang (*fly ash*), gas asam korosif ($SO_2, HCl, HF$), dan senyawa bau sebelum gas buang pembakaran dilepaskan ke atmosfer bebas melalui cerobong',
    chamberSpec: 'Sistem pembersihan multi-tahap menggabungkan Cyclone Centrifugal Separator kering untuk partikel kasar dan Venturi Wet Scrubber basah dengan spray nozzle kabut alkali pH terkontrol.',
    sopMandor: [
      '**Pilih Nozzle Spray Berbahan Stainless Steel SUS 316L atau PVDF:** Gas buang dari pembakaran plastik dan limbah medis mengandung uap asam klorida pekat. Nozzle kuningan atau baja biasa akan berkarat dan tergerus dalam tempo kurang dari 3 bulan.',
      '**Pasang Demister Pad Anti-Tetes di Puncak Menara Scrubber:** Pasang jaring kawat rajut penangkap kabut (*demister mesh pad*) sebelum leher cerobong agar tetesan air bilasan tidak ikut terlempar keluar membasahi area parkir atau atap gedung sekitar.'
    ],
    tableHeaders: ['Tahapan Reduksi Emisi', 'Prinsip Kerja Mekanikal', 'Hasil Kualitas Emisi Udara'],
    tableRows: [
      ['Tahap 1: Cyclone Separator Kering', 'Gaya sentrifugal memutar gas buang berkecepatan tinggi', 'Menjatuhkan 85% abu terbang kasar ke hopper penampung bawah'],
      ['Tahap 2: Venturi Atomizing Throat', 'Penyempitan leher saluran dengan semprotan air tekanan 3 bar', 'Menangkap partikel debu sub-mikron ke dalam tetesan air'],
      ['Tahap 3: Packed Bed Neutralizer', 'Kontak gas buang dengan cairan sirkulasi alkali NaOH', 'Menetralkan gas asam $SO_x, NO_x$, dan $HCl$ hingga pH aman'],
      ['Tahap 4: Demister Mist Eliminator', 'Pemisahan uap jenuh air dari aliran gas buang bersih', 'Mencegah terjadinya hujan asam lokal di sekitar pabrik'],
      ['Tolak Ukur Sertifikasi Laboratorium', 'Uji Emisi Isokinetik Terakreditasi KAN', 'Memenuhi baku mutu Kementerian Lingkungan Hidup dan Kehutanan']
    ]
  },
  {
    slugSuffix: 'incinerator-resort-hotel-dan-pulau-wisata-tanpa-asap',
    serviceTitle: 'Incinerator Higienis Tanpa Asap untuk Hotel Resort & Pulau Wisata Bahari',
    seoKeyword: 'incinerator hotel resort pulau wisata',
    category: 'Sampah Kering & Basah',
    tags: ['incinerator hotel resort', 'pengolahan sampah pulau wisata', 'incinerator ramah lingkungan', 'zero smoke incinerator', 'kebersihan kawasan wisata'],
    heroImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    coreNeed: 'destruksi sampah mandiri harian di kawasan resort eksklusif, pulau terpencil, dan destinasi wisata pantai yang mengutamakan ketenangan tamu tanpa polusi asap, bau sampah, atau tumpukan lalat',
    chamberSpec: 'Sistem kompak ramah lingkungan berestetika bersih dengan insulasi dinding dingin, ruang bakar sekunder thermal oxidizer berkecepatan tinggi, dan knalpot peredam kebisingan blower.',
    sopMandor: [
      '**Posisikan Cerobong Memperhatikan Arah Angin Muson Laut:** Letakkan instalasi mesin di area servis belakang (*back of house*) dengan orientasi cerobong membuang ke arah lepas pantai menjauhi balkon kamar tamu dan area restoran outdoor.',
      '**Atur Jadwal Pembakaran pada Jam Khusus:** Lakukan operasi pembakaran saat dini hari (pukul 04.30–06.30 pagi) atau sore menjelang malam hari saat aktivitas tamu di area terbuka sedang minim guna menjamin kenyamanan maksimal.'
    ],
    tableHeaders: ['Parameter Fasilitas Wisata', 'Spesifikasi Unit Resort AtasiLimbah', 'Dampak Terhadap Reputasi Resort'],
    tableRows: [
      ['Estetika Visual Mesin', 'Bodi Stainless Steel Rapi / Cat Powder Coating Bersih', 'Terlihat profesional dan higienis sebagai green hotel'],
      ['Visibilitas Asap Cerobong', 'Zero Visible Smoke (Transparan Jernih)', 'Tamu tidak akan melihat gumpalan asap hitam yang mengganggu'],
      ['Pengendalian Bau Pembakaran', 'Thermal Re-oxidation pada suhu > 1.000°C', 'Bebas aroma sangit plastik atau sampah busuk'],
      ['Kemandirian Pulau Terpencil', 'Tidak Perlu Sewa Kapal Tongkang Angkut Sampah', 'Menghemat biaya logistik buang sampah jutaan rupiah per bulan'],
      ['Komitmen Keberlanjutan Lingkungan', 'Mendukung Sertifikasi Green Hotel & ESG Tourism', 'Meningkatkan penilaian positif dari wisatawan mancanegara']
    ]
  },
  {
    slugSuffix: 'incinerator-industri-pabrik-tekstil-kemasan-dan-sludge-ipal',
    serviceTitle: 'Incinerator Industri Pemusnah Residu Kain Tekstil, Plastik & Sludge IPAL',
    seoKeyword: 'incinerator industri pabrik tekstil kemasan sludge ipal',
    category: 'Limbah B3 Medis',
    tags: ['incinerator industri pabrik', 'insenerator limbah tekstil', 'pembakar sludge ipal', 'limbah plastik reject', 'efisiensi boiler limbah'],
    heroImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    coreNeed: 'memusnahkan limbah perca kain sintetis, sisa trimming plastik kemasan multilapis, dan lumpur IPAL kering (*dry sludge*) pabrik secara berkesinambungan tanpa menumpuk di gudang TPS B3 perusahaan',
    chamberSpec: 'Desain refractory bertulang castable dense alumina dengan pintu hidrolik otomatis berkecepatan tinggi, water-cooled feeder ram, dan sistem continuous de-ashing pembuangan abu bawah.',
    sopMandor: [
      '**Keringkan Sludge IPAL hingga Kadar Air (MC) di Bawah 30%:** Lumpur IPAL yang masih basah (sludge cake becek) akan mendinginkan ruang bakar secara drastis dan memboroskan bahan bakar burner. Lewatkan sludge melalui screw press dewatering atau solar dryer sebelum dimasukkan ke incinerator.',
      '**Gunakan Interlock Pintu Hidrolik Otomatis:** Pasang sistem sensor otomatis yang mengunci pintu masukan limbah jika suhu ruang sekunder turun di bawah 1.000°C, memastikan kepatuhan regulasi lingkungan industri setiap saat.'
    ],
    tableHeaders: ['Kategori Limbah Pabrik', 'Kapasitas Penanganan Mesin', 'Efisiensi Operasional Manufaktur'],
    tableRows: [
      ['Perca Kain Sintetis / Tekstil', 'Nilai Kalor Tinggi (Cepat terbakar tuntas)', 'Membantu menaikkan panas ruang bakar secara alami'],
      ['Plastik Kemasan Multilayer Reject', 'Pembakaran suhu 1.100°C dengan oksigen berlebih', 'Mencegah pembentukan senyawa jelaga karbon lengket'],
      ['Lumpur IPAL Kering (Biological Sludge)', 'Reduksi menjadi abu steril non-toksik', 'Memangkas manifest limbah B3 perusahaan hingga 90%'],
      ['Opsi Pemanfaatan Panas (Heat Recovery)', 'Terkoneksi ke Heat Exchanger / Boiler Air Panas', 'Menyuplai air panas untuk pencucian pabrik atau pre-heater'],
      ['Legalitas Dokumen Lingkungan', 'Dilengkapi Manual Book, SOP K3 & Sertifikat Uji', 'Mempermudah proses perpanjangan PROPER Hijau/Emas KLHK']
    ]
  }
];

function generateProceduralArticle(loc, archetype) {
  const slug = `${archetype.slugSuffix}-${loc.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  const title = `${archetype.serviceTitle} di ${loc.name}: Solusi Termal Presisi & Bebas Asap`;
  const description = `Jasa pengadaan dan instalasi ${archetype.seoKeyword} di ${loc.name}, ${loc.province} (${loc.region}). Spesialis penanganan ${loc.focus} dengan standar emisi KLHK berizin resmi.`;

  const intro = `Pengelolaan limbah padat dan sampah domestik di kawasan **${loc.name}, ${loc.province}**—khususnya pada sentra aktivitas **${loc.region}**—menghadapi tantangan kritis berupa **${loc.challenge}**. Kawasan strategis ini memiliki fokus utama dalam penanganan **${loc.focus}**, di mana metode penimbunan konvensional atau pembuangan ke TPA sudah tidak lagi memadai akibat overload timbulan sampah dan regulasi lingkungan yang semakin ketat.

Ketiadaan fasilitas pengolahan mandiri berisiko memicu pencemaran bau, penularan bibit penyakit dari limbah infeksius, hingga sanksi hukum penutupan operasional fasilitas. **AtasiLimbah** menghadirkan solusi teknologi destruksi termal presisi melalui **${archetype.serviceTitle.toLowerCase()}** yang dirancang khusus untuk memenuhi kebutuhan instansi, rumah sakit, dan pelaku industri di kawasan **${loc.name}**.`;

  const section1 = `Karakteristik timbulan limbah di wilayah **${loc.name}** menuntut rancangan mesin yang tahan banting dan adaptif terhadap variasi kadar air bahan baku. Dalam menangani **${loc.focus}**, mesin tidak boleh mengeluarkan asap hitam pekat atau bau sangit yang memicu keluhan masyarakat sekitar.

Untuk menjawab kebutuhan ${archetype.coreNeed}, unit incinerator AtasiLimbah mengadopsi standar rekayasa termal canggih. ${archetype.chamberSpec} Seluruh dinding ruang bakar dilapisi material isolasi tahan api berkualitas tinggi yang mampu mempertahankan temperatur ekstrem di dalam reaktor sekaligus menjaga suhu permukaan luar tetap aman bagi keselamatan operator kerja di lapangan.`;

  const mandorNotesStr = archetype.sopMandor.map((note, idx) => `> ${idx + 1}. ${note}`).join('\n>\n');
  const tableHeaderStr = `| ${archetype.tableHeaders.join(' | ')} |\n| ${archetype.tableHeaders.map(() => '---').join(' | ')} |`;
  const tableRowsStr = archetype.tableRows.map(row => `| ${row.join(' | ')} |`).join('\n');

  const steps = [
    {
      title: `Survei Karakteristik Limbah & Kelayakan Lokasi di ${loc.name}`,
      desc: `Pengukuran volume timbulan harian (kg/hari), uji proksimat kadar air dan nilai kalori limbah, serta penentuan arah angin cerobong dari pemukiman sekitar.`
    },
    {
      title: `Kalkulasi Rekayasa Termal & Fabrikasi Presisi di Workshop`,
      desc: `Pengerjaan plat baja tebal, pemasangan susunan batu tahan api castable refractory, perakitan burner otomatis, dan pembuatan sistem filtrasi wet scrubber.`
    },
    {
      title: `Pengiriman, Ereksi Unit & Pemasangan Cerobong di Tapak`,
      desc: `Mobilisasi armada angkut ke lokasi proyek di ${loc.name}, pemasangan instalasi kelistrikan panel PLC, instalasi pipa bahan bakar dan jalur sirkulasi air scrubber.`
    },
    {
      title: `Commissioning Uji Bakar & Pelatihan Sertifikasi Operator`,
      desc: `Uji coba pembakaran beban bertahap, pengukuran suhu ruang bakar, uji sampling emisi cerobong isokinetik, serta pelatihan SOP K3 bagi operator setempat.`
    }
  ];
  const stepsStr = steps.map((st, idx) => `${idx + 1}. **${st.title}:** ${st.desc}`).join('\n');

  const faqs = [
    {
      q: `Apakah mesin incinerator dari AtasiLimbah di ${loc.name} memenuhi standar baku mutu KLHK?`,
      a: `Ya, unit kami dirancang mengacu pada Permen LHK No. P.70/2016 dengan suhu ruang sekunder di atas 1.000°C dan sistem wet scrubber multi-stage untuk memastikan parameter partikulat, CO, SO2, dan NOx berada jauh di bawah ambang batas yang ditetapkan.`
    },
    {
      q: `Berapa lama estimasi waktu fabrikasi dan pengiriman unit ke ${loc.name}?`,
      a: `Waktu fabrikasi berkisar antara 14 hingga 30 hari kerja tergantung kapasitas m³ unit yang dipesan, dan proses mobilisasi pengiriman ke lokasi ${loc.name} memakan waktu 1 hingga 5 hari kerja.`
    },
    {
      q: `Bagaimana layanan purna jual dan ketersediaan suku cadang burner di ${loc.name}?`,
      a: `Kami memberikan garansi mesin dan refraktori selama 12 bulan kalender penuh, didukung ketersediaan suku cadang nozzle burner, thermocouple suhu, pompa scrubber, dan layanan pendampingan teknisi siap siaga.`
    }
  ];

  const faqsMarkdown = faqs.map(f => `### ${f.q}\n${f.a}`).join('\n\n');
  const schemaFaqs = faqs.map(f => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": f.a.replace(/\n/g, ' ').replace(/"/g, '\\"')
    }
  }));

  const content = `---
title: '${title.replace(/'/g, "''")}'
description: '${description.replace(/'/g, "''")}'
publishDate: '${getIsoDate()}'
category: '${archetype.category}'
tags: [${[
  `incinerator ${loc.name.toLowerCase()}`,
  archetype.seoKeyword,
  ...archetype.tags
].map(t => `'${t}'`).join(', ')}]
author: 'Tim Teknis AtasiLimbah'
heroImage: '${archetype.heroImage}'
readingTime: '6 menit'
---

# ${title}

${intro}

---

## 1. Analisis Kebutuhan Destruksi Limbah di Kawasan ${loc.name}

${section1}

---

> ### Catatan Mandor & Poin Kritis Pengoperasian
${mandorNotesStr}

---

## 2. Tabel Spesifikasi & Parameter Kinerja Mesin

${tableHeaderStr}
${tableRowsStr}

---

## 3. SOP Pelaksanaan Proyek & Instalasi Lapangan

${stepsStr}

---

${NATIONWIDE_TABLE}

---

## Tanya Jawab Teknis Incinerator (FAQ)

${faqsMarkdown}

---

## Solusi Pemusnahan Limbah Terpercaya Bersama AtasiLimbah

Tuntaskan permasalahan sampah dan limbah padat di fasilitas Anda di kawasan **${loc.name}** dengan teknologi yang aman, higienis, dan berizin resmi:

- **Katalog Produk Incinerator**: [Lihat Spesifikasi Mesin Incinerator](/products/)
- **Solusi Sektoral**: [Rekomendasi Penanganan Limbah per Sektor](/solutions/)
- **Konsultasi Teknis WhatsApp**: [Hubungi Tim Engineer AtasiLimbah (0857-4188-3391)](https://wa.me/6285741883391?text=${encodeURIComponent(`Halo AtasiLimbah, saya ingin konsultasi kebutuhan ${archetype.serviceTitle} untuk lokasi di ${loc.name}`)})

\`\`\`json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": ${JSON.stringify(schemaFaqs, null, 2)}
}
\`\`\`
`;

  return {
    slug,
    title,
    content
  };
}

export function generateDailyArticles(count = 1) {
  console.log(`[ARTICLE-GENERATOR] Checking existing articles in ${artikelDir}...`);
  if (!fs.existsSync(artikelDir)) {
    fs.mkdirSync(artikelDir, { recursive: true });
  }

  const existingFiles = fs.readdirSync(artikelDir).filter((f) => f.endsWith('.md'));
  const existingSlugs = new Set(existingFiles.map((f) => f.replace(/\.md$/, '')));

  console.log(`[ARTICLE-GENERATOR] Found ${existingSlugs.size} existing articles.`);

  // Build programmatic matrix: 30 strategic locations x 7 archetypes = 210 targeted articles
  const candidateTopics = [];
  for (const loc of STRATEGIC_LOCATIONS) {
    for (const archetype of INCINERATOR_ARCHETYPES) {
      candidateTopics.push(generateProceduralArticle(loc, archetype));
    }
  }

  const availableTopics = candidateTopics.filter((art) => !existingSlugs.has(art.slug));

  if (availableTopics.length === 0) {
    console.log('[ARTICLE-GENERATOR] All 210+ programmatic topics already published!');
    return [];
  }

  const toPublish = availableTopics.slice(0, count);
  const generatedFiles = [];

  for (const item of toPublish) {
    const filePath = path.join(artikelDir, `${item.slug}.md`);
    fs.writeFileSync(filePath, item.content, 'utf8');
    console.log(`[ARTICLE-GENERATOR] Published new article: ${filePath}`);
    generatedFiles.push(filePath);
  }

  console.log(`[ARTICLE-GENERATOR] Successfully created ${generatedFiles.length} new article(s)!`);
  return generatedFiles;
}

// CLI execution support
const args = process.argv.slice(2);
let count = 1;
const countIdx = args.indexOf('--count');
if (countIdx !== -1 && args[countIdx + 1]) {
  count = parseInt(args[countIdx + 1], 10);
}

generateDailyArticles(count);
