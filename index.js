const express=require('express')
const cors = require('cors');
const mongoose=require('mongoose')
const { v4: uuidv4 } = require('uuid');

const app = express()

app.use(express.json())
app.use(cors())


app.get("/", (req,res)=>{
  
    res.send("<h1>API WorkSucessful</h1>")
  })

//    model part

const moviesSchema = new mongoose.Schema({
    _id: String,
    posterImage: String,
    movieTitle:String,
    director: String,
    year: Number,
    genre: String,
    imdbRating: Number,
    ticketCost: Number,
  
  });
  const movieTask = mongoose.model('movies', moviesSchema);



// confid(db) part
async function connectDatabase() {


    try{
      await mongoose.connect('mongodb+srv://annugupta8512:annu%408512@clusteranu.2ad3iyv.mongodb.net/moviesData')
    
      console.log('Connected to DB')
    
    }
    catch(e){
      console.log("error is connnection",e);
    }
    }

    // post,get,delete,patch method

    app.post("/addData", async (req,res)=>{
     let {posterImage,movieTitle,director,year,genre,imdbRating,ticketCost}=req.body
     const movieid=uuidv4();
    try{
        
        const flag=new  movieTask({ _id:movieid,posterImage,movieTitle,director,year,genre,imdbRating,ticketCost})
        await flag.save();

        res.json({message:' movie data created succesfully',result:flag})
   }
    catch(error){
        console.log("Post Error",error)
        res.send(`Data Post fail: ${error}`);
    }

    
})
app.get("/getData", async (req,res)=>{
    let {posterImage,movieTitle,director,year,genre,imdbRating,ticketCost}=req.body
    const movieid=uuidv4();
   try{
       
       const flag=new  movieTask({ _id:movieid,posterImage,movieTitle,director,year,genre,imdbRating,ticketCost})
       await flag.save();

       res.json({message:' movie data created succesfully',result:flag})
  }
   catch(error){
       console.log("Post Error",error)
       res.send(`Data Post fail: ${error}`);
   }

   
})
    // conection part

    const port = 3000;
connectDatabase()
.then(() => {
    app.listen(port, (e) => {
        if(e){
            console.log("Server Error",e);
        }
        console.log(`Server listening on http://localhost:${port}`)
    })
})