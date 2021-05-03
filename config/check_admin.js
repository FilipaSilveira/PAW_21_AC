Utilizadores=require("../models/utilizadores");
bcrypt=require("bcryptjs");
CheckAdmin=async () => {
    console.log('coneçao establecida com a bsase de dados!')
    const admin = await Utilizadores.findOne({ email: 'admin@admin.com.pt' }).select('+password')
    if (!admin) {
        console.log('creating admin user');   
        bcrypt.genSalt(10, async (err, salt) => {
            bcrypt.hash("admin", salt, async (err, hash) => { 
            const admin = await new Utilizadores({
              email: "admin@admin.com.pt",
              password: hash,
              tipo_utilizador:"admin"
          })
              .save()
              .catch(console.error) 
          if (admin) {
              console.log('Admin criado');
              admin.password="admin";
              console.table([admin.toJSON()])
          }
            })
        })
    } else {
        admin.password="admin";    
        console.log('Admin:')
        console.table([admin.toJSON()])
    }
  }

  module.exports=CheckAdmin;