/* eslint-disable quotes */
const processLoginData = (data) => {
    const dataProcess = data.replace("{", "").replace("}", "").split(" ");
    return {
        userName: dataProcess[0],
        userId: dataProcess[1],
        userEmail: dataProcess[2],
        userRole: dataProcess[3],
        address: dataProcess[4],
        password: dataProcess[5],
    };
};

module.exports = processLoginData;
