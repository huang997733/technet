using System.Linq.Expressions;

namespace Core;

public class ProductsWithTypeAndBrandsSpecification : BaseSpecification<Product>
{
    public ProductsWithTypeAndBrandsSpecification()
    {
        AddInclude(x => x.ProductType);
        AddInclude(x => x.ProductBrand);
    }

    public ProductsWithTypeAndBrandsSpecification(int id) : base(x => x.Id == id)
    {
        AddInclude(x => x.ProductType);
        AddInclude(x => x.ProductBrand);
    }
}
