class Environment {
    public readonly host: string = 'http://localhost';
    public readonly port: number = 8920;
    public readonly routerAuth: string = 'auth';
    public readonly getAllUsers: string = 'user/all';
    public readonly charts: string = 'charts';
}

export const environment = new Environment();