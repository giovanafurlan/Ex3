export const getUsers = async () => {
    try {
        const response = await fetch('https://reqres.in/api/users');
        const json = await response.json();
        console.log(json);
    } catch (error) {
        console.log(error);
    }
};