from rest_framework import viewsets

from .models import Book
from .serializers import BookSerializer


class BooksViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Book.objects.all().order_by('title')
    serializer_class = BookSerializer
