using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Backend.Model
{
    public class Product
    {
        [Key]
        public int Pid { get; set; }
        [Required(ErrorMessage ="Product name is required")]
        public string Pname { get; set; }
        [Required(ErrorMessage = "Product Category is required")]
        public string Pcategory { get; set; }
        [Range(0.1, Double.MaxValue, ErrorMessage ="Product price out of range")]
        public double Price { get; set; }
    }
}
