from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=30, db_index=True, verbose_name="Категория")
    image = models.ImageField(upload_to='images/product/', verbose_name="Фото")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категории"


class Product(models.Model):
    name = models.CharField(max_length=30, verbose_name="Товар")
    image = models.ImageField(upload_to='images/product/', verbose_name="Фото")
    count = models.IntegerField(verbose_name="Количество")
    price = models.IntegerField(verbose_name="Цена")
    description = models.TextField(verbose_name="Описание")
    color = models.CharField(max_length=30, verbose_name="Цвет")
    memory = models.CharField(max_length=30,verbose_name="Оперативная память")
    cpu = models.CharField(max_length=30,verbose_name="ЦПУ")
    screen = models.CharField(max_length=30,verbose_name="Размер экрана")
    category = models.ForeignKey(Category, on_delete=models.CASCADE, verbose_name="Категория")
    orders = models.IntegerField(verbose_name="Покупок", default=0)

    class Meta:
        verbose_name = "Товар"
        verbose_name_plural = "Товары"

    def __str__(self):
        return self.name