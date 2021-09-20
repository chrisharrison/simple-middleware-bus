type Middleware = (next: (...args: any[]) => any, ...rest: any) => any;

export default Middleware;
