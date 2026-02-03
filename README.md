🚀 Role-Based Yönetim Paneli | Next.js + shadcn/ui

Son dönemde üzerinde çalıştığım role-based (yetkiye göre erişim) bir yönetim paneli projesinin bir kısmını paylaşmak istiyorum.
Projede kullanıcı rollerine göre kontrol edilen bir yapı kuruldu. Her rol yalnızca yetkili olduğu alanları görebiliyor ve işlem yapabiliyor.

🔐 Yetkilendirme & Giriş

Role-based login (Admin / User vb.)
Sayfa ve bileşen bazlı yetki kontrolü
Yetkisiz erişimlerde otomatik yönlendirme

📦 Stok & Ürün Yönetimi

Ürün ekleme / silme / güncelleme
Kritik stok seviyesi takibi
Stok azaldığında dashboard üzerinden uyarılar
Toplam satış & stok durumu özetleri

📊 Dashboard

Günlük / aylık özet metrikler
Kritik stok, aktif ürün, toplam ciro gibi kartlar
Grafikler ile görsel analiz
Kullanıcıya özel dashboard içerikleri

👥 Personel Yönetimi

Personel ekleme / silme
Personel izinleri (tarih aralığı bazlı)
İzinli personellerin dashboard’da gösterimi
Performans ve durum takibi

🏭 Tedarikçi Yönetimi

Tedarikçi ekleme / silme / güncelleme
Tedarikçi bazlı ürünler
Minimum sipariş ve teslim süresi bilgileri
Aktif / pasif tedarikçi durumu

⚙️ Ayarlar

Role göre dinamik ayar ekranları
Sadece yetkili rollerin görebildiği alanlar
Kullanıcı bilgileri & sistem ayarları

🎨 UI / UX

Next.js + shadcn/ui
Responsive & temiz arayüz
Minimal ve okunabilir tasarım

🧠 Architecture & Code Quality Roadmap

Proje genelinde design patterns (Container–Presenter, Service Layer, Factory) yapısına geçiş
Dosya organizasyonunun Clean Architecture prensiplerine göre yeniden düzenlenmesi
Component / Hook / Service katmanlarının net ayrıştırılması
Shared logic’lerin custom hook’lara taşınması
UI katmanında shadcn/ui + Tailwind ile yeniden kullanılabilir bileşen yapısının güçlendirilmesi

