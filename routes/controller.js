module.exports = 
{
    getPlato: (req, res) =>
    {
        console.log("getPlato")
        var selectPlato = "select id, nombre, precio from PLATO;"

        db.query(selectPlato, function(err, rows)
        {
            if(err)
            {
                console.log("[error] getPlato. Query selectPlato " + err)
                res.send({"error": true});
            } //end if
            else
            {
                res.send({"error": false, "platos": rows});
            } //end else
        }) //end selectPlato
    }, //end getPlato

    newPlato: (req, res) =>
    {
        console.log("[info] body ", req.body)
        console.log("[info] query ", req.query)
        db.beginTransaction(function(error)
        {
            if(error)
            {
                db.rollback()
                console.log("[error] newPlato. beginTransaction " + error)
                res.send({"error": true})
            } //end if
            else
            {
                var insertPlato = "insert into PLATO (NOMBRE, PRECIO) values (?, ?);"
                var insertPlatoValues = [req.body.nombre, req.body.precio]

                db.query(insertPlato, insertPlatoValues, function(err, rows)
                {
                    if(err)
                    {
                        db.rollback()
                        console.log("[error] newPlato. Query insertPlato " + err)
                        res.send({"error": true});
                    } //end if
                    else
                    {
                        db.commit()
                        res.send({"error": false, "id": rows.insertId});
                    } //end else
                }) //end insertPlato
            } //end else
        }) //beginTransaction
    }, //end newPlato

    deletePlato: (req, res) =>
    {
        db.beginTransaction(function(error)
        {
            if(error)
            {
                db.rollback()
                console.log("[error] deletePlato. beginTransaction " + error)
                res.send({"error": true})
            } //end if
            else
            {
                var deletePlato = "delete from PLATO where id = ?;"
                var deletePlatoValues = [req.body.id]

                db.query(deletePlato, deletePlatoValues, function(err, rows)
                {
                    if(err)
                    {
                        db.rollback()
                        console.log("[error] deletePlato. Query deletePlato " + err)
                        res.send({"error": true});
                    } //end if
                    else
                    {
                        db.commit()
                        res.send({"error": false});
                    } //end else
                }) //end deletePlato
            } //end else
        }) //end beginTransaction
    }, //end deletePlato

    updatePlato: (req, res) =>
    {
        db.beginTransaction(function(error)
        {
            if(error)
            {
                db.rollback()
                console.log("[error] updatePlato. beginTransaction " + error)
                res.send({"error": true})
            } //end if
            else
            {
                var updatePlato = "update PLATO set nombre = ?, precio = ? where id = ?;"
                var updatePlatoValues = [req.body.nombre, req.body.precio, req.body.id]

                db.query(updatePlato, updatePlatoValues, function(err, rows)
                {
                    if(err)
                    {
                        db.rollback()
                        console.log("[error] updatePlato. Query updatePlato " + err)
                        res.send({"error": true});
                    } //end if
                    else
                    {
                        db.commit()
                        res.send({"error": false});
                    } //end else
                }) //end updatePlato
            } //end else
        }) //end beginTransaction
    }, //end updatePlato
} //end exports
