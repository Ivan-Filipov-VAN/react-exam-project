export const ValidationLogin = (data) => {
    console.log(data);
    isEmpty(data);
}

export const ValidationRegister = (data) => {
    console.log('1');
    isEmpty(data);
    console.log('2');

    console.log(data.imageUrl);


    if (data.password.length < 5 || data.confirmPassword.length < 5 || data.imageUrl.length < 5 || data.email.length < 5) {
        throw new Error('Characters must be minimum 5 !!!');
    }


    if (data.password !== data.confirmPassword) {
        throw new Error("Pasword's dont match !!!!!");
    }
    
}

const isEmpty = (data) => {
    if (Object.values(data).some(x => !x)) {
        throw new Error('All firlds are required!');
    }
}