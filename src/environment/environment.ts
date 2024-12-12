class Environment {
    public readonly host: string = 'http://localhost';
    public readonly port: number = 8920;
    public readonly routerAuth: string = 'auth';
    public readonly createUser: string = 'user/create';
    public readonly updateUser: string = 'user/update';
    public readonly getAllUsers: string = 'user/all/enable';
    public readonly getAllProductsByStore: string = 'products/store/all';
    public readonly updateProduct: string = 'products/update';
    public readonly productbilling: string = 'sales/all';
    public readonly salesAll: string = `sales/store/all`;
    public readonly salesCreate: string = 'sales/create';
    public readonly allproducts: string = 'products/allstore';

}

export const environment = new Environment();