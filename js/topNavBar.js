!function() {
//顶部导航菜单监听
    let liTags = document.querySelectorAll('nav>ul>li')
    for(let i = 0, len = liTags.length; i < len; i++) {
        let liTag = liTags[i];
        liTag.onmouseenter = function(x) {
            x.currentTarget.classList.add('active');
        }
        liTag.onmouseleave = function(x) {
            x.currentTarget.classList.remove('active');
        }
    }

    let aTags = document.querySelectorAll('nav>ul>li>a')
// 导航栏a标签点击时对应html 在距离页面顶部指定位置处显示(注意不是浏览器顶部)
    aTags.forEach(function(e) {
        e.onclick = function(x) {
            x.preventDefault();//阻止a标签的默认行为
            let a = x.currentTarget;
            let id = a.getAttribute('href');
            let ele = document.querySelector(id);

            let times = 25;            //执行25次
            let duration = 500 / times;//周期

            let top = ele.offsetTop;     //距离网页顶部距离(注意不是距离视口顶部)
            console.log('offsetTop:' + top)

            let currentTop = window.scrollY;//滚动条在垂直方向上滚动的像素
            console.log('scrollY:' + currentTop)

            let targetTop = top - 80;//目标距离  距离浏览器顶部80px处
            console.log('targetTop:' + targetTop)

            //使用tween.js
            function animate (time) {
                requestAnimationFrame(animate);
                TWEEN.update(time);
            }

            requestAnimationFrame(animate);

            var coords = {y: currentTop};
            var tween = new TWEEN.Tween(coords) // 初始位置
                .to({y: targetTop}, 1000) // 目标位置 以及用时
                .easing(TWEEN.Easing.Quadratic.InOut) // 使用一个(淡入淡出)缓动函数让动画变得平滑
                .onUpdate(function() { // 回调函数
                    window.scrollTo(0, coords.y)
                })
                .start(); //立刻开始缓动

        }
    })
}.call()