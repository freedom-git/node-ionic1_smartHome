'use strict';
var QrCode=require('mongoose').model('qrCode');
exports.inquireQrCode=function(req,res,next){

    QrCode.findOne({qrCode:req.body.qrCode}, function (err, existQrCode) {
        if (err){
            return next(err);
        }else{
            if(existQrCode!==null){
                QrCode.findByIdAndUpdate(existQrCode._id,{times:existQrCode.times+1},function (err,result) {
                    if (err){
                        return next(err);
                    }else{
                        result.times+=1;
                        res.json(result);
                    }
                })

            }else{
                var qrCode=new QrCode(req.body);
                qrCode.times=1;
                qrCode.time=Date.now();
                qrCode.save(function (err) {
                    if (err){
                        return next(err);
                    }else{
                        res.json(qrCode);
                    }
                })
            }
        }
    });


};