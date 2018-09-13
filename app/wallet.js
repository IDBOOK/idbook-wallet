var Web3 = require('web3');
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

var version = web3.version.api;
console.log(version);

//
web3.eth.getBalance('wallet address', function(err,result) {
    if (err == null) {
        console.log('~balance:'+result);
    }else  {
        console.log('~error:'+err);
    }
});

web3.eth.getTransaction('tx hash code',function (err, result) {
    if (err == null) {
        console.log('transaction:'+result);
    } else {
        console.log('error:'+err);
    }
});

//npm install ethereumjs-tx --save
var Tx = require('ethereumjs-tx');
var privateKey = new Buffer('key', 'hex');
var rawTx = {
    nonce: nonce,
    gasPrice: '0x3b9aca00',
    gasLimit: '0x493e0',
    to: 'address',
    value: '',
    data: ''
};
var tx = new Tx(rawTx);
tx.sign(privateKey);

var serializedTx = tx.serialize();
web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function(err, hash) {
    console.log('result：'+hash);
    if (callback && typeof(callback) === "function") {
        if (!err)
            callback(null, hash);
        else
            callback(err, null);
    }
});