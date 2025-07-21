from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from . import models
from .database import engine
from .routes import router

# Crear las tablas en la base de datos si no existen
models.Base.metadata.create_all(bind=engine)

# Crear instancia de la app
app = FastAPI(
    title="Estrés Cero API",
    description="API para la plataforma Estrés Cero: ejercicios, artículos, tests, foro y más.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Permitir CORS para la app móvil (React Native)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Puedes restringirlo después a tu dominio
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir todas las rutas
app.include_router(router)
