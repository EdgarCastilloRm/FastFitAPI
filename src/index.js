import app from "./app";

app.listen(app.get("port"),(error)=>{
    if(error){
        console.log("Failed to start server: " + error)
    }else{
        console.log("Server initialized on port " + app.get("port"))
    }
})