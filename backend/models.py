from sqlalchemy import Column, Integer, String, Text, ForeignKey, Enum, DateTime
from sqlalchemy.orm import relationship
from .database import Base
import enum
from datetime import datetime

# --- Opcional: para enum tipo en ejercicios ---
class TipoEjercicioEnum(enum.Enum):
    relajacion = "relajacion"
    actividad_fisica = "actividad_fisica"

# --- USUARIOS ---
class Usuario(Base):
    __tablename__ = "usuarios"

    id_usuario = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, nullable=False)
    contrasena = Column(String(255), nullable=False)
    nivel_estres = Column(Integer, default=0)
    preferencias = Column(Text)

    posts = relationship("Post", back_populates="usuario")
    comentarios = relationship("Comentario", back_populates="usuario")


# --- EJERCICIOS ---
class Ejercicio(Base):
    __tablename__ = "ejercicios"

    id_ejercicio = Column(Integer, primary_key=True, index=True)
    titulo = Column(String(150), nullable=False)
    descripcion = Column(Text)
    tipo = Column(Enum(TipoEjercicioEnum), nullable=False)
    url_video = Column(String(255))


# --- ARTICULOS ---
class Articulo(Base):
    __tablename__ = "articulos"

    id_articulo = Column(Integer, primary_key=True, index=True)
    titulo = Column(String(150), nullable=False)
    contenido = Column(Text)
    categoria = Column(String(100))


# --- TESTS ---
class Test(Base):
    __tablename__ = "tests"

    id_test = Column(Integer, primary_key=True, index=True)
    titulo = Column(String(150), nullable=False)
    descripcion = Column(Text)

    preguntas = relationship("Pregunta", back_populates="test", cascade="all, delete")


# --- PREGUNTAS ---
class Pregunta(Base):
    __tablename__ = "preguntas"

    id_pregunta = Column(Integer, primary_key=True, index=True)
    id_test = Column(Integer, ForeignKey("tests.id_test"))
    texto_pregunta = Column(Text)
    opciones = Column(Text)
    respuesta_correcta = Column(Text)

    test = relationship("Test", back_populates="preguntas")


# --- POSTS (FORO) ---
class Post(Base):
    __tablename__ = "posts"

    id_post = Column(Integer, primary_key=True, index=True)
    id_usuario = Column(Integer, ForeignKey("usuarios.id_usuario"))
    titulo = Column(String(150), nullable=False)
    contenido = Column(Text)
    fecha = Column(DateTime, default=datetime.utcnow)

    usuario = relationship("Usuario", back_populates="posts")
    comentarios = relationship("Comentario", back_populates="post", cascade="all, delete")


# --- COMENTARIOS (FORO) ---
class Comentario(Base):
    __tablename__ = "comentarios"

    id_comentario = Column(Integer, primary_key=True, index=True)
    id_post = Column(Integer, ForeignKey("posts.id_post"))
    id_usuario = Column(Integer, ForeignKey("usuarios.id_usuario"))
    contenido = Column(Text)
    fecha = Column(DateTime, default=datetime.utcnow)

    post = relationship("Post", back_populates="comentarios")
    usuario = relationship("Usuario", back_populates="comentarios")
