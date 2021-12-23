import JWT from 'jsonwebtoken';


const authenticateUser = async (req, res, next) => {
    const authToken = await req.headers['authorization']
    if(!authToken) return res.status(401).json({success: false})


}


export default authenticateUser;