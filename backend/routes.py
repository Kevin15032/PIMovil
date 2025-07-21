from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from fastapi import Request

from . import models, schemas, database

router = APIRouter()

# Sesiones simuladas en memoria (simple)
sesiones_activas = {}

# Dependency
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- USUARIOS ---

@router.post("/usuarios/registrar", response_model=schemas.UsuarioOut)
def registrar_usuario(usuario: schemas.UsuarioCreate, db: Session = Depends(get_db)):
    db_usuario = models.Usuario(**usuario.dict())
    db.add(db_usuario)
    db.commit()
    db.refresh(db_usuario)
    return db_usuario

@router.post("/usuarios/login")
def login_usuario(credenciales: schemas.UsuarioLogin, request: Request, db: Session = Depends(get_db)):
    usuario = db.query(models.Usuario).filter(models.Usuario.email == credenciales.email).first()
    if not usuario or usuario.contrasena != credenciales.contrasena:
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")
    sesiones_activas[usuario.id_usuario] = True
    return {"mensaje": "Login exitoso", "usuario_id": usuario.id_usuario}

@router.get("/usuarios/{id_usuario}", response_model=schemas.UsuarioOut)
def obtener_usuario(id_usuario: int, db: Session = Depends(get_db)):
    usuario = db.query(models.Usuario).filter(models.Usuario.id_usuario == id_usuario).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return usuario

@router.put("/usuarios/{id_usuario}", response_model=schemas.UsuarioOut)
def actualizar_usuario(id_usuario: int, datos: schemas.UsuarioUpdate, db: Session = Depends(get_db)):
    usuario = db.query(models.Usuario).filter(models.Usuario.id_usuario == id_usuario).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    for k, v in datos.dict(exclude_unset=True).items():
        setattr(usuario, k, v)
    db.commit()
    db.refresh(usuario)
    return usuario


# --- EJERCICIOS ---

@router.get("/ejercicios/", response_model=List[schemas.EjercicioOut])
def listar_ejercicios(db: Session = Depends(get_db)):
    return db.query(models.Ejercicio).all()

@router.get("/ejercicios/{id_ejercicio}", response_model=schemas.EjercicioOut)
def obtener_ejercicio(id_ejercicio: int, db: Session = Depends(get_db)):
    ejercicio = db.query(models.Ejercicio).filter(models.Ejercicio.id_ejercicio == id_ejercicio).first()
    if not ejercicio:
        raise HTTPException(status_code=404, detail="Ejercicio no encontrado")
    return ejercicio


# --- ARTICULOS ---

@router.get("/articulos/", response_model=List[schemas.ArticuloOut])
def listar_articulos(db: Session = Depends(get_db)):
    return db.query(models.Articulo).all()

@router.get("/articulos/{id_articulo}", response_model=schemas.ArticuloOut)
def obtener_articulo(id_articulo: int, db: Session = Depends(get_db)):
    articulo = db.query(models.Articulo).filter(models.Articulo.id_articulo == id_articulo).first()
    if not articulo:
        raise HTTPException(status_code=404, detail="Artículo no encontrado")
    return articulo


# --- TESTS ---

@router.get("/tests/", response_model=List[schemas.TestOut])
def listar_tests(db: Session = Depends(get_db)):
    return db.query(models.Test).all()

@router.get("/tests/{id_test}", response_model=schemas.TestOut)
def obtener_test(id_test: int, db: Session = Depends(get_db)):
    test = db.query(models.Test).filter(models.Test.id_test == id_test).first()
    if not test:
        raise HTTPException(status_code=404, detail="Test no encontrado")
    return test

@router.get("/tests/{id_test}/preguntas", response_model=List[schemas.PreguntaOut])
def listar_preguntas(id_test: int, db: Session = Depends(get_db)):
    return db.query(models.Pregunta).filter(models.Pregunta.id_test == id_test).all()


# --- POSTS FORO ---

@router.get("/posts/", response_model=List[schemas.PostOut])
def listar_posts(db: Session = Depends(get_db)):
    return db.query(models.Post).all()

@router.get("/posts/{id_post}", response_model=schemas.PostOut)
def obtener_post(id_post: int, db: Session = Depends(get_db)):
    post = db.query(models.Post).filter(models.Post.id_post == id_post).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post no encontrado")
    return post

@router.post("/posts/", response_model=schemas.PostOut)
def crear_post(post: schemas.PostCreate, db: Session = Depends(get_db)):
    nuevo_post = models.Post(**post.dict())
    db.add(nuevo_post)
    db.commit()
    db.refresh(nuevo_post)
    return nuevo_post

@router.delete("/posts/{id_post}")
def eliminar_post(id_post: int, db: Session = Depends(get_db)):
    post = db.query(models.Post).filter(models.Post.id_post == id_post).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post no encontrado")
    db.delete(post)
    db.commit()
    return {"mensaje": "Post eliminado"}


# --- COMENTARIOS ---

@router.get("/posts/{id_post}/comentarios", response_model=List[schemas.ComentarioOut])
def listar_comentarios(id_post: int, db: Session = Depends(get_db)):
    return db.query(models.Comentario).filter(models.Comentario.id_post == id_post).all()

@router.post("/posts/{id_post}/comentarios", response_model=schemas.ComentarioOut)
def crear_comentario(id_post: int, comentario: schemas.ComentarioCreate, db: Session = Depends(get_db)):
    nuevo_comentario = models.Comentario(id_post=id_post, **comentario.dict())
    db.add(nuevo_comentario)
    db.commit()
    db.refresh(nuevo_comentario)
    return nuevo_comentario
