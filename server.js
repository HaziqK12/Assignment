const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;

app.use(bodyParser());
app.use(cors() );
app.listen(3000, function() {
    console.log('listening on port:3000')
  })
  
const establish_connection = async () => {
      try {
          const conn = await mongoose.connect("mongodb+srv://m220student:m220password@benr2822.kgxfj.mongodb.net/Fine_System", {
              useNewUrlParser: true,
              useUnifiedTopology: true,
              useFindAndModify: false
          });
          console.log(`Mongo DB Connected`);
      } catch(err) {
          console.log(err);
          process.exit(1);
      }
  }

establish_connection();


const Student = mongoose.model('Students', {
    _id: {
        type: String,
        required:true
    },
    first_name: {
        type: String,
        required:true
    },
    last_name: {
        type:String,
        required:true
    },
    phone_number: {
        type:String,
        required:true
    },
    email_address: {
        type:String,
        required:true
    },
    course_id: {
        type:String,
        required:true
    },
    year_level: {
        type:String,
        required:true
    },
    faculty: {
        type:String,
        required:true
    },
});

// Get All Students
app.get('/students/all', (req, res) => {
    Student.find({}, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    });
});


// Get a Student
app.get('/students/:id', (req, res) => {
    Student.findById(req.params.id, (err, data) => {
        if(!err) {
            if (!data) {
                res.json({message: 'Matric Number Entered Does Not Exist In Student Collection'});
            }
            
            else {
                res.send(data);
            }
            
        } 
        else {
           console.log(err);
        }
    });
});

//Post a Student Profile
app.post('/students/add', (req, res) => {
    const emp = new Student({
        
        _id: req.body._id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone_number: req.body.phone_number,
        email_address: req.body.email_address,
        course_id: req.body.course_id,
        year_level: req.body.year_level,
        faculty: req.body.faculty,

    });
    emp.save((err, data) => {
        if(!err) {
            
            res.json( { message: 'Student Profile Has Been Successfully Added' } );

        } else {
           console.log(err);
        }
    });
});


// Update Student Profile
app.put('/students/update/:id', (req, res) => {

    
    const emp = {

        _id: req.body._id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone_number: req.body.phone_number,
        email_address: req.body.email_address,
        course_id: req.body.course_id,
        year_level: req.body.year_level,
        faculty: req.body.faculty,
        
    };
    Student.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, data) => {
        if(!err) {
            res.status(200).json({code: 200, message: 'Details of Student Profile has been Successfully Updated'})
        } else {
            console.log(err);
        }
    });
});

// Delete Student Profile
app.delete('/students/delete/:id', (req, res) => {

    Student.findByIdAndRemove(req.params.id, (err, data) => {
        if(!err) {
            res.status(200).json({code: 200, message: 'Student Profile has been deleted' })
        } else {
            console.log(err);
        }
    });
});














const fine = mongoose.model('Fine', {

    _id: {
        type: String,
        required:true
    },
    id_officer_on_duty: {
        type: String,
        required:true
    },
    total_summon: {
        type: String,
        required:true
    },
    vehicle_no: {
        type:String,
        required:true
    },
    issued_area: {
        type: String,
        required:true
    },
    summons_no: {
        type: String,
        required:true
    },
    offense_date_time : {
        type: String,
        required:true
    },
    offense_detail : {
        type: String,
        required:true
    },
    summons_amount_RM : {
        type: String,
        required:true
    },
    final_amount_RM : {
        type: String,
        required:true
    },
});

//GET ALL FINES
app.get('/fine/all', (req, res) => {
    fine.find({}, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    });
});


//GET A FINE BY
app.get('/fine/:id', (req, res) => {
    fine.findById(req.params.id, (err, data) => {
        if(!err) {
            if (!data) {
                res.json({message: 'No outstanding fine for the matric number entered'})
            }
            
            else {
                res.send(data);
            }
            
        } 
        else {
           console.log(err);
        }
    });
});

//Post a Student
app.post('/fine/add', (req, res) => {
    const emp = new fine({
        
        _id: req.body._id,
        id_officer_on_duty: req.body.id_officer_on_duty,
        total_summon: req.body.total_summon,
        vehicle_no: req.body.vehicle_no,
        issued_area: req.body.issued_area,
        summons_no: req.body.summons_no,
        offense_date_time: req.body.offense_date_time,
        offense_detail: req.body.offense_detail,
        summons_amount_RM: req.body.summons_amount_RM,
        final_amount_RM: req.body.final_amount_RM,  
    });
    emp.save((err, data) => {
        if(!err) {
            // res.send(data);
            res.status(200).json({code: 200, message: 'Fine has been successfully added'})
        } else {
           console.log(err);
        }
    });
});

// Update Student

app.put('/fine/update/:id', (req, res) => {

    
    const emp = {
        _id: req.body._id,
        id_officer_on_duty: req.body.id_officer_on_duty,
        total_summon: req.body.total_summon,
        vehicle_no: req.body.vehicle_no,
        issued_area: req.body.issued_area,
        summons_no: req.body.summons_no,
        offense_date_time: req.body.offense_date_time,
        offense_detail: req.body.offense_detail,
        summons_amount_RM: req.body.summons_amount_RM,
        final_amount_RM: req.body.final_amount_RM,  
    };
    fine.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, data) => {
        if(!err) {
            res.status(200).json({code: 200, message: 'fine has been successfully updated'})
        } else {
            console.log(err);
        }
    });
});

// Delete Student
app.delete('/fine/delete/:id', (req, res) => {

    fine.findByIdAndRemove(req.params.id, (err, data) => {
        if(!err) {
            res.status(200).json({code: 200, message: 'Fine has been deleted' })
        } else {
            console.log(err);
        }
    });
});








const officer = mongoose.model('officer_on_duty', {

    _id: {
        type: String,
        required:true
    },
    name: {
        type: String,
        required:true
    },
    phone_number: {
        type:String,
        required:true
    },
    department: {
        type:String,
        required:true
    },
});


app.get('/officer/all', (req, res) => {
    officer.find({}, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    });
});


// Get Single Student
app.get('/officer/:id', (req, res) => {
    officer.findById(req.params.id, (err, data) => {
        if(!err) {
            if (!data) {
                res.json({message: 'Officer ID entered is not found in collection'})
            }
            
            else {
                res.send(data);
            }
            
        } 
        else {
           console.log(err);
        }
    });
});

app.post('/officer/add', (req, res) => {
    const emp = new officer({
        
        _id: req.body._id,
        name: req.body.name,
        phone_number: req.body.phone_number,
        department: req.body.department,

    });
    emp.save((err, data) => {
        if(!err) {
           
            res.status(200).json({code: 200, message: 'Officer Profile has been successfully added'})
        } else {
           console.log(err);
        }
    });
});

// Update Student

app.put('/officer/update/:id', (req, res) => {

    
    const emp = {
        _id: req.body._id,
        name: req.body.name,
        phone_number: req.body.phone_number,
        department: req.body.department,
    };
    officer.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, data) => {
        if(!err) {
            res.status(200).json({code: 200, message: 'Officer Profile has been successfully updated'})
        } else {
            console.log(err);
        }
    });
});

// Delete Student
app.delete('/officer/delete/:id', (req, res) => {

    officer.findByIdAndRemove(req.params.id, (err, data) => {
        if(!err) {
            res.status(200).json({code: 200, message: 'Officer Profile has been successfully deleted' })
        } else {
            console.log(err);
        }
    });
});

