// 阻止默认动作 消除画画屏幕滚动 手机端下载按钮无效  CSS 相对屏幕固定解决
// document.addEventListener('touchmove', function (e) {
//   e.preventDefault()
// })

const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let lineWidth = 5
ctx.lineCap = "round";

autoSetCanvasSize(canvas)
touchAndMousePainting(canvas)

let eraserEnabled = false
pen.onclick = function(){
  eraserEnabled = false
  pen.classList.add('active')
  eraser.classList.remove('active')
  clear.classList.remove('active')
}
eraser.onclick = function(){
  eraserEnabled = true
  eraser.classList.add('active')
  pen.classList.remove('active')
  clear.classList.remove('active')
}
clear.onclick = function(){
  ctx.clearRect(0, 0,  canvas.width, canvas.height)
  clear.classList.add('active')
  pen.classList.remove('active')
  eraser.classList.remove('active')
  setTimeout(() => {
    clear.classList.remove('active')
  },1000)
}
download.onclick = function(){
  const url = canvas.toDataURL("image/png")
  const a = document.createElement('a')
  document.body.appendChild(a)
  a.href = url
  a.download = "我的画"
  a.target = '_blank'
  a.click()
}

black.onclick = function(){
  ctx.fillStyle = "black";
  ctx.strokeStyle = 'black';
  black.classList.add('active')
  red.classList.remove('active')
  green.classList.remove('active')
  blue.classList.remove('active')
}
red.onclick = function(){
  ctx.fillStyle = "red";
  ctx.strokeStyle = 'red';
  red.classList.add('active')
  black.classList.remove('active')
  green.classList.remove('active')
  blue.classList.remove('active')
}
green.onclick = function(){
  ctx.fillStyle = "green";
  ctx.strokeStyle = 'green';
  green.classList.add('active')
  black.classList.remove('active')
  red.classList.remove('active')
  blue.classList.remove('active')
}
blue.onclick = function(){
  ctx.fillStyle = "blue";
  ctx.strokeStyle = 'blue';
  blue.classList.add('active')
  black.classList.remove('active')
  red.classList.remove('active')
  green.classList.remove('active')
}

thin.onclick = function(){
  lineWidth = 5
}
thick.onclick = function(){
  lineWidth = 10
}

// 自动设置 canvas 宽高
function autoSetCanvasSize(canvas){
  setCanvasSize()
  window.onresize = function(){
    setCanvasSize()
  }
  // 设置 canvas 宽高
  function setCanvasSize(){
    canvas.width = document.documentElement.clientWidth
    canvas.height = document.documentElement.clientHeight
  }
}
// 鼠标或触屏绘画
function touchAndMousePainting(canvas){
  let using = false //默认没有作画状态
  let last

  const isTouchDevice = 'ontouchstart' in document.documentElement; //是否是触摸设备(true)
  if(isTouchDevice){
    canvas.ontouchstart = (e) => {
      let x = e.touches[0].clientX
      let y = e.touches[0].clientY
      using = true
      if(eraserEnabled){
        ctx.clearRect(e.touches[0].clientX, e.touches[0].clientY,8,8)
      } else{
        last = [x, y] //记录下第一个坐标
      }
    }
    canvas.ontouchmove = (e) => { //如果触摸了，开始作画
      let x = e.touches[0].clientX
      let y = e.touches[0].clientY
      if(!using){return}
      if(eraserEnabled){
        ctx.clearRect(e.touches[0].clientX - 4, e.touches[0].clientY,8,8)
      } else {
        drawLine(last[0], last[1], x, y) // 画线
        last = [x, y] //移动后实时更新坐标
      }
    }
    canvas.ontouchend = () => {
      using = false
    }
  }else{
    canvas.onmousedown = (e) => {
      using = true //鼠标点击开始使用画笔或橡皮差
      if(eraserEnabled){
        ctx.clearRect(e.clientX - 4, e.clientY - 4,8,8)
      }else{
        last = [e.clientX, e.clientY]
      }
    }

    canvas.onmousemove = (e) => {
      if(!using){return}
      if(eraserEnabled){
          ctx.clearRect(e.clientX - 4, e.clientY -4,8,8)
      }else{
          drawLine(last[0], last[1], e.clientX, e.clientY)
          last = [e.clientX, e.clientY]
      }
    }

    canvas.onmouseup = () => {
      using = false
    }
  }
  // 画圆
  function drawLine(x1, y1, x2, y2){
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineWidth = lineWidth
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
}
