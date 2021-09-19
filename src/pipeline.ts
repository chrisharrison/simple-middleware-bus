import Middleware from './middleware';

class Pipeline {
    private middlewares: Middleware[];

    constructor(middlewares: Middleware[]) {
      this.middlewares = middlewares;
    }

    run(call: Function, ...params: any) {
      let stack = call;

      this.middlewares.reverse().forEach((middleware: Middleware) => {
        const previousStack = stack;
        stack = (...rest: any) => middleware(previousStack, ...rest);
      });
      return stack(...params);
    }
}

export default Pipeline;
