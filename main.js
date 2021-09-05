const button = document.getElementById("button");
let branch = 0;

function double(){
  let one = document.getElementById("one");
  one.disabled = true;
  max.disabled = false;
  min.disabled = false;
  return branch = 0;
};
function katagawa(){
  let max = document.getElementById("max");
  let min = document.getElementById("min");
  one.disabled = false;
  max.disabled = true;
  min.disabled = true;
  return branch = 1;
};
button.addEventListener('click',()=>{

  //少数計算用変数
  const addition = 1000000;

  //-----データの取得-----
  //係数の取得
  let coefficient = document.getElementById("coefficient").value;
  let A2 = 0;
  let D4 = 0;
  let d2 = 0;
  switch(coefficient){
    case'0':
      alert("係数が選択されていません");
    case'2':
      A2 = 1.88;
      D4 = 3.267;
      d2 = 1.128;
      break;
    case'3':
      A2 = 1.023;
      D4 = 2.574;
      d2 = 1.693;
      break;
    case'4':
      A2 = 0.729;
      D4 = 2.282;
      d2 = 2.059;
      break;
    case'5':
      A2 = 0.577;
      D4 = 2.114;
      d2 = 2.326;
      break;
  }
  //日数の取得
  let days = document.getElementById("days").value;
  if(days == ""){
    document.getElementById("days").classList.add("red_border");
  }else{
    document.getElementById("days").classList.remove("red_border");
  }
  //規格上限の取得
  let max = document.getElementById("max").value;
  if(branch == 0 && max == ""){
    document.getElementById("max").classList.add("red_border");
  }else{
    document.getElementById("max").classList.remove("red_border");
  }
  //規格下限の取得
  let min = document.getElementById("min").value;
  if(branch == 0 && min == ""){
    document.getElementById("min").classList.add("red_border");
  }else{
    document.getElementById("min").classList.remove("red_border");
  }
  //片側規格の取得
  let one = document.getElementById("one").value;
  if(branch == 1 && one == ""){
    document.getElementById("one").classList.add("red_border");
  }else{
    document.getElementById("one").classList.remove("red_border");
  }
  //Σ Xbarの取得
  let xbar = document.getElementById("xbar").value;
  if(xbar == ""){
    document.getElementById("xbar").classList.add("red_border");
  }else{
    document.getElementById("xbar").classList.remove("red_border");
  }
  //Σ Rbarの取得
  let rbar = document.getElementById("rbar").value;
  if(rbar == ""){
    document.getElementById("rbar").classList.add("red_border");
  }else{
    document.getElementById("rbar").classList.remove("red_border");
  }

  //片側規格の判定
  let element = document.getElementsByName("accessible-radio");
  let len = element.length;
  for (let i = 0; i < len; i++){
    if(element.item(i).checked){
      var osFrag = element.item(i).value;
    }
  }
  let cpk_switch = osFrag;

  //数値型への変換
  days = Number(days);
  max = Number(max);
  min = Number(min);
  one = Number(one);
  xbar = Number(xbar);
  rbar = Number(rbar);

  //-----規格の小数点以下の桁数を取得------
  let maxPoint = max.toString().split('.');
  let minPoint = min.toString().split('.');
  let onePoint = one.toString().split('.');
  let maxP = 0;
  let minP = 0;
  let oneP = 0;
  let array = 0;
  let nod = 0;
  let nod1 = 0;
  let nod2 = 0;

  if(branch == 1){
    dvo()
    }else{
     dvw()
    }
    //小数点以下の桁数の確認
    function dvo(){
      if(onePoint.length == 1){
        onePoint[1] = 0;
        nod_Calculation2();
      }else{
        oneP = onePoint[1].length;
      }
      nod = oneP;
      nod_Calculation();
    }
    function dvw(){
      if(maxPoint.length == 1){
        maxPoint[1] = 0;
        nod_Calculation2();
      }else{
        maxP = maxPoint[1].length;
      }
      if(minPoint.length == 1){
        minPoint[1] = 0;
        nod_Calculation2();
      }else{
        minP = minPoint[1].length;
      }
      //小数点以下の桁数の取得
      if(maxP >= minP){
         array = maxP;
       }else{
         array = minP;
       }
       nod = array;
       nod_Calculation();
    }
    function nod_Calculation(){
      nod2 = nod + 2;
      nod1 = nod + 1;
    }
    function nod_Calculation2(){
      nod2 = 2;
      nod1 = 1;
    }

  //-----実際の計算-----
  //X平均
  let xwbar_item = xbar / days;
  xwbar = xwbar_item.toFixed(nod2);
  //R平均
  let rAve_item = rbar / days;
  rAve = rAve_item.toFixed(nod1);
  //R
  let R_item = rAve * D4;
  R = R_item.toFixed(nod1);
  //UCL LCLの共通
  let A2Rber = A2 * rAve;
  //X(UCL)
  let xUcl = ((xwbar * addition) + (A2Rber * addition)) / addition;
  //X(LCL)
  let xLul = ((xwbar * addition) - (A2Rber * addition)) / addition;
  //s
  let s_item = rAve / d2;
  s = s_item.toFixed(nod2);
  //Cpk
  let standerd_item = ((max * addition) - (min * addition)) / addition;
  let standard = standerd_item / 2;
  switch(cpk_switch){
    case"0":
    if (xwbar <= ((standard * addition) + (min * addition)) / addition){
      lowerLimit()
    }else{
      upperLimit()
    }
    break;
    case"1":
    upperLimit2()
    break;
    case"2":
    lowerLimit2()
    break;
  }

  function lowerLimit(){
    var Tl = ((xwbar * addition) - (min * addition)) / addition;
    var molecule = 3 * s;
    var Cpk = Tl / molecule;
    cpkOutput(Cpk);
  };
  function lowerLimit2(){
    var Tl = ((one * addition) - (xwbar * addition)) / addition;
    var molecule = 3 * s;
    var Cpk = Tl / molecule;
    cpkOutput(Cpk);
  };
  function upperLimit(){
    var Tu = ((max * addition) - (xwbar * addition)) / addition;
    var molecule = 3 * s;
    var Cpk = Tu / molecule;
    cpkOutput(Cpk);
  };
  function upperLimit2(){
    var Tu = ((xwbar * addition) - (one * addition)) / addition;
    var molecule = 3 * s;
    var Cpk = Tu / molecule;
    cpkOutput(Cpk);
  };

  //-----計算結果の表示-----
  //Cpkの表示
  function cpkOutput(Cpk){
    document.getElementById("outputCpk").innerHTML = Cpk.toFixed(2);
  };
  //X(UCL)
  document.getElementById("outputxUcl").innerHTML = xUcl.toFixed(nod1);
  //X(LCL)
  document.getElementById("outputxLul").innerHTML = xLul.toFixed(nod1);
  //R
  document.getElementById("outputR").innerHTML = R;
  //s
  document.getElementById("outputS").innerHTML = s;
  //平均X
  document.getElementById("outputXwber").innerHTML = xwbar;
  //平均R
  document.getElementById("outputRber").innerHTML = rAve;

});
