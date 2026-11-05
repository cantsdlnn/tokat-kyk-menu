# Claude'a devir ve kullanım

## Başlangıç

Claude Code'da bu proje klasörünü aç veya bulut Code oturumuna `cantsdlnn/tokat-kyk-menu` deposunu bağla. Normal sohbetin GitHub dosya okuma bağlantısı tek başına yazma/yayın yetkisi sağlamaz. Claude Code hesabında oturum açma ve repo erişimini kullanıcı tamamlar.

İlk mesaj:

> CLAUDE.md ve docs/CLAUDE-HANDOFF.md dosyalarını oku. Bu uygulama Tokat KYK yemek menüsüdür. Mevcut tasarımı ve öğün saatlerini koru. Gönderdiğim yeni ay fotoğraflarını data/menus altına aktar; okunamayan hücreleri bana sor. Doğrulama, test ve build çalıştırıp inceleyebileceğim bir PR hazırla.

Menü görsellerini Claude Code sohbetine ekle veya yerel `incoming/` klasörüne koy. Bu klasör Git tarafından yok sayılır; fotoğraflar kendiliğinden herkese açık depoya gönderilmez. Bulut oturumunda görselleri o oturuma ayrıca ekle.

## Yapı

Uygulama bağımlılıksız HTML/CSS/JavaScript'tir. Sunucu, veritabanı, giriş sistemi veya ücretli API gerekmez. Node.js sadece menü doğrulama/build ve önizleme içindir. Build, tüm JSON menülerini HTML'ye gömer; sayfa açılışında ek veri isteği gerekmez. Görseller, fontlar ve manifest `dist/` içindedir. GitHub Pages sadece `dist/` klasörünü yayımlar.

Yeni ay için önceki JSON biçimini örnek al, yemekleri yeni kaynak görsellerden yaz. Ay/yıl ve kaynak açıklamasını güncelle. Tüm ayın günleri ve iki öğünü gerekli. Yalnızca güncel ayın bir kısmı sağlandıysa eksik günleri uydurma; kullanıcıdan iste. Gün adları otomatik hesaplanır. Uygulama mevcut ayı seçer; mevcut ay yoksa en yakın geçmiş ayı ve açık bir uyarıyı gösterir.

## Bilinen veri sınırı

Başlangıçtaki tek tam veri Ekim 2026'dır. Kasım menüsü henüz sağlanmadı.
Ekim verisi eski canlı yayından aynen taşındı; yeni bir fotoğraf doğrulaması yapılmadı. Önceki transkripsiyonda 12 Ekim akşam tantuni satırları ile 18 Ekim domatesli bulgur pilavı/kuru cacık satırları yansımalıydı. 12 Ekim tantuni okuması kullanıcıya daha düşük güvenle bildirilmişti; orijinal görseller tekrar gelirse ayrıca doğrula.

## Yayın

PR açılışında menü doğrulama, test ve build çalışır. Main'e birleştirilince GitHub Actions aynı kontrollerden sonra GitHub Pages'i günceller. Hata varsa yayın adımı çalışmaz. Başarılı sonucu Actions'tan kontrol et; yalnızca push başarılı diye yayını tamamlanmış sayma.

Geri dönüş: hatalı değişikliği `git revert` ile geri al, kontrolleri çalıştırıp main'e gönder. Geçmişi force-push ile silme.

Aktarım öncesi Sites kaynak commit'i: `8b4c228156bab1af65b25243c855a367784c3479`.
Eski Sites yayını: https://tokat-kyk-menu-2026.tasdelennusretcan58.chatgpt.site
Yeni yayın adresi: https://cantsdlnn.github.io/tokat-kyk-menu/
Alan adı geçişi: DNS ve GitHub Pages özel alan adı ayarları tamamlanana kadar tokatkykmenubc.com eski Sites yayınına gider. Eski yayın geçiş doğrulanmadan kaldırılmaz.

## İsteğe bağlı GitHub @claude

Bu kurulumun kullanılması için @claude GitHub Action gerekmez. Claude Code yerel/bulut oturumuyla PR açabilir. GitHub issue'larından @claude ile çalıştırma ayrıca Claude GitHub App kurulumu ve yetkili kimlik bilgisi gerektirir; bu devir bu otomasyonu etkinleştirmez.
