!function() {

    var view = document.querySelector('section.messages')

    let model = {
        //初始化数据
        init: function(){
            var APP_ID = '2lk7UAoL7jU2fUIvvVTWNkzo-gzGzoHsz';
            var APP_KEY = 'Ctk1lW6RKiRqyfuhXYuMPky4';
            AV.init({appId: APP_ID,appKey: APP_KEY});
        },
        //获取
        fetch: function(){
            var query = new AV.Query('Message');
            return query.find() //Promise 对象 保存着异步操作的结果
        },
        //保存
        save: function(content){
            //创建 Message 表
            var Message = AV.Object.extend('Message');
            //在表中 插入一条数据
            var message = new Message();
            return message.save({ // Promise 对象
                    msg: content
                })
        }
    }

    let controller = {
        view: null,
        messageList: null,
        model:null,
        init: function(view,model){
            this.view = view
            this.messageList = view.querySelector('#messages')
            this.form = view.querySelector('#postMsg')
            this.model = model
            this.model.init()
            this.loadMessages()
            this.bindEvents()
        },
        initAV: function(){
            var APP_ID = '2lk7UAoL7jU2fUIvvVTWNkzo-gzGzoHsz';
            var APP_KEY = 'Ctk1lW6RKiRqyfuhXYuMPky4';

            AV.init({
                appId: APP_ID,
                appKey: APP_KEY
            });
        },
        loadMessages: function(){
            //查询数据
            this.model.fetch()
            .then((msgs)=>{
                // 查询到商品后，在前端展示到相应的位置中。
                msgs.map((e)=>{
                    let li = document.createElement('li')
                    li.textContent = e.attributes.msg
                    console.log(this.messageList)
                    this.messageList.appendChild(li)
                })
            })
            .catch((err) => {
                alert(JSON.stringify(err));
            });
        },
        saveMessage: function(){
            let content = this.form.querySelector('input[name="content"]').value
            //创建 Message 表
            this.model.save(content)
            .then((res) => {
                this.form.querySelector('input[name="content"]').value = ''
            })
        },
        bindEvents: function(){
            this.form.addEventListener('submit',(e)=>{
                e.preventDefault()
                this.saveMessage()
            })
        }
    }

    controller.init(view,model)


}.call()