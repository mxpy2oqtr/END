# HealthTrack - Aplicación de Seguimiento de Salud

Aplicación completa de seguimiento de salud con frontend React + Vite y backend Node.js + Express + Prisma.

## 🚀 Inicio Rápido

### Backend

```powershell
cd Backend
.\INICIAR.ps1
```

O manualmente:
```powershell
cd Backend
docker-compose up -d
npm run dev
```

### Frontend

```powershell
# Desde la raíz del proyecto
npm install
npm run dev
```

## 📝 URLs

- **Backend**: http://localhost:3000
- **Backend API**: http://localhost:3000/api
- **Backend Health**: http://localhost:3000/health
- **Frontend**: http://localhost:5173
- **Adminer**: http://localhost:8080

## 🏗️ Estructura

```
/
├── Backend/          # API Node.js + Express + Prisma
│   ├── src/
│   │   ├── modules/  # Módulos de negocio
│   │   ├── core/     # Config, DB, Middleware
│   │   └── app.js    # Configuración Express
│   └── prisma/       # Schema y migraciones
├── src/              # Frontend React
│   ├── main.jsx      # Entry point
│   ├── components/   # Componentes UI
│   └── Pages/        # Páginas de la app
├── api/              # Cliente API
└── Components/       # Componentes de la app
```

## 📚 Documentación

- **Backend**: Ver `Backend/README.md`
- **API**: Ver `Backend/TESTING.md`

