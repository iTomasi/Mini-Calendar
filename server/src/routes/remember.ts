import express from "express";
import connection from "../databases/mysql";
const router = express.Router();

router.get("/", (req, res) => {
    connection.query("SELECT * FROM remembers", (err, resp) => {
        if (err) return console.log(err)

        res.json(resp)
    })
});

router.post("/saving-reminder", (req, res) => {
    const {day, month, year, remember} = req.body;

    if (!day || !month || !year || !remember || day === "" || month === "" || year === "" || remember === "") return res.json({message: "ERROR PAPU send the dates correctly porfavor :s"})

    connection.query("INSERT INTO remembers (day, month, year, remember) VALUE (?,?,?,?)", [day, month, year, remember], (err, resp) => {
        if (err) return console.log(err)

        res.json({message: "Reminder Added."})
    })

})

router.put("/updating-reminder/:id", (req, res) => {
    const id = req.params.id;
    const {remember} = req.body;

    if (remember === "" || !remember) return res.json({message:"Q pasa papu estas editando el form"})

    connection.query("UPDATE remembers SET remember = ? WHERE id = ?", [remember, id], (err, resp) => {
        if (err) return console.log(err)

        res.json({message: "reminder updated"})
    })
})

router.post("/removing-reminder/:id", (req, res) => {
    const id = req.params.id;
    const {remember} = req.body;

    if (!remember) return res.json({message: "Q pasa maquinola cambiaste el nombre del remember"})

    connection.query("UPDATE remembers SET remember = ? WHERE id = ?", [remember, id], (err, resp) => {
        if (err) return console.log(err)

        res.json({message: "Reminder Removed."})

        if (resp[0] !== undefined) return

        connection.query("DELETE FROM remembers WHERE id = ?", [id], (err, resp) => {
            if (err) return console.log(err)
            console.log("Day Deleted")
        })
    })
})

export default router;