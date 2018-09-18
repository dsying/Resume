//立即执行函数创建一个局部作用域 避免变量挂载到 全局
!function() {
    //此时 window.specialTags 为 undefined
    var specialTags = document.querySelectorAll('[data-x]');
    for(let i = 0, len = specialTags.length; i < len; i++) {
        specialTags[i].classList.add('offset')
    }

// 滚动条 事件监听
    window.onscroll = function(x) {
        console.log('scrollY', window.scrollY)
        // console.log('pageYOffset',window.pageYOffset);
        // console.log('documentElement.scrollTop',document.documentElement.scrollTop);
        // console.log('document.body.scrollTop',document.body.scrollTop);

        window.scrollY > 0 ? tabNavBar.classList.add('sticky') : tabNavBar.classList.remove('sticky');

        let special = document.querySelectorAll('[data-x]');
        //console.log(special);
        let minIndex = 0;
        for(let i = 1, len = special.length; i < len; i++) {
            if(Math.abs(special[i].offsetTop - window.scrollY) < Math.abs(special[minIndex].offsetTop - window.scrollY)) {
                minIndex = i
            }

        }
        specialTags[minIndex].classList.remove('offset')
        //console.log(minIndex)
        let minEle = special[minIndex];
        //console.log(minEle)
        let minEle_id = minEle.getAttribute('id');
        //console.log(minEle_id)
        let aTags = document.querySelectorAll('nav>ul>li>a');
        aTags.forEach(function(e, i, arr) {
            e.parentNode.classList.remove('highlight');
            if(e.getAttribute('href') === ('#' + minEle_id)) {
                e.parentNode.classList.add('highlight')
            }
        })

    }
}.call()



/*
    ES6之前 只有全局作用域和函数作用域
        要想创建一个独立的作用域 只能使用  立即执行函数 iffe
            如何生成？ 1）创建一个匿名函数 2） 立即执行它
    ES6之后 引入了块级作用域的概念
    {
        let不会造成变量提升
        block scope外不能访问 内部的变量
    }
 */

/*
       ** 使用匿名函数来隔离作用域

    1 我们不想要全局变量
    2 我们要使用局部变量
    3 ES 5 里只有函数有局部变量
    4 于是我们声明了一个 function xxx(){...} ,然后xxx.call()
    5 这时候 xxx 是一个全局变量(全局函数)
    6 所以我们不能给这个函数起名字
    7 于是 function(){...}.call()
    8 但是 Chrome 报错， 语法错误
    9 我们又试出来一种新方法可以不报错： !function(){}.call()

    我们不在乎这个匿名函数的返回值 所以加个 ！ 取反 没问题
 */
