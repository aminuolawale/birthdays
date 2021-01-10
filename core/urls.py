from django.contrib import admin
from django.urls import path, re_path
from graphene_django.views import GraphQLView
from .schema import schema
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import TemplateView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("graphql", csrf_exempt(GraphQLView.as_view(schema=schema, graphiql=True))),
    re_path(r"^(?:.*)/?$", TemplateView.as_view(template_name="build/index.html")),
]
