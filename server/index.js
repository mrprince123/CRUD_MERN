const express = require('express');
const mongoose = require('mongoose');
const url = "mongodb+srv://prince123:Prince123@cluster0.zygargr.mongodb.net/?retryWrites=true&w=majority";
const foodModel = require('./models/Food');
const cors = require('cors');

const app = express();

// npm install cors to communicate with apis that we create in backend.
// useEffectHook - it render the page when we call this. 


app.use(express.json());
app.use(cors());

mongoose.connect(url, { useNewUrlParser: true });

app.post('/insert', async function (req, res) {

    const foodName = req.body.foodName
    const rating = req.body.rating
    const description = req.body.description
    const like = req.body.like

    const food = new foodModel({
        foodName: foodName,
        rating: rating,
        description: description,
        like: like
    });

    try {
        await food.save();
        res.send("Data is Inserted");
    } catch (error) {
        res.send("Error : " + error);
    }
})

app.get('/read', async function (req, res) {
    foodModel.find({}, function (err, result) {
        if (err) {
            res.send("Error : " + err);
        } else {
            res.send(result);
        }
    });
});


app.put('/update', async function (req, res) {

    const newFoodName = req.body.newFoodName;
    const id = req.body.id;


    try {
        await foodModel.findById(id, (err, updatedFood) => {
            updatedFood.foodName = newFoodName
            updatedFood.save();
            res.send("Update the FoodName");
        });
    } catch (err) {
        res.send("Error : " + err);
    }
})

app.delete('/delete/:id', async function(req, res){
    const id = req.params.id;
    res.send(id);

    await foodModel.findByIdAndRemove(id).exec();
    res.send("Deleted");
});

app.listen(3000, function () {
    console.log("Server is running on the port 3000");
});