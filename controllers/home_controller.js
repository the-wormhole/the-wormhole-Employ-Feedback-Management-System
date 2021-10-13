


module.exports.home = function(req,res){

    return res.render('employ_home');
}

module.exports.signUp = async function(req,res){
    
    return res.render('signUp');
    
    //return res.send('<h1> Hello</h1>');
}