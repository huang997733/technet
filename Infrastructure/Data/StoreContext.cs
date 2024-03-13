using Core;
using Microsoft.EntityFrameworkCore;

namespace Infrastucture;

public class StoreContext : DbContext
{
    public StoreContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Product> Products { get; set; }
}
