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
5 Kasım 2026 durumu: GitHub Actions build ve deploy başarılı. Kullanıcı TurkTicaret'e erişemediğinden alan adı geçişi BEKLİYOR. GitHub Pages'teki bekleyen özel alan adı ayarı kaldırıldı; güncellenen uygulama HTTPS üzerinden `https://cantsdlnn.github.io/tokat-kyk-menu/` adresinde yayınlanır. `tokatkykmenubc.com` eski Sites yayınına gider ve GitHub değişikliklerini almaz. GitHub hesabı ve depo kurulumu tamamlandı; Claude hesabında Code oturumu açma/proje seçimi kullanıcıda.

### DNS geçişinde kalan adım

TurkTicaret erişimi geri geldiğinde önce GitHub Pages ayarlarında özel alan adını yeniden `tokatkykmenubc.com` yap; ardından TurkTicaret'te alan adının DNS yönetiminde kök (`@`) A kayıtlarını aşağıdaki dört kayıtla değiştir:

| Tür | Ad | Değer |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

Geçiş öncesi kök A kayıtları: `172.66.3.26` ve `162.159.143.30`. Bu iki kök web yönlendirmesi değiştirilir; posta (MX), TXT ve diğer hizmet kayıtları korunur. `www` kullanılacaksa CNAME hedefi `cantsdlnn.github.io` olmalıdır (repo adı veya https ekleme). Ad sunucularını değiştirmek gerekmez.

Sonrasında DNS sonuçlarını ve `gh api repos/cantsdlnn/tokat-kyk-menu/pages` yanıtını kontrol et. Sertifika hazır olduğunda GitHub Pages'te HTTPS zorlamasını aç. DNS ve sertifika hazır olmadan HTTPS geçişi tamamlandı deme. Başlangıçta sertifika beklenirken `https_enforced` false dönebilir; geçiş sonunda true olmalı.

Resmî kayıt değerleri: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

## İsteğe bağlı GitHub @claude

Bu kurulumun kullanılması için @claude GitHub Action gerekmez. Claude Code yerel/bulut oturumuyla PR açabilir. GitHub issue'larından @claude ile çalıştırma ayrıca Claude GitHub App kurulumu ve yetkili kimlik bilgisi gerektirir; bu devir bu otomasyonu etkinleştirmez.
