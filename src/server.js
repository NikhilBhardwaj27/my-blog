const  express =  require('express');
const bodyParser  =  ('body-parser');
const MongoClient = require('mongodb').MongoClient;
const path  =  require('path');


// Connecting to database
const uri = "mongodb+srv://nikhil:pb02,5901@my-blog-mq1dk.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true }, { useNewUrlParser: true });

// Using JSON Parser
const app = express();
//app.use(express.static(path.join(__dirname,'my-blog/build')));
app.use(bodyParser.json())

// Fethcing articles fom database
app.get('/api/articles/:name',(req,res)=>{

    const name = req.params.name
    client.connect(async err => {
        if(err){
            throw err
        }
        try{
            const collection = await client.db("my-blog").collection("articles");
            const result = await collection.findOne({name:name})
            
            res.status(200).json(result)   
        }catch(e){
            res.status(500).json(e)
        }
      });

})

//Upvotes functionality
app.post('/api/articles/:name/upvotes',(req,res)=>{

    const articleName = req.params.name
    client.connect(async err =>{
        if(err){
            throw err
        }
        try {
            const collection = await client.db("my-blog").collection("articles");
            const resp = await collection.findOne({name:articleName})
            resp.upvote+=1;
            await collection.updateOne({name:articleName},{$set:{upvote:resp.upvote}},(error,result)=>{
                if(error){
                    throw error
                }else {
                    res.status(200).send(resp)
                }
            })    
        }catch(err){
            throw err
        }
    });
})
//Adding Comments Functionality 
app.post('/api/articles/:name/add-comment',(req,res)=>{

    const articleName = req.params.name
    const {username,text}  = req.body
    client.connect(async err =>{
        if(err){
            throw err
        }
        try {
            const collection = await client.db("my-blog").collection("articles");
            const result = await collection.findOne({name:articleName})
                result.comments.push({username,text})
                await collection.updateOne({name:articleName},{$set:{comments:result.comments}},(err,resp)=>{
                    if(err){
                        throw err
                    }
                    else {
                        res.status(200).json(result)
                    }
                })
        }catch(e){
            throw e
        }
    })
})

// app.get('*',(req,res)=>{
//     res.sendFile(path.join(__dirname + 'my-blog/build/index.html'))
// })

//Serve static files if in production
if(process.env.NODE_ENV === 'production'){
    //Set static folder
    app.use(express.static('my-blog/build'))

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'my-blog','build','index.html'))
    })
}


app.set( 'port', ( process.env.PORT || 8000 ));
// Start node server
app.listen( app.get( 'port' ), function() {
  console.log( 'Node server is running on port ' + app.get( 'port' ));
  });