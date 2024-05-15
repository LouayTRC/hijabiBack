    const jwt=require('jsonwebtoken');

    module.exports=(req,res,next)=>{
        try {
            const token=req.headers.authorization.split(' ')[1];
            const decodedToken=jwt.verify(token,'f1sd3f12dsg1d65fs165f1ds6g1re6f1sq6f1sd65f1sd65srt1rs53fzeyehyutyj');
            const userId=decodedToken.user_id;
            const userRole=decodedToken.user_Role;
            req.auth={
                user_id:userId,
                user_Role:userRole
            };
            next();
        } catch (error) {
            res.status(401).json({error});
        }
    }