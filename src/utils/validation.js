export const ValidationLogin = (data) => {
    isEmpty(data);
}

export const ValidationRegister = (data) => {
    isEmpty(data);

    if (data.password.length < 5 || data.confirmPassword.length < 5 || data.imageUrl.length < 5 || data.email.length < 5) {
        throw new Error('Characters must be minimum 5 !!!');
    }


    if (data.password !== data.confirmPassword) {
        throw new Error("Pasword's dont match !!!!!");
    }
    
}

export const ValidationCreareRoute = (data) => {
    isEmpty(data);

    if (data.imageUrl.length < 3 || data.title.length < 3 || data.country.length < 3 || data.description.length < 3) {
        throw new Error('Characters must be minimum 3 !!!');
    }
};

const isEmpty = (data) => {
    if (Object.values(data).some(x => !x)) {
        throw new Error('All firlds are required!');
    }
}