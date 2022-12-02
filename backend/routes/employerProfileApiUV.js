const express=require('express')
const router=express.Router()
const EmployeData=require('../models/employerProfileUV')




router.post('/employesignup',async(req,res)=>{
    try {
        let data={
    name:req.body.name,
    email:req.body.email,
    phone:req.body.phone,
    company:req.body.company,
    designation:req.body.designation,
    password:req.body.password
    }
    const employe = new EmployeData(data)
    const saveEmploye = await employe.save()
        res.send(saveEmploye)
    } catch (error) {
        console.log('post error:',error);
    }
})
router.get('/employelist',async(req,res)=>{
    try {
        let list=await EmployeData.find()
        res.send(list)
    } catch (error) {
       console.log(error) 
    }
})

router.get('/employers',async(req,res)=>{       // getdata for admin to collect unverified employer
    try {
        let list=await EmployeData.find({approval_status: "not approved"})
        res.send(list)
    } catch (error) {
       console.log(error) 
    }
})


router.get('/employesignup/:id',async(req,res)=>{
    try {
        let id=req.params.id
        const singleEmploye=await  EmployeData.findById(id)
        res.send(singleEmploye)
    } catch (error) {
        console.log(error)
    }
})

router.delete('/deleteemployer/:id', async(req,res)=>{    // admin deleting employer
    try {
        let id = req.params.id
        let data = await EmployeData.findByIdAndDelete(id)
        res.send(data)

    } catch (error) {
        console.log(error)
    }   
})


router.put('/verifyemp', async(req,res)=>{    // for admin to get employer to verify
    try {

        console.log(req.body)
        let id = req.body._id
        let update = { 
            name: req.body.name,
            email: req.body.email,
            phone:  req.body.phone,
            company: req.body.company,
            approval_status:  req.body.approval_status,
            password:  req.body.password,
            designation: req.body.designation
        }
        let updates = {$set: update}
        let verifiedEmp = await EmployeData.findByIdAndUpdate({"_id": id}, updates,{new:true})
        res.send(verifiedEmp)

} catch (error) {
    console.log('update error:',error);
}})

module.exports=router;
