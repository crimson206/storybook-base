import 'reflect-metadata';

function ClassDoc(description: string) {
    return function (constructor: Function) {
        Reflect.defineMetadata("classDescription", description, constructor);
    };
}

function MethodDoc(description: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        Reflect.defineMetadata("methodDescription", description, target, propertyKey);
    };
}

@ClassDoc(`
/**
 * Utility class providing various mathematical operations.
 */
`)
class MathUtils {
    @MethodDoc(`
    /**
     * Adds two numbers together.
     * @param {number} a - The first number.
     * @param {number} b - The second number.
     * @returns {number} The sum of the two numbers.
     */
    `)
    add(a: number, b: number): number {
        return a + b;
    }

    @MethodDoc(`
    /**
     * Subtracts the second number from the first number.
     * @param {number} a - The first number.
     * @param {number} b - The second number.
     * @returns {number} The result of the subtraction.
     */
    `)
    subtract(a: number, b: number): number {
        return a - b;
    }
}

const utils = new MathUtils();

// 클래스의 문서화 정보 가져오기
const classDescription = Reflect.getMetadata("classDescription", MathUtils);
console.log(classDescription);

// 메서드의 문서화 정보 가져오기
const addMethodDescription = Reflect.getMetadata("methodDescription", utils, "add");
console.log(addMethodDescription);

const subtractMethodDescription = Reflect.getMetadata("methodDescription", utils, "subtract");
console.log(subtractMethodDescription);

const Dummy = "Hi"

export default Dummy