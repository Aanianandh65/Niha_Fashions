
from django.db import models


class Product(models.Model):

    CATEGORY_CHOICES = [
        ("Women", "Women"),
        ("Men", "Men"),
        ("Kids", "Kids"),
        ("Accessories", "Accessories"),
        ("Footwear", "Footwear"),
        ("Summer", "Summer"),
        ("Winter", "Winter"),
        ("Party Wear", "Party Wear"),
        ("Casual", "Casual"),
        ("Luxury", "Luxury"),
        ("Trending", "Trending"),
    ]

    name = models.CharField(max_length=200)
    brand = models.CharField(max_length=100, default="NIHA")

    category = models.CharField(
        max_length=50,
        choices=CATEGORY_CHOICES
    )

    image = models.URLField(max_length=500)

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    original_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True
    )

    discount = models.PositiveIntegerField(
        default=0
    )

    rating = models.DecimalField(
        max_digits=3,
        decimal_places=1,
        default=0
    )

    reviews = models.PositiveIntegerField(
        default=0
    )

    description = models.TextField(
        blank=True
    )

    stock = models.PositiveIntegerField(
        default=0
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.name
# Create your models here.
