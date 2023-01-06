const bcrypt=require('bcrypt');
const saltRound=10;

const hashGenerator = async(plainPassword)=>{
    try {
        const salt= await bcrypt.genSalt(saltRound);
        const hash= await bcrypt.hash(plainPassword,salt);
        return hash;
    } catch (error) {
        return error;
    }
 
}

const hashValidator = async(plainPassword,hashedPassword)=>{
        try {
             const validate=await bcrypt.compare(plainPassword,hashedPassword);
             return validate;
        } catch (error) {
            return false;
        }
}

module.exports.hashGenerator = hashGenerator;
module.exports.hashValidator = hashValidator;