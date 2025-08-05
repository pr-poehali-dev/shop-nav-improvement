import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Смартфон Galaxy Pro",
      price: 89990,
      image: "/img/9e6143e6-acd6-476c-ad91-f475e09c38eb.jpg",
      description: "Флагманский смартфон с отличной камерой",
      category: "Электроника"
    },
    {
      id: 2,
      name: "Ноутбук UltraBook",
      price: 124990,
      image: "/img/9e6143e6-acd6-476c-ad91-f475e09c38eb.jpg",
      description: "Легкий и мощный ноутбук для работы",
      category: "Компьютеры"
    },
    {
      id: 3,
      name: "Наушники Premium",
      price: 19990,
      image: "/img/9e6143e6-acd6-476c-ad91-f475e09c38eb.jpg",
      description: "Беспроводные наушники с шумоподавлением",
      category: "Аудио"
    }
  ]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: ''
  });

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const addProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.description) {
      const product: Product = {
        id: Date.now(),
        name: newProduct.name,
        price: parseInt(newProduct.price),
        image: "/img/9e6143e6-acd6-476c-ad91-f475e09c38eb.jpg",
        description: newProduct.description,
        category: newProduct.category || "Разное"
      };
      setProducts(prev => [...prev, product]);
      setNewProduct({ name: '', price: '', description: '', category: '' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Store" size={24} className="text-primary" />
              <h1 className="text-2xl font-bold">МегаМаркет</h1>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-foreground hover:text-primary transition-colors">Главная</a>
              <a href="#catalog" className="text-foreground hover:text-primary transition-colors">Каталог</a>
              <a href="#cart" className="text-foreground hover:text-primary transition-colors">Корзина</a>
              <a href="#profile" className="text-foreground hover:text-primary transition-colors">Профиль</a>
              <a href="#sellers" className="text-foreground hover:text-primary transition-colors">Продавцам</a>
              <a href="#contacts" className="text-foreground hover:text-primary transition-colors">Контакты</a>
              <a href="#delivery" className="text-foreground hover:text-primary transition-colors">Доставка</a>
              <a href="#payment" className="text-foreground hover:text-primary transition-colors">Оплата</a>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Icon name="User" size={16} className="mr-2" />
                Войти
              </Button>
              <Button size="sm" className="relative">
                <Icon name="ShoppingCart" size={16} className="mr-2" />
                Корзина
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 px-1 min-w-[20px] h-5">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6">Добро пожаловать в МегаМаркет</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Лучшие товары по доступным ценам. Удобная навигация для покупателей и продавцов.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="hover:scale-105 transition-transform">
              <Icon name="Search" size={20} className="mr-2" />
              Найти товары
            </Button>
            <Button variant="outline" size="lg" className="hover:scale-105 transition-transform">
              <Icon name="PlusCircle" size={20} className="mr-2" />
              Стать продавцом
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="catalog" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="catalog" className="flex items-center gap-2">
              <Icon name="Grid3X3" size={16} />
              Каталог
            </TabsTrigger>
            <TabsTrigger value="cart" className="flex items-center gap-2">
              <Icon name="ShoppingCart" size={16} />
              Корзина ({cart.length})
            </TabsTrigger>
            <TabsTrigger value="sellers" className="flex items-center gap-2">
              <Icon name="Store" size={16} />
              Продавцам
            </TabsTrigger>
            <TabsTrigger value="info" className="flex items-center gap-2">
              <Icon name="Info" size={16} />
              Информация
            </TabsTrigger>
          </TabsList>

          {/* Catalog */}
          <TabsContent value="catalog" id="catalog">
            <div className="mb-8">
              <h3 className="text-3xl font-bold mb-4">Популярные товары</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Card key={product.id} className="group hover:shadow-lg transition-all duration-200 hover:scale-105">
                    <CardHeader className="p-0">
                      <div className="aspect-square overflow-hidden rounded-t-lg bg-gray-100">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <CardTitle className="text-lg">{product.name}</CardTitle>
                        <Badge variant="secondary">{product.category}</Badge>
                      </div>
                      <CardDescription className="mb-4">{product.description}</CardDescription>
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-primary">
                          {product.price.toLocaleString('ru-RU')} ₽
                        </div>
                        <Button onClick={() => addToCart(product)} className="hover:scale-105 transition-transform">
                          <Icon name="ShoppingCart" size={16} className="mr-2" />
                          В корзину
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Cart */}
          <TabsContent value="cart" id="cart">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="ShoppingCart" size={24} />
                  Корзина
                </CardTitle>
              </CardHeader>
              <CardContent>
                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <Icon name="ShoppingCart" size={48} className="mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Корзина пуста</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <img src={item.image} alt={item.name} className="w-16 h-16 rounded object-cover" />
                          <div>
                            <h4 className="font-semibold">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">Количество: {item.quantity}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-lg font-bold">
                            {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xl font-bold">Итого:</span>
                        <span className="text-2xl font-bold text-primary">
                          {getTotalPrice().toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                      <Button size="lg" className="w-full hover:scale-105 transition-transform">
                        <Icon name="CreditCard" size={20} className="mr-2" />
                        Оформить заказ
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sellers */}
          <TabsContent value="sellers" id="sellers">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Store" size={24} />
                  Добавить товар
                </CardTitle>
                <CardDescription>
                  Разместите свой товар в нашем каталоге
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="productName">Название товара</Label>
                    <Input
                      id="productName"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Введите название товара"
                    />
                  </div>
                  <div>
                    <Label htmlFor="productPrice">Цена (₽)</Label>
                    <Input
                      id="productPrice"
                      type="number"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                      placeholder="0"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="productCategory">Категория</Label>
                  <Input
                    id="productCategory"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="Выберите категорию"
                  />
                </div>
                <div>
                  <Label htmlFor="productDescription">Описание</Label>
                  <Textarea
                    id="productDescription"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Опишите ваш товар"
                    rows={3}
                  />
                </div>
                <Button onClick={addProduct} className="w-full hover:scale-105 transition-transform">
                  <Icon name="Plus" size={20} className="mr-2" />
                  Добавить товар
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Info */}
          <TabsContent value="info">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="User" size={20} />
                    Профиль
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Управляйте своим аккаунтом и настройками</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Truck" size={20} />
                    Доставка
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Быстрая доставка по всей России от 1-3 дней</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="CreditCard" size={20} />
                    Оплата
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Безопасная оплата картой или наличными</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Phone" size={20} />
                    Контакты
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">8-800-123-45-67<br/>support@megamarket.ru</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;