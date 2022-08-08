document.addEventListener('touchmove', function (e) {
  e.preventDefault()
})
const canvas = document.getElementById("canvas");

autoSetCanvasSize(canvas)
touchAndMousePainting(canvas)



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
  let ctx = canvas.getContext("2d");
  ctx.fillStyle = "black";
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 8;
  ctx.lineCap = "round";

  let painting = false //默认没有作画状态
  let last

  const isTouchDevice = 'ontouchstart' in document.documentElement; //是否是触摸设备(true)
  if(isTouchDevice){
    canvas.ontouchstart = (e) => {
      let x = e.touches[0].clientX //获取数组touches第一个clientX坐标（横坐标）
      let y = e.touches[0].clientY //获取数组touches第一个clientY坐标（纵坐标）
      last = [x, y] //记录下第一个坐标
    }
    canvas.ontouchmove = (e) => { //如果触摸了，开始作画
      let x = e.touches[0].clientX //获取数组touches第一个clientX坐标（横坐标）
      let y = e.touches[0].clientY //获取数组touches第一个clientY坐标（纵坐标）
      drawLine(last[0], last[1], x, y) // 画线
      last = [x, y] //移动后实时更新坐标
    }
    //画圆
  }else{
    canvas.onmousedown = (e) => {
      painting = true //鼠标点击开始作画状态
      last = [e.clientX, e.clientY]
    }

    canvas.onmousemove = (e) => {//鼠标移动了开始作画
      if (painting === true) {
        drawLine(last[0], last[1], e.clientX, e.clientY)
        last = [e.clientX, e.clientY]
      }
    }

    canvas.onmouseup = () => {
      painting = false
    }
  }
  // 画圆
  function drawLine(x1, y1, x2, y2){
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
}
