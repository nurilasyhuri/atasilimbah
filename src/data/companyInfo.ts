export interface NavItem {
  label: string;
  href: string;
  badge?: string;
  hasDropdown?: boolean;
}

export interface ProductCategory {
  title: string;
  slug: string;
  desc: string;
  target: string;
}

export const COMPANY_INFO = {
  name: 'AtasiLimbah',
  legalName: 'PT Atasi Limbah Indonesia',
  tagline: 'Teknologi Tepat untuk Pengolahan Limbah',
  domain: 'https://atasilimbah.com',
  description: 'Produsen mesin incinerator Indonesia dan sistem pengolahan sampah termal untuk institusi, fasilitas komersial, dan kawasan industri.',
  establishedYear: 2018,
  contact: {
    phone: '+6285183005070',
    phoneFormatted: '0851-8300-5070',
    whatsappNumber: '6285183005070',
    email: 'info@atasilimbah.com',
    workshopAddress: 'Kawasan Industri Fabrikasi Logam Indonesia',
    operationalHours: 'Senin - Sabtu: 08.00 - 17.00 WIB',
  },
  navItems: [
    { label: 'Beranda', href: '/' },
    { label: 'Produk', href: '/mesin-incinerator/', hasDropdown: true },
    { label: 'Solusi', href: '/solusi-pengolahan-sampah/' },
    { label: 'Teknologi', href: '/teknologi-incinerator/' },
    { label: 'Tentang Kami', href: '/tentang-kami/' },
    { label: 'Kontak', href: '/kontak/' },
  ] as NavItem[],
  productCategories: [
    {
      title: 'Incinerator Sampah Kering',
      slug: 'incinerator-sampah-kering',
      desc: 'Mesin untuk jenis sampah kering non-B3 tertentu (kertas, kayu, residu padat) untuk pesantren, sekolah, usaha, fasilitas komersial.',
      target: 'Pesantren, sekolah, usaha, fasilitas komersial',
    },
    {
      title: 'Incinerator Sampah Basah',
      slug: 'incinerator-sampah-basah',
      desc: 'Sistem untuk material berkadar air tinggi yang membutuhkan pengeringan awal atau energi pembakaran tambahan.',
      target: 'Fasilitas dengan sampah campuran setelah pemilahan',
    },
    {
      title: 'Incinerator Sampah Campuran Non-B3',
      slug: 'incinerator-sampah-campuran',
      desc: 'Untuk campuran residu yang telah dipilah dan dipastikan sesuai dengan desain mesin.',
      target: 'Fasilitas pengolahan sampah dan kawasan komersial',
    },
    {
      title: 'Incinerator Limbah B3',
      slug: 'incinerator-limbah-b3',
      desc: 'Sistem khusus untuk limbah B3 tertentu dengan persyaratan desain, kontrol proses, pengendalian emisi, dan pengelolaan residu.',
      target: 'Fasilitas pengolah limbah B3 dengan izin resmi',
    },
    {
      title: 'Incinerator Industri',
      slug: 'incinerator-industri',
      desc: 'Sistem insinerasi heavy duty kapasitas besar dan kontinu untuk residu pabrik dan kawasan industri.',
      target: 'Pabrik dan kawasan industri',
    },
    {
      title: 'Custom Incinerator System',
      slug: 'incinerator-custom',
      desc: 'Perancangan teknis dan fabrikasi khusus sesuai kapasitas, layout ruang, dan karakteristik unik timbulan limbah.',
      target: 'Kustomisasi spesifikasi & tata letak fasilitas',
    },
  ] as ProductCategory[],
  categories: [
    {
      title: 'Incinerator Sampah Kering',
      slug: 'incinerator-sampah-kering',
      desc: 'Pengolahan sampah padat non-B3 dengan nilai kalor optimal untuk fasilitas dan institusi.',
    },
    {
      title: 'Incinerator Sampah Basah',
      slug: 'incinerator-sampah-basah',
      desc: 'Sistem pengolahan sampah berkadar air tinggi dengan evaluasi termal dan pre-treatment teruji.',
    },
    {
      title: 'Incinerator Limbah B3',
      slug: 'incinerator-limbah-b3',
      desc: 'Sistem insinerasi termal khusus limbah B3 tertentu dengan pengendalian emisi bertingkat.',
    },
    {
      title: 'Custom Incinerator System',
      slug: 'incinerator-custom',
      desc: 'Perancangan dan fabrikasi mesin incinerator sesuai kapasitas dan tata letak fasilitas pelanggan.',
    },
  ],
};
