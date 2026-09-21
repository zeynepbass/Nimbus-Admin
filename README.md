# Nimbus Admin

Next.js ve shadcn/ui ile geliştirilmiş, rol tabanlı bir ERP yönetim paneli. Stok, sipariş, fatura, personel, izin ve tedarikçi süreçlerini tek arayüzde toplar.

Uygulama bir arka uç servisine bağlı değildir. Veriler `src/data` altındaki JSON dosyalarından okunur, yapılan değişiklikler oturum boyunca bellekte tutulur. Oturum bilgisi, son giriş bilgisi ve yazdırılan faturalar tarayıcının `localStorage` alanında saklanır.

## Özellikler

**Kimlik doğrulama ve yetkilendirme**
- E-posta ve şifre ile giriş, son giriş zamanı ve tarayıcı bilgisi
- Giriş yapmamış kullanıcıları `/login` sayfasına yönlendiren korumalı rotalar
- Role göre filtrelenen menü ve rota erişimi (`/role` yalnızca `ADMIN` ve `MANAGER` rollerine açıktır)

**Dashboard**
- Toplam ürün, ciro, aktif ürün ve kritik stok kartları
- Satış grafiği, sipariş durumu dağılımı ve en çok satan ürünler
- En yüksek puanlı tedarikçiler ve personel performans sıralaması
- Bugün izinli olan ve yeni başlayan personel
- Son siparişler ve kritik stok listeleri, ürün detay sayfaları

**Satış**
- Sipariş listesi, detay, güncelleme paneli ve zaman çizelgesi
- Sipariş yazdırma, PDF çıktısı ve yazdırılan siparişlerden oluşan fatura listesi

**İnsan Kaynakları**
- Personel ekleme, güncelleme, silme ve detay sayfası
- İzin listesi ve izin güncelleme formu
- Yazdırma ve PDF çıktısı

**Tedarikçiler**
- Tedarikçi ekleme, güncelleme, silme ve detay sayfası
- Tedarik edilen ürünler, minimum sipariş ve teslim süresi bilgileri

**Ayarlar**
- Profil bilgileri ve fotoğraf güncelleme
- Kullanıcılar, tedarikçi puanları, stok miktarları ve izinler için sekmeler

**Ortak özellikler**
- Sıralama, arama, sütun görünürlüğü ve sayfalama destekleyen tablolar
- Tablolar için Excel dışa aktarma
- Hızlı erişim araması, kritik stok bildirimleri ve Power BI kısayolu

## Teknolojiler

| Alan | Kullanılan |
| --- | --- |
| Çatı | Next.js 16 (App Router), React 19, React Compiler |
| Arayüz | Tailwind CSS 4, shadcn/ui, Radix UI, Lucide |
| Tablo | TanStack Table |
| Grafik | ApexCharts |
| Dışa aktarma | xlsx, jsPDF, react-to-print |
| Bildirim | Sonner |

## Kurulum

Node.js 20.9 veya üzeri gereklidir.

```bash
npm install
npm run dev
```

Uygulama `http://localhost:3000` adresinde açılır.

| Komut | Açıklama |
| --- | --- |
| `npm run dev` | Geliştirme sunucusunu başlatır |
| `npm run build` | Üretim derlemesi oluşturur |
| `npm start` | Üretim derlemesini çalıştırır |

## Demo hesapları

Hesaplar `src/data/users.json` dosyasında tanımlıdır ve tüm hesapların şifresi `123` değeridir.

| Rol | E-posta | Erişim |
| --- | --- | --- |
| `USER` | `user@gmail.com` | Rol yönetimi hariç tüm modüller |
| `MANAGER` | `users.json` içindeki `MANAGER` hesabı | Tüm modüller ve `/role` |

## Proje yapısı

```
src
├── app                     Rotalar ve sayfa düzenleri
│   ├── (auth)              Giriş sayfası
│   └── (protected)         Oturum gerektiren sayfalar
├── components
│   ├── ui                  shadcn/ui temel bileşenleri
│   ├── common              Modüller arası ortak bileşenler (tablo, kart, form, rozet)
│   ├── layout              Sidebar, üst çubuk, arama, bildirimler, breadcrumb
│   ├── charts              Grafik bileşenleri
│   └── features            Modül bazlı bileşenler
│       ├── auth  dashboard  products  orders  invoices
│       ├── employees  leaves  suppliers  users  roles  settings
├── config                  Menü tanımı
├── constants               Rol, durum ve depolama anahtarları
├── data                    Örnek veri (JSON)
├── hooks                   useList, useForm, usePrint, useCurrentUser, useIsMobile
└── lib                     Kimlik doğrulama, depolama, biçimlendirme, PDF, Excel ve hesaplama yardımcıları
```

### Mimari notlar

- `app` klasörü yalnızca rotaları içerir. Sayfalar, ilgili `features` bileşenini render eder.
- Her modül kendi klasöründe toplanır (tablo, detay, form, sütun tanımları, Excel eşlemesi).
- Tabloların ortak yapısı `common/DataTable`, sütun yardımcıları `common/columns`, durum rozetleri `common/StatusBadge` içindedir.
- Liste durumu `useList`, form durumu `useForm` hook'ları ile yönetilir. İç içe alanlar `address.city` gibi yol ifadeleriyle güncellenir.
- Rol ve rota kuralları `constants/roles.js` ve `lib/auth.js` içinde tek yerde tutulur.

## Lisans

Ayrıntılar için [LICENCE](LICENCE) dosyasına bakın.
