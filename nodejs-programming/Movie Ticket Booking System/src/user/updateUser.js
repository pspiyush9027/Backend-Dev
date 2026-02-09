import fs from "fs"

function updateUser(req, res) {
    try {
        const {id} = req.params;
        const {name, email} = req.body;
        console.log(req.body);
        console.log(req.params);

        if (!id || !name || !email) {
            return res.status(400).send("Id, email, name all are required");
        }

        if (!fs.existsSync("user.json")) {
            return res.status(404).send("No users found");
        }

        const users = JSON.parse(fs.readFileSync("user.json", "utf-8"));
        const userIndex = users.findIndex(user => user.userId === Number(id));

        if (userIndex === -1) {
            return res.status(404).send("No user found");
        }

        users[userIndex].name = name;
        users[userIndex].email = email;

        fs.writeFileSync("user.json", JSON.stringify(users, null, 2));

        res.status(200).send("User updated successfully");
    }

    catch(error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

export default updateUser