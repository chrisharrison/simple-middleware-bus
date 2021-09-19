import { Middleware } from '.';
import Pipeline from './pipeline';

test('runs middleware in order', () => {
    const middleware1: Middleware = (next, param1: string, param2: string): string => {
        return 'middleware1-before/' + next(param1 + '-', param2 + '-') + '/middleware1-after';
    };
    const middleware2: Middleware = (next, param1: string, param2: string): string => {
        const reverse = (string: string): string => string.split('').reverse().join('');
        return 'middleware2-before/' + next(reverse(param1), reverse(param2)) + '/middleware2-after';
    };

    const pipeline = new Pipeline([middleware1, middleware2]);
    
    const result = pipeline.run((param1: string, param2: string) => {
        return `initial-call(${param1}, ${param2})`;
    }, 'alice', 'robert');

    expect(result).toBe('middleware1-before/middleware2-before/initial-call(-ecila, -trebor)/middleware2-after/middleware1-after');
});
