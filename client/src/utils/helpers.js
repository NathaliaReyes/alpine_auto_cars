export function formatPrice(price) {
    // we need to convert the price (int) to string to manipulate it
    let priceStr = price.toString();

    // this if statement checks if the price has a decimal part and if it doesn't, it adds two zeros (cents)
    if (!priceStr.includes('.')) {
        priceStr += '00';
    } else {
        const [integerPart, decimalPart] = priceStr.split('.');
        priceStr = integerPart + (decimalPart.length === 1 ? decimalPart + '0' : decimalPart);
    }
    
    // Insert the dot in the third position from the end which is the decimal point
    priceStr = priceStr.slice(0, -2) + '.' + priceStr.slice(-2);
    
    // Insert the comma every three digits from the right to the left of the decimal point
    priceStr = priceStr.slice(0, -6) + ',' + priceStr.slice(-6);
    
    return priceStr;
}