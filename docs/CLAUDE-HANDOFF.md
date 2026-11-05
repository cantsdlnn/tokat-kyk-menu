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

Mevcut aylar: Ekim 2026 ve Kasım 2026.

Kasım 2026, 5 Kasım 2026'da pano fotoğraflarından aktarılıp yayımlandı (PR #1). Fotoğraftaki parlama nedeniyle şu hücreler kullanıcının izniyle en iyi okumayla dolduruldu; pano tekrar görülürse doğrula:
- 10 Kasım kahvaltı: "Salçalı sosis" (kelime "…lı Sosis" diye bitiyor; "Sucuklu yumurta" kullanıcı tarafından düzeltildi).
- 15 Kasım akşam: "Bulgur pilavı" ("Bu…" diye başlıyor). Altındaki iki satır okunamadığı için eklenmedi.
- 21 Kasım akşam: "Ekmek arası tavuk (söğüş ile)". "Tavuk"tan sonraki kelime okunamadı.

Ekim verisi eski canlı yayından aynen taşındı; yeni bir fotoğraf doğrulaması yapılmadı. Önceki transkripsiyonda 12 Ekim akşam tantuni satırları ile 18 Ekim domatesli bulgur pilavı/kuru cacık satırları yansımalıydı. 12 Ekim tantuni okuması kullanıcıya daha düşük güvenle bildirilmişti; orijinal görseller tekrar gelirse ayrıca doğrula.

## Yayın

Yerel Windows makinesinde Git (`C:\Program Files\Git\cmd\git.exe`) ve GitHub CLI (`C:\Program Files\GitHub CLI\gh.exe`) kurulu; `gh` cantsdlnn hesabıyla oturum açmış ve `gh auth setup-git` çalıştırılmış durumda. Araçlar PowerShell PATH'inde olmayabilir; tam yol ve `&` ile çağır.

PR açılışında menü doğrulama, test ve build çalışır. Main'e birleştirilince GitHub Actions aynı kontrollerden sonra GitHub Pages'i günceller. Hata varsa yayın adımı çalışmaz. Başarılı sonucu Actions'tan kontrol et; yalnızca push başarılı diye yayını tamamlanmış sayma.

Geri dönüş: hatalı değişikliği `git revert` ile geri al, kontrolleri çalıştırıp main'e gönder. Geçmişi force-push ile silme.

Aktarım öncesi Sites kaynak commit'i: `8b4c228156bab1af65b25243c855a367784c3479`.
Eski Sites yayını: https://tokat-kyk-menu-2026.tasdelennusretcan58.chatgpt.site
Canlı adres: https://tokatkykmenubc.com (GitHub Pages). `https://cantsdlnn.github.io/tokat-kyk-menu/` ve `www.tokatkykmenubc.com` bu adrese yönlenir.

### Alan adı geçişi (5 Kasım 2026'da tamamlandı)

Alan adı Turkticaret.net'te kayıtlı (kayıt 25 Eylül 2026, bitiş 25 Eylül 2027); ad sunucuları NS1/NS2/NS3.TURKTICARET.NET. Alan adı kullanıcının ayrı bir Turkticaret hesabındadır; giriş ve DNS paneli kullanıcıdadır.

- Turkticaret DNS Yönetimi'nde kök A kayıtları aşağıdaki dört GitHub Pages adresiyle değiştirildi, `www` CNAME → `cantsdlnn.github.io`. Turkticaret panelde kaydedilen değişikliği ad sunucularına yaklaşık 50 dakikada yansıttı (SOA seri numarası değişmedi); hemen yansımazsa bekle, sonra destek talebi aç.
- GitHub Pages özel alan adı `tokatkykmenubc.com`; HTTPS sertifikası onaylı (www dahil, GitHub otomatik yeniler), `https_enforced: true`, http → https yönlendirmesi çalışıyor.
- Eski Sites yayınına ait `_openai-site-verification` ve `_cf-custom-hostname` TXT kayıtları geri dönüş için şimdilik korunuyor; kullanıcı isterse silinebilir.

Güncel kök A kayıtları:

| Tür | Ad | Değer |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

Geçiş öncesi kök A kayıtları (eski Sites yayınına geri dönüş için): `172.66.3.26` ve `162.159.143.30`. Alan adında MX kaydı yok.

Durum kontrolü: `gh api repos/cantsdlnn/tokat-kyk-menu/pages` ve `Resolve-DnsName tokatkykmenubc.com -Type A -Server ns1.turkticaret.net -DnsOnly`.

Resmî kayıt değerleri: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

## İsteğe bağlı GitHub @claude

Bu kurulumun kullanılması için @claude GitHub Action gerekmez. Claude Code yerel/bulut oturumuyla PR açabilir. GitHub issue'larından @claude ile çalıştırma ayrıca Claude GitHub App kurulumu ve yetkili kimlik bilgisi gerektirir; bu devir bu otomasyonu etkinleştirmez.
