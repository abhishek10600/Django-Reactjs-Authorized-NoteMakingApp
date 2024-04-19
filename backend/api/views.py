from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note


class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    # this is used so that we get all the notes created by the authenticated user
    def get_queryset(self):
        user = self.request.user  # self.request.user gives us the authenticated user object
        return Note.objects.filter(author=user)

    # we are overriding the create method and making changes so that we can perform our custom validation before saving the new note
    def perform_create(self, serializer):
        if serializer.is_valid():  # validating the data

            # self.request.user gives us the authenticated user object
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)


class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    # this will allow the authenticated user to delete only there notes.
    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
