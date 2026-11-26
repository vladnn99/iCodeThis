const {app}=require('@azure/functions');const {createHandler}=require('./handler.cjs');app.http('contact',{route:'contact',methods:['POST','OPTIONS'],authLevel:'anonymous',handler:createHandler()});
