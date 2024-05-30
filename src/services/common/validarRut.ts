const validarRut = (rut: string): boolean => {
    const cleanedRut = rut.replace(/[\.\-]/g, '');
    const rutNumber = cleanedRut.slice(0, -1);
    const verifierDigit = cleanedRut.slice(-1).toUpperCase();

    if (!/^\d{7,8}$/.test(rutNumber)) {
        return false;
    }
    
    let sum = 0;
    let multiplier = 2;
    
    for (let i = rutNumber.length - 1; i >= 0; i--) {
        sum += parseInt(rutNumber.charAt(i), 10) * multiplier;
        multiplier = (multiplier === 7) ? 2 : multiplier + 1;
    }
    
    const remainder = sum % 11;
    let calculatedVerifier = (11 - remainder).toString();
    
    if (calculatedVerifier === '11') {
        calculatedVerifier = '0';
    } else if (calculatedVerifier === '10') {
        calculatedVerifier = 'K';
    }
    return calculatedVerifier === verifierDigit;
}

export default validarRut;