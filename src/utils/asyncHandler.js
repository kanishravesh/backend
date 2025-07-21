
//high order fn wraper fn



const asyncHandler= (fn) => async (req,res,nxt)=> {
    try {
        await fn(req,res,nxt)
    } catch (err) {
        res.status(err.code || 500).json({
            success:false,
            message:err.message
        })
        
    }
}

export default asyncHandler