import fs from "fs";

function createMovie(req, res) {
    try {
        const {
            movieId,
            name,
            ticketPrice
        } = req.body;


    }
    
    catch (error) {
        console.log(error);
        res.status(500).send("Internal server Error")
    }
}