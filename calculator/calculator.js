document.addEventListener('DOMContentLoaded', function () {
    const display = document.querySelector('input[name="display"]');
    const calculatorForm = document.querySelector('.calculator-class form');

    calculatorForm.addEventListener('click', function (event) {
        if (event.target.tagName === 'INPUT') {
            const value = event.target.value;

            // Check if the clicked button is a number, operator, or special function
            if (!isNaN(parseFloat(value)) || value === '.') {
                display.value += value;
            } else if (value === 'AC') {
                // Clear the display
                display.value = '';
            } else if (value === 'DE') {
                // Delete the last character
                display.value = display.value.slice(0, -1);
            } else if (value === '=') {
                // Evaluate the expression
                try {
                    display.value = evaluateExpression(display.value);
                } catch (error) {
                    display.value = 'Error';
                }
            } else {
                // Handle operators (+, -, *, /)
                display.value += ' ' + value + ' ';
            }
        }
    });

    // Function to evaluate the expression
    function evaluateExpression(expression) {
        // Split the expression into operands and operator
        const tokens = expression.split(' ');
        const operand1 = parseFloat(tokens[0]);
        const operator = tokens[1];
        const operand2 = parseFloat(tokens[2]);

        // Perform the calculation based on the operator
        switch (operator) {
            case '+':
                return operand1 + operand2;
            case '-':
                return operand1 - operand2;
            case '*':
                return operand1 * operand2;
            case '/':
                if (operand2 !== 0) {
                    return operand1 / operand2;
                } else {
                    throw new Error('Division by zero');
                }
            default:
                throw new Error('Invalid operator');
        }
    }
});
