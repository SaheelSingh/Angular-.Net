using Backend.Model;

namespace Backend.Reposteries
{
    public interface Iproduct
    {
        List<Product> GetProducts();
        string PostProduct(Product p);
        string EditProduct(int id, Product p);
        Product GetProductById(int id);
        string DeleteProduct(int id);
    }
}
