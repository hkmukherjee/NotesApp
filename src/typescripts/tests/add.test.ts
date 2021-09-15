const add = (a, b) => a + b;
const generateGreeting = (name) => `Hello ${name}!`;

test(
    'Validate add two numbers',
    () => {
        const result = add(5, 2);
        expect(result).toBe(7);
    }
);

test(
    'Validate geneate greeting',
    () => {
        const result = generateGreeting('Hemant Kumar');
        expect(result).toBe('Hello Hemant Kumar!');
    }
);