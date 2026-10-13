from pathlib import Path
from django.http import Http404, FileResponse

INDEX_FILE = Path(__file__).resolve().parents[2] / "frontend" / "dist" / "index.html"

def frontend(request, path=""):
    if not INDEX_FILE.exists():
        raise Http404("Frontend build is missing.")
    return FileResponse(INDEX_FILE.open("rb"), content_type="text/html; charset=utf-8")
