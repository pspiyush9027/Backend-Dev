import fs from 'fs';

function filterName(req, res) {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).send("Name is required");
        }
        if(!fs.existsSync("user.json")){
            return res.status(404).send("No user found");
        }

        let data = [];
    
        if (fs.existsSync("user.json")) {
            data = JSON.parse(fs.readFileSync("user.json", "utf-8"));
            let filterData = data.filter((value) => value.name.toLowerCase() === name.toLowerCase()); 
            return res.status(200).send(filterData);

        }
    
        else {
            return res.status(404).send("No user found");
        }
    } 
    catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

export default filterName;