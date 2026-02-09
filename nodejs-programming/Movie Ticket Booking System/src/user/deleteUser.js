import fs from "fs"

function deleteUser(req, res) {
    try {
        const { id } = req.params;
        console.log(req.params);

        if (!id) { 
            return res.status(400).send("Id is required");
        }

        if (!fs.existsSync("user.json")){
            return res.status(404).send("No users found");
        }

        const users = JSON.parse(fs.readFileSync("user.json", "utf-8"));
        const userIndex = users.findIndex((value) => users.userId === Number(id));

        if (!userIndex) {
            return res.status(404).send("User does not exist"); 
        }

        users.pop(userIndex);

        fs.writeFileSync("user.json", JSON.stringify(users, null, 2));

        res.status(201).send("User deleted Successfully")
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal server Error");
    }
}

export default deleteUser;