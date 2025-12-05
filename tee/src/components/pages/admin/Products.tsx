"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  price?: number;
  weight?: string;
  description: string;
  ingredients: string;
  category?: string;
  stock: number;
  image_url: string;
  is_active: boolean;
  variants?: Array<{ weight: string; price: number; mrp?: number }>;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    ingredients: "",
    category: "",
    stock: "",
    image_url: "",
    is_active: true,
    variants: [{ weight: "", price: "", mrp: "" }]
  });

  const categories = ["Podi", "Tea Powder", "Masala", "Spices"];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      const mappedProducts = data.map((product: any) => ({
        id: product.id || product._id,
        name: product.name,
        price: product.variants?.[0]?.price || product.price || 0,
        weight: product.variants?.[0]?.weight || product.weight || '',
        description: product.description || '',
        ingredients: product.ingredients || '',
        category: product.category || 'Spices',
        stock: product.stock_quantity || 0,
        image_url: product.image_url || '/placeholder.svg',
        is_active: product.is_active !== false,
        variants: product.variants || []
      }));
      setProducts(mappedProducts);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      ingredients: "",
      category: "",
      stock: "",
      image_url: "",
      is_active: true,
      variants: [{ weight: "", price: "", mrp: "" }]
    });
    setEditingProduct(null);
  };

  const handleAddProduct = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setFormData({
      name: product.name,
      description: product.description,
      ingredients: product.ingredients,
      category: product.category || '',
      stock: product.stock.toString(),
      image_url: product.image_url || '/placeholder.svg',
      is_active: product.is_active,
      variants: product.variants && product.variants.length > 0 
        ? product.variants.map(v => ({ weight: v.weight, price: v.price.toString(), mrp: v.mrp?.toString() || "" }))
        : [{ weight: product.weight || "", price: (product.price || 0).toString(), mrp: "" }]
    });
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      name: formData.name,
      description: formData.description,
      ingredients: formData.ingredients,
      category: formData.category,
      stock_quantity: parseInt(formData.stock),
      image_url: formData.image_url || "/placeholder.svg",
      is_active: formData.is_active,
      variants: formData.variants.map(v => ({
        weight: v.weight,
        price: parseFloat(v.price),
        mrp: v.mrp ? parseFloat(v.mrp) : undefined
      }))
    };

    try {
      if (editingProduct) {
        // Update product via API
        const response = await fetch(`/api/products?id=${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData)
        });
        if (!response.ok) throw new Error('Failed to update product');
        toast.success("Product updated successfully!");
      } else {
        // Create new product via API
        const response = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData)
        });
        if (!response.ok) throw new Error('Failed to create product');
        toast.success("Product added successfully!");
      }
      
      setIsDialogOpen(false);
      resetForm();
      fetchProducts(); // Refresh the products list
    } catch (error) {
      toast.error(editingProduct ? "Failed to update product" : "Failed to add product");
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(`/api/products?id=${id}`, {
          method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete product');
        toast.success("Product deleted successfully!");
        fetchProducts(); // Refresh the products list
      } catch (error) {
        toast.error("Failed to delete product");
      }
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Products Management</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddProduct}>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? "Edit Product" : "Add New Product"}
              </DialogTitle>
            </DialogHeader>
            <div className="max-h-[70vh] overflow-y-auto pr-2">
              <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="stock">Stock Quantity</Label>
                <Input
                  id="stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({...formData, stock: e.target.value})}
                  required
                />
              </div>

              <div>
                <Label>Product Variants</Label>
                <div className="space-y-3">
                  {formData.variants.map((variant, index) => (
                    <div key={index} className="grid grid-cols-4 gap-2 items-end">
                      <div>
                        <Label>Weight</Label>
                        <Input
                          value={variant.weight}
                          onChange={(e) => {
                            const newVariants = [...formData.variants];
                            newVariants[index].weight = e.target.value;
                            setFormData({...formData, variants: newVariants});
                          }}
                          placeholder="250g"
                          required
                        />
                      </div>
                      <div>
                        <Label>Price (₹)</Label>
                        <Input
                          type="number"
                          value={variant.price}
                          onChange={(e) => {
                            const newVariants = [...formData.variants];
                            newVariants[index].price = e.target.value;
                            setFormData({...formData, variants: newVariants});
                          }}
                          required
                        />
                      </div>
                      <div>
                        <Label>MRP (₹)</Label>
                        <Input
                          type="number"
                          value={variant.mrp}
                          onChange={(e) => {
                            const newVariants = [...formData.variants];
                            newVariants[index].mrp = e.target.value;
                            setFormData({...formData, variants: newVariants});
                          }}
                          placeholder="Optional"
                        />
                      </div>
                      <div>
                        {formData.variants.length > 1 && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              const newVariants = formData.variants.filter((_, i) => i !== index);
                              setFormData({...formData, variants: newVariants});
                            }}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        variants: [...formData.variants, { weight: "", price: "", mrp: "" }]
                      });
                    }}
                  >
                    Add Variant
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="ingredients">Ingredients</Label>
                <Textarea
                  id="ingredients"
                  value={formData.ingredients}
                  onChange={(e) => setFormData({...formData, ingredients: e.target.value})}
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="image">Product Image</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    className="mb-2"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        if (file.size > 5 * 1024 * 1024) {
                          toast.error('Image size should be less than 5MB');
                          return;
                        }
                        const reader = new FileReader();
                        reader.onload = (e) => {
                          setFormData({ ...formData, image_url: e.target?.result as string });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <p className="text-sm text-gray-500">Upload product image (Max 5MB)</p>
                  {formData.image_url && formData.image_url !== '/placeholder.svg' && (
                    <div className="mt-4">
                      <img src={formData.image_url} alt="Preview" className="w-32 h-32 object-cover rounded mx-auto" />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        className="mt-2"
                        onClick={() => setFormData({ ...formData, image_url: '/placeholder.svg' })}
                      >
                        Remove Image
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingProduct ? "Update Product" : "Add Product"}
                </Button>
              </div>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Products ({products.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    {product.variants && product.variants.length > 0 ? (
                      <div>
                        <div>₹{product.variants[0].price}</div>
                        {product.variants.length > 1 && (
                          <div className="text-xs text-gray-500">+{product.variants.length - 1} more</div>
                        )}
                      </div>
                    ) : (
                      `₹${product.price || 0}`
                    )}
                  </TableCell>
                  <TableCell>
                    {product.variants && product.variants.length > 0 ? (
                      <div>
                        <div>{product.variants[0].weight}</div>
                        {product.variants.length > 1 && (
                          <div className="text-xs text-gray-500">+{product.variants.length - 1} more</div>
                        )}
                      </div>
                    ) : (
                      product.weight || ''
                    )}
                  </TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <Badge variant={product.is_active ? "default" : "secondary"}>
                      {product.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditProduct(product)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Products;