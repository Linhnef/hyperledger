/* eslint-disable eqeqeq */
/* eslint-disable dot-notation */
/* eslint-disable curly */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable strict */
const express = require("express");
const enroll = require("./enrollAdmin");
const createUser = require("./createUser");
const createProduct = require("./createProduct");
const getAllUser = require("./getAllUser");
const getProduct = require("./getProduct");
const getUser = require("./getUser");
const register = require("./registerUser");
const login = require("./login");
const updateProduct = require("./updateProduct");
const bodyParser = require("body-parser");
const getAllProduct = require("./getAllProduct");
const jwt = require("jsonwebtoken");
const deActiveUser = require("./deActiveUser");
const activeUser = require("./activeUser");
const secret = "SECRET";
const app = express();
const port = 3000;

const createToken = (email) => {
    const expiresIn = 60 * 60;
    return {
        expiresIn,
        token: jwt.sign({ name: email }, secret || "SECRET", {
            expiresIn: 60 * 60,
        }),
    };
};

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.status(401).json("Authentication error !!");
    jwt.verify(token, secret, (err, user) => {
        console.log(err);
        if (err) return res.status(403).json("Authentication error !!");
        next();
    });
};
app.use(bodyParser.json());
const seedData = async () => {
    console.log("--------------------Start seed data---------------");
    await createUser(
        "Join",
        "Join",
        "join@gmail.com",
        "FACTORY",
        "England",
        "010101Qa"
    );
    await createUser(
        "Danny",
        "Danny",
        "danny@gmail.com",
        "FACTORY",
        "Italya",
        "010101Qa"
    );

    await createUser(
        "Jerry",
        "Jerry",
        "jerry@gmail.com",
        "WHOLE_SALER",
        "America",
        "010101Qa"
    );
    await createUser(
        "Tom",
        "Tom",
        "tom@gmail.com",
        "WHOLE_SALER",
        "America",
        "010101Qa"
    );

    await createUser(
        "Liu",
        "Liu",
        "liu@gmail.com",
        "DISTRIBUTOR",
        "Japanese",
        "010101Qa"
    );
    await createUser(
        "Shuchi",
        "Shuchi",
        "shuchi@gmail.com",
        "DISTRIBUTOR",
        "Japanese",
        "010101Qa"
    );

    await createUser(
        "Bang",
        "Bang",
        "bang@gmail.com",
        "RETAILER",
        "Chinese",
        "010101Qa"
    );
    await createUser(
        "Quin",
        "Quin",
        "quin@gmail.com",
        "RETAILER",
        "Chinese",
        "010101Qa"
    );

    await createUser(
        "Linh",
        "Linh",
        "linh@gmail.com",
        "RETAILER",
        "Vietnamese",
        "010101Qa"
    );
    await createUser(
        "Thao",
        "Thao",
        "thao@gmail.com",
        "RETAILER",
        "Vienamese",
        "010101Qa"
    );

    await createProduct(
        "product_001",
        "HAMBURGER NEW ZEALAND",
        "Danny",
        "NEW",
        new Date().getTime().toString(),
        50000
    );
    await createProduct(
        "product_002",
        "VIETNAM GRAIN",
        "Danny",
        "NEW",
        new Date().getTime().toString(),
        65000
    );
    await createProduct(
        "product_003",
        "TUNA Sashimi",
        "Danny",
        "NEW",
        new Date().getTime().toString(),
        20000
    );
    await createProduct(
        "product_005",
        "KOBE BEEF",
        "Danny",
        "NEW",
        new Date().getTime().toString(),
        55000
    );
    await createProduct(
        "product_006",
        "Macbook",
        "Join",
        "NEW",
        new Date().getTime().toString(),
        200000
    );
    await createProduct(
        "product_007",
        "ALASKA LOBSTER",
        "Join",
        "NEW",
        new Date().getTime().toString(),
        10000
    );
    await createProduct(
        "product_008",
        "LAPTOP DELL",
        "Join",
        "NEW",
        new Date().getTime().toString(),
        10000
    );
    await createProduct(
        "product_004",
        "Dalat strawberries",
        "Join",
        "NEW",
        new Date().getTime().toString(),
        70000
    );

    // distributor

    await updateProduct(
        "SEND_TO_DISTRIBUTOR",
        "product_001",
        "Liu",
        new Date().getTime().toString(),
        "Liu"
    );

    await updateProduct(
        "SEND_TO_DISTRIBUTOR",
        "product_002",
        "Shuchi",
        new Date().getTime().toString(),
        "Shuchi"
    );

    await updateProduct(
        "SEND_TO_DISTRIBUTOR",
        "product_003",
        "Shuchi",
        new Date().getTime().toString(),
        "Shuchi"
    );
    await updateProduct(
        "SEND_TO_DISTRIBUTOR",
        "product_004",
        "Liu",
        new Date().getTime().toString(),
        "Liu"
    );

    await updateProduct(
        "SEND_TO_DISTRIBUTOR",
        "product_006",
        "Shuchi",
        new Date().getTime().toString(),
        "Shuchi"
    );

    await updateProduct(
        "SEND_TO_DISTRIBUTOR",
        "product_005",
        "Liu",
        new Date().getTime().toString(),
        "Liu"
    );

    await updateProduct(
        "SEND_TO_DISTRIBUTOR",
        "product_007",
        "Liu",
        new Date().getTime().toString(),
        "Liu"
    );

    //arrived

    await updateProduct(
        "ARRIVEED",
        "product_001",
        "Liu",
        new Date().getTime().toString(),
        "Liu"
    );

    await updateProduct(
        "ARRIVEED",
        "product_002",
        "Shuchi",
        new Date().getTime().toString(),
        "Shuchi"
    );

    await updateProduct(
        "ARRIVEED",
        "product_003",
        "Shuchi",
        new Date().getTime().toString(),
        "Shuchi"
    );
    await updateProduct(
        "ARRIVEED",
        "product_004",
        "Liu",
        new Date().getTime().toString(),
        "Liu"
    );

    await updateProduct(
        "ARRIVEED",
        "product_005",
        "Liu",
        new Date().getTime().toString(),
        "Liu"
    );

    await updateProduct(
        "ARRIVEED",
        "product_007",
        "Liu",
        new Date().getTime().toString(),
        "Liu"
    );

    //who sale

    await updateProduct(
        "SEND_TO_WHOSALE",
        "product_001",
        "Tom",
        new Date().getTime().toString(),
        "Tom"
    );

    await updateProduct(
        "SEND_TO_WHOSALE",
        "product_002",
        "Jerry",
        new Date().getTime().toString(),
        "Jerry"
    );

    await updateProduct(
        "SEND_TO_WHOSALE",
        "product_003",
        "Tom",
        new Date().getTime().toString(),
        "Tom"
    );

    await updateProduct(
        "SEND_TO_WHOSALE",
        "product_004",
        "Jerry",
        new Date().getTime().toString(),
        "Jerry"
    );

    await updateProduct(
        "SEND_TO_WHOSALE",
        "product_005",
        "Tom",
        new Date().getTime().toString(),
        "Tom"
    );

    // arrived

    await updateProduct(
        "ARRIVEED",
        "product_001",
        "Tom",
        new Date().getTime().toString(),
        "Tom"
    );

    await updateProduct(
        "ARRIVEED",
        "product_002",
        "Jerry",
        new Date().getTime().toString(),
        "Jerry"
    );

    await updateProduct(
        "ARRIVEED",
        "product_003",
        "Tom",
        new Date().getTime().toString(),
        "Tom"
    );

    const rs = await updateProduct(
        "ARRIVEED",
        "product_004",
        "Jerry",
        new Date().getTime().toString(),
        "Jerry"
    );

    // retailer
    await updateProduct(
        "SEND_TO_RETAILER",
        "product_001",
        "Quin",
        new Date().getTime().toString(),
        "Quin"
    );

    await updateProduct(
        "SEND_TO_RETAILER",
        "product_002",
        "Linh",
        new Date().getTime().toString(),
        "Linh"
    );

    await updateProduct(
        "SEND_TO_RETAILER",
        "product_003",
        "Linh",
        new Date().getTime().toString(),
        "Linh"
    );

    await updateProduct(
        "SEND_TO_RETAILER",
        "product_004",
        "Quin",
        new Date().getTime().toString(),
        "Quin"
    );

    ///arrived

    if (rs) {
        console.log(
            "--------------------You already start using the supply chain---------------"
        );
    }
};

