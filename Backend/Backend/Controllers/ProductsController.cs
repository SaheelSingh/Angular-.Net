using Backend.Model;
using Backend.Reposteries;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        public readonly Iproduct iproduct;
        public ProductsController(Iproduct iproduct)
        {
            this.iproduct = iproduct;
        }

        [Route("/getProducts")]
        [HttpGet]
        public IActionResult FetchProducts()
        {
            var data = iproduct.GetProducts();
            return Ok(data);
        }

        [Route("/addProduct")]
        [HttpPost]
        public IActionResult SaveProduct(Product p)
        {
            var data = iproduct.PostProduct(p);
            return Ok(new { message = data });
        }

        [HttpGet("{id}")]
        public IActionResult GetProduct(int id)
        {
            var data = iproduct.GetProductById(id);
            if (data != null)
            {
                return Ok(data);
            }
            return Ok(new { message = "Product Not Found..." });
        }

        [Route("/updateProduct")]
        [HttpPut]
        public IActionResult UpdateProduct(int id, Product p)
        {
            var data = iproduct.EditProduct(id, p);
            return Ok(new { message = data });
        }

        [HttpDelete]
        public IActionResult RemoveProduct(int id) 
        {
            var data = iproduct.DeleteProduct(id);
            return Ok(new { message = data });
        }
    }
}
