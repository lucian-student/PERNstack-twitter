export function ValidateTextInput(text) {
    if (text) {
        const splitedText = text.split('');
        if (splitedText[0] === ' ' || splitedText[splitedText.length - 1] === ' ') {
            return false
        } else {
            console.log('true no mezera start no mezera end')
            return true;
        }
    } else {
        return false;
    }
};


export function ValidateUnneceserrySpaceUsage(data) {

    const splitedString = data.split('');
    console.log(splitedString);
    let valid = true;
    let count = 0;
    splitedString.forEach(element => {
        if (element === ' ') {
            console.log(count);
            count++;
        } else {
            count = 0;
        }
        if (count > 1) {
            console.log('multiple mezeras');
            valid = false;
        }
    });
    console.log(valid);
    return valid;
};

export function ValidateEmptiness(data) {
    return String(data).trim().length > 0;
}