const fabricInit = async () => {
    await enroll();
    await register();
    await seedData();
};
fabricInit();

app.post("/createUser", async (req, res) => {
    try {
        const { userName, userId, userEmail, userRole, address, password } =
            req.body;
        if (
            userName &&
            userId &&
            userEmail &&
            userRole &&
            address &&
            password
        ) {
            const rs = await createUser(
                userName,
                userId,
                userEmail,
                userRole,
                address,
                password
            );
            if (rs.error) {
                res.status(400).send(rs);
            } else {
                res.status(200).send({ success: true });
            }
        } else {
            res.status(400).send({ error: true });
        }
    } catch (error) {
        console.log("error : ", error);
        res.status(400).send(error);
    }
});

app.post("/createProduct", authenticateToken, async (req, res) => {
    try {
        const { ProductId, Name, FactoryId, Status, Factory, Price } = req.body;
        if (ProductId && Name && Status && FactoryId && Factory && Price) {
            const rs = await createProduct(
                ProductId,
                Name,
                FactoryId,
                Status,
                Factory,
                Price
            );
            if (rs.error) {
                res.status(400).send(rs);
            } else {
                res.status(200).send({ success: true });
            }
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get("/getUser", async (req, res) => {
    try {
        const id = req.query.id;
        const rs = await getUser(id);
        if (rs.error) {
            res.status(400).send(rs);
        } else {
            res.status(200).send(rs);
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get("/getProduct", async (req, res) => {
    try {
        const id = req.query.id;
        const rs = await getProduct(id);
        if (rs.error) {
            res.status(400).send(rs);
        } else {
            res.status(200).send(rs);
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

app.post("/login", async (req, res) => {
    try {
        const { userId, password } = req.body;
        const rs = await login(userId, password);
        if (!rs.error) {
            res.status(200).send({
                user: rs.user,
                token: createToken(userId).token,
            });
        } else {
            res.status(400).send(rs.error);
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get("/getUsers", async (req, res) => {
    try {
        const rs = await getAllUser();
        if (rs.error) {
            res.status(400).send(rs);
        } else {
            res.status(200).send(rs);
        }
    } catch (error) {
        res.status(400).send(error);
    }
});
app.get("/getProducts", async (req, res) => {
    try {
        const rs = await getAllProduct();
        if (rs.error) {
            res.status(400).send(rs);
        } else {
            res.status(200).send(rs);
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

app.post("/updateProduct", async (req, res) => {
    try {
        const { method, productId, userId, date, consumerId } = req.body;
        if (method && productId && userId && date && consumerId) {
            const rs = await updateProduct(
                method,
                productId,
                userId,
                date,
                consumerId
            );
            if (rs.error) {
                res.status(400).send(rs);
            } else {
                res.status(200).send({ sucess: true });
            }
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

app.post("/active", async (req, res) => {
    try {
        const { id } = req.body;
        if (id) {
            const rs = await activeUser(id);
            if (rs.error) {
                res.status(400).send(rs);
            } else {
                res.status(200).send({ sucess: true });
            }
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

app.post("/deActive", async (req, res) => {
    try {
        const { id } = req.body;
        if (id) {
            const rs = await deActiveUser(id);
            if (rs.error) {
                res.status(400).send(rs);
            } else {
                res.status(200).send({ sucess: true });
            }
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

app.listen(port, () => {
    console.log(`Application start on port ${port} !`);
});
