var express = require('express');
var router = express.Router();
// getting-started.js
const mongoose = require('mongoose');
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb+srv://admin:<password>@cluster0.qnzpe5i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0\n');
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const UserSchema = new mongoose.Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    phone: {type: String},
    address: {type: String}
});
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/getListUser', function (req, res, next)
{

    const User = mongoose.model('User', UserSchema);
    // Lấy toàn bộ
    User.find({}, function(err, users) {
        // users chứa mảng các đối tượng User
        res.send(users)
    });

});

router.get('/getUserByID', function (req, res, next)
{
    const id = req.query.id;
    const User = mongoose.model('User', UserSchema);
    // Lấy toàn bộ
    User.find({id : id}, function(err, user) {
        // đối tượng User
        res.send(user);
    });

});

router.post('/createUser', function (req, res, next)
{
    // lấy các tham số từ POST gửi lên
    const id = req.body.id;
    const name = req.body.name;
    const phone = req.body.phone;
    const address = req.body.address;
    const User = mongoose.model('User', UserSchema);
    User.create({ id: id, name : name , phone : phone, address : address })
        .then(user => {
            // lưu user thành công
            res.send({ errorCode : 200, message : "Them Thanh Cong!!!"})
        })
        .catch(err => {
            // có lỗi xảy ra
            res.send({ errorCode : 200, message : "Them KHONG Thanh Cong!!!"})
        });

});

router.post('/createUser', function (req, res, next)
{
    // lấy các tham số từ POST gửi lên
    const id = req.body.id;
    const name = req.body.name;
    const phone = req.body.phone;
    const address = req.body.address;
    const User = mongoose.model('User', UserSchema);

    User.findOneAndUpdate({id: id}, {
        name: name, phone: phone , address : address
    }, function(err, user) {
        if(!err) {
            res.send({ errorCode : 200, message : "UPDATE Thanh Cong!!!"})
        }else {
            res.send({ errorCode : 200, message : "UPDATE KHONG Thanh Cong!!!"})
        }
    });
});


router.get('/deleteUserByID', function (req, res, next)
{
    const id = req.query.id;
    const User = mongoose.model('User', UserSchema);
    // Xóa user có id là userId
    User.deleteOne({id : id }, function(err) {
        if(!err) {
            res.send({ errorCode : 200, message : "Xoa Thanh Cong!!!"})
        }else {
            res.send({ errorCode : 200, message : "Xoa KHONG Thanh Cong!!!"})
        }
    });

});


router.post('/findUserByName', function (req, res, next)
{
    // lấy các tham số từ POST gửi lên
    const name = req.body.name;
    const User = mongoose.model('User', UserSchema);
    // Tìm user với tên có chứa name gần giống
    User.find({
        name: {
            $regex: name,
            $options: 'i' // không phân biệt chữ hoa thường
        }
    }, function(err, users) {
        res.send(users)
    })
});





module.exports = router;
