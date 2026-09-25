# Tokat KYK Yemek Menüsü

Tokat Gençlik ve Spor İl Müdürlüğünün Eylül 2026 kahvaltı ve akşam yemeği menülerini gün gün veya aylık olarak gösteren responsive web uygulaması.

Canlı site: [tokatkykmenubc.com](https://tokatkykmenubc.com)

## Özellikler

- Kahvaltı ve akşam yemeği ayrımı
- Günlük ve aylık menü görünümü
- Tokat saatine göre otomatik öğün seçimi
- Telefon, tablet ve masaüstü uyumlu tasarım
- Kurulum gerektirmeyen statik HTML/CSS/JavaScript yapısı

## Yerelde çalıştırma

Proje dizininde basit bir statik dosya sunucusu başlatın:

```bash
python -m http.server 4173 --directory dist
```

Ardından `http://localhost:4173` adresini açın.

## Proje yapısı

- `dist/index.html`: Uygulama arayüzü, menü verileri ve etkileşimler
- `dist/assets/`: Görsel ve yerel font dosyaları
- `dist/manifest.webmanifest`: Web uygulaması bilgileri
- `.openai/hosting.json`: Sites yayınlama yapılandırması

Menü bilgileri, Tokat Gençlik ve Spor İl Müdürlüğünün yayımladığı görsellerden aktarılmıştır. Menü idare ve tedarik koşullarına göre değişebilir.
