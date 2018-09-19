!function() {
    var APP_ID = '2lk7UAoL7jU2fUIvvVTWNkzo-gzGzoHsz';
    var APP_KEY = 'Ctk1lW6RKiRqyfuhXYuMPky4';

    AV.init({
        appId: APP_ID,
        appKey: APP_KEY
    });


    let msgForm = document.querySelector('#postMsg')
    msgForm.addEventListener('submit',(e)=>{
        e.preventDefault()
        let content = msgForm.querySelector('input[name="content"]').value
        console.log(content);
        //创建 Message 表
        var Message = AV.Object.extend('Message');
        //在表中 插入一条数据
        var message = new Message();
        message.save({
            msg: content
        }).then(function(object) {
            alert('留言成功');
        })
    },false)

    //查询数据
    var query = new AV.Query('Message');
    // query.include('createdAt');
    // query.include('msg');
    // query.descending('createdAt');
    query.find().then(function (msgs) {
        // 查询到商品后，在前端展示到相应的位置中。
        let msg_ol = document.querySelector('#messages')
        msgs.map((e)=>{
            let li = document.createElement('li')
            li.textContent = e.attributes.msg
            msg_ol.appendChild(li)
        })
    }).catch(function(error) {
        alert(JSON.stringify(error));
    });
}.call()