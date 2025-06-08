using Backend.Data;
using Backend.Model;
using Backend.Reposteries;

namespace Backend.Services
{
    public class ProductService: Iproduct
    {
        private readonly ApplicationDbContext db;
        public ProductService(ApplicationDbContext db) 
        {
            this.db = db;
        }
        public List<Product> GetProducts()
        {
            var products = db.Products.ToList();
            return products;
        }

        public string PostProduct(Product p)
        {
            db.Products.Add(p);
            db.SaveChanges();
            return "Product stored succefully...";
        }

        public Product GetProductById(int id)
        {
            var data = db.Products.Find(id);
            return data;
        }

        public string EditProduct(int id, Product p)
        {
            var product = db.Products.Find(id);
            if(product == null)
            {
                return "Product not found...";
            }
            product.Pname = p.Pname;
            product.Price = p.Price;
            product.Pcategory = p.Pcategory;
            db.SaveChanges();
            return "Product update successfully...";
        }

        public string DeleteProduct(int id)
        {
            var product = db.Products.Find(id);
            if (product == null)
            {
                return "Product not found...";
            }
            db.Products.Remove(product);
            db.SaveChanges();
            return "Product deleted successfully...";
        }
    }
}
