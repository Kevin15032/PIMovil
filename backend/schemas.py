from pydantic import BaseModel
from typing import Optional, List

# --- USUARIOS ---

class UsuarioBase(BaseModel):
    nombre: str
    email: str
    nivel_estres: Optional[int] = 0
    preferencias: Optional[str] = None

class UsuarioCreate(UsuarioBase):
    contrasena: str

class UsuarioLogin(BaseModel):
    email: str
    contrasena: str

class UsuarioUpdate(BaseModel):
    nombre: Optional[str] = None
    email: Optional[str] = None
    contrasena: Optional[str] = None
    nivel_estres: Optional[int] = None
    preferencias: Optional[str] = None

class UsuarioOut(UsuarioBase):
    id_usuario: int
    class Config:
        from_attributes = True


# --- EJERCICIOS ---

class EjercicioBase(BaseModel):
    titulo: str
    descripcion: Optional[str]
    tipo: str
    url_video: Optional[str]

class EjercicioCreate(EjercicioBase):
    pass

class EjercicioOut(EjercicioBase):
    id_ejercicio: int
    class Config:
        from_attributes = True


# --- ARTICULOS ---

class ArticuloBase(BaseModel):
    titulo: str
    contenido: Optional[str]
    categoria: Optional[str]

class ArticuloCreate(ArticuloBase):
    pass

class ArticuloOut(ArticuloBase):
    id_articulo: int
    class Config:
        from_attributes = True


# --- TESTS ---

class TestBase(BaseModel):
    titulo: str
    descripcion: Optional[str]

class TestCreate(TestBase):
    pass

class TestOut(TestBase):
    id_test: int
    class Config:
        from_attributes = True


# --- PREGUNTAS ---

class PreguntaBase(BaseModel):
    id_test: int
    texto_pregunta: str
    opciones: Optional[str]
    respuesta_correcta: Optional[str]

class PreguntaCreate(PreguntaBase):
    pass

class PreguntaOut(PreguntaBase):
    id_pregunta: int
    class Config:
        from_attributes = True


# --- POSTS (FORO) ---

class PostBase(BaseModel):
    id_usuario: int
    titulo: str
    contenido: Optional[str]

class PostCreate(PostBase):
    pass

class PostOut(PostBase):
    id_post: int
    class Config:
        from_attributes = True


# --- COMENTARIOS (FORO) ---

class ComentarioBase(BaseModel):
    id_usuario: int
    contenido: Optional[str]

class ComentarioCreate(ComentarioBase):
    pass

class ComentarioOut(ComentarioBase):
    id_comentario: int
    id_post: int
    class Config:
        from_attributes = True
