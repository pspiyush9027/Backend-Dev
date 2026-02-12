import fs from "fs";

function createUser(req, res) {
    try {
        const {
            name
        } = req.body;

        if (!name ) {
            return res.status(400).send("All fields are required");
        }

        let user = [];

        if (fs.existsSync("user.json")) {
            let data = JSON.parse(fs.readFileSync("user.json", "utf-8"));
            let isUser = data.find(user => user.name === name);

            if (isUser) {
                return res.status(409).send("User already exists");
           
            }
        user=data;
        }

        const newUser = {
            userId : Date.now(),
            name
        }

        user.push(newUser);

        fs.writeFileSync("user.json", JSON.stringify(user, null, 2));

        res.status(201).send("New user created sucessfully");
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal server Error");
    }
}

export default createUser;