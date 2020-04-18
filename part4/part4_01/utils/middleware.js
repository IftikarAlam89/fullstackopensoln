const logger = require('./logger')

const requestlogger = (request, response, next)=>{
    logger.info("Method :", request.method)
    logger.info("Path   :", request.path)
    logger.info("Body   :", request.body)
    logger.info("-------")
}

const unknownendpoint = (request, response,next)=>{
    response.sendStatus(404)
        //.send({error: "unknown endpoint"})
   

}

const errorHandler = (error,request,response,next)=>{
    logger.err(error.message)
    if (error.name==="CastError" && error.kind=="ObjectId"){
        return response.send(404).send({error:"malformatted id"})
    }else if(error.name==="ValidationError"){
        return response.send(404).send({error:error.message})
    }else if (error.name === "JsonWebTokenError"){
        return response.status(404).json({
            error: 'invalid token'
        })
    }
    next(error)
}

const tokenExtractor =(request,response,next)=>{

    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        request.token = authorization.substring(7)


    }
    next()

}

module.exports={
    requestlogger,
    unknownendpoint,
    errorHandler,
    tokenExtractor
}