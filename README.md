# 🌐 CoffeeApp Frontend

CoffeeApp uygulamasının React + TypeScript ile geliştirilmiş kullanıcı arayüzü. RESTful API üzerinden kahve siparişleri ve kullanıcı işlemleri yapılabilir.

---

## 🚀 Başlangıç

Aşağıdaki adımları takip ederek projeyi yerel ortamınızda başlatabilirsiniz.

---

## 📦 Gereksinimler

- [Node.js 18+]
- [Yarn] veya [npm]  
- [Docker (opsiyonel)]
- IDE (VS Code önerilir)

---

## 🔧 Kurulum ve Çalıştırma

npm install

npm run build

npm start


### 1. Reponun klonlanması

git clone https://github.com/kullaniciAdi/coffeAppFrontend.git
cd coffeAppFrontend


🧱 Proje Yapısı

src/
├── components/       → Tekrar kullanılabilir UI bileşenleri
├── pages/            → Sayfa bileşenleri (Home, Login vs.)
├── services/         → API servisleri (axios ile)
├── types/            → TypeScript tür tanımları
├── utils/            → Yardımcı fonksiyonlar
├── App.tsx           → Ana uygulama bileşeni
└── main.tsx          → Başlangıç noktası


🧰 Kullanılan Teknolojiler

React 18

TypeScript

React Router

Axios

TailwindCSS / MUI 

React Hook Form (form ve validasyon)

Uygulamada default tanımlı admin bilgileri;

username: admin@admin.com
password: 123123

Uygulamada admin,kullanıcı ve editör bulunuyor.
Admin tüm işlemleri yapabilirken kullanıcı ve editör yalnızca kahve sipariş işlemleri yapabiliyor.

