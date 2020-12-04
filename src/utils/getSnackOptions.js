// #00d084 - Success
// #eb144c - Error
// #ff6900 - Warning
// #0693e3 - Info

export const getSnackOptions = (type, position) => {
    const snackInitialOptions = {
        position: '',
        style: {
            background: '',
            borderRadius: '10px',
            color: '#fff',
            fontSize: '20px',
            padding: '5px'
        },
        closeStyle: {
            fontSize: '15px'
        }
    }

    snackInitialOptions.position = position;

    switch (type) {
        case 'Success':
            snackInitialOptions.style.background = '#00d084';
            break;
        case 'Error':
            snackInitialOptions.style.background = '#eb144c';
            break;
        case 'Warning':
            snackInitialOptions.style.background = '#ff6900';
            break;
        case 'Info':
            snackInitialOptions.style.background = '#0693e3';
            break;
        default:
            break;
    }

    return snackInitialOptions;
}