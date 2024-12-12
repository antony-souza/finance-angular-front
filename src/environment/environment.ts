class Environment {
    public readonly host: string = 'http://localhost';
    public readonly port: number = 8920;
    public readonly routerAuth: string = 'auth';
    public readonly createUser: string = 'user/create';
    public readonly updateUser: string = 'user/update';
    public readonly deletePermanUser: string = 'user/delete';
    public readonly getAllUsers: string = 'user/all/enable';
    public readonly createProducts: string = 'products/create';
    public readonly getAllProductsByStore: string = 'products/store/all';
    public readonly updateProduct: string = 'products/update';
    public readonly productbilling: string = 'sales/all';
    public readonly salesAll: string = `sales/store/all`;
    public readonly salesCreate: string = 'sales/create';
    public readonly allproducts: string = 'products/allstore';
    public readonly deleteProduct: string = 'products/delete';
    public readonly getAllCategoriesByStoreId: string = 'categories/all';
    public readonly createCategories: string = 'categories/create';
    public readonly updateCategories: string = 'categories/update';
    public readonly deleteCategories: string = 'categories/delete';
}

export const environment = new Environment();