const express = require("express");
const app = express();
const port = 3000;
const connection = require("./config");

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ // Middleware
    extended: true
}));
app.use(bodyParser.json());

app.post("/api/movies/insert", (req, res) => {

    connection.query("INSERT INTO movie  SET ?", req.body, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error saving an movie");
        } else {
            console.log(res);
            res.sendStatus(200);
        }
    });
});

app.get("/api/movies", (req, res) => {
    connection.query("SELECT * from movie", (err, results) => {
        console.log(err);
        res.send(results)
    });
});

app.get("/api/movies/names", (req, res) => {
    connection.query("SELECT name from movie", (err, results) => {
        console.log(err);
        res.send(results)
    });
});

app.get("/api/movies/filter/", (req, res) => {
    connection.query("SELECT * from movie where name like '%" + req.query.contains + "%'", (err, response) => {
        console.log(err);
        res.json(response)
    });
});

app.get("/api/movies/filter0/", (req, res) => {
    connection.query("SELECT * from movie where name like '" + req.query.starts + "%'", (err, response) => {
        console.log(err);
        res.json(response)
    });
});

app.get("/api/movies/filter1/", (req, res) => {
    connection.query("SELECT * from movie where releseDate >'" + req.query.grater + "'", (err, response) => {
        console.log(err);
        res.json(response)
    });
});

app.get("/api/movies/:order", (req, res) => {
    connection.query("SELECT *  from movie order by releseDate " + req.params.order + "", (err, response) => {
        console.log(err);
        res.json(response)
    })

})

app.put('/api/movies/update/:id', (req, res) => {
    connection.query('UPDATE movie SET ? WHERE id = ?', [req.body, req.params.id], err => {
        if (err) {
            console.log(err);
            res.status(500).send("Error editing a movie");
        } else {
            res.sendStatus(200);
        }

    })
})

app.put('/api/movies/:id/toggle/:boolean', (req, res) => {
    connection.query('UPDATE movie SET oscar=' + req.params.boolean + ' WHERE id= ?', req.params.id, err => {
        if (err) {
            console.log(err);
            res.status(500).send("Error editing a movie");
        } else {
            res.sendStatus(200);
        }

    })
})

app.delete("/api/movies/deleteNoOscars/false", (res, req) => {
    connection.query("DELETE from movie where oscar=0", err => {
        if (err) {
            console.log(err);
            res.status(500).send("Error deleting the movies")
        } else (
            res.sendStatus(200)
        )
    })
})


app.delete("/api/movies/delete/:id", (req, resp) => {
    connection.query("DELETE from movie where id=" + req.params.id + "", err => {
        if (err) {
            console.log(err);
            res.status(500).send("Error deleting the movie")
        } else {
            resp.sendStatus(200)
        }
    })
})



app.listen(port, (err) => {
    if (err) {
        throw new Error("Something bad happened...");
    }
    console.log(`Server is listening on ${port}`);
})
