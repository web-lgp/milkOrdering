import * as echarts from '../../ec-canvas/echarts';
let app=getApp()
let list=[]
let name=[]
let sans=[]
let time;
let options= {
  title:{
    text:"局部地区销售分析",
    left:"center",
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} \n{b} : {c} ({d}%)'
  },
  legend: {
    left: 'center',
    top: '10%',
    data: [
      '龙子湖区',
      '蚌山区',
      '禹会区',
      '淮上区',
      '怀远县',
      '五河县',
      '固镇县',
    ]
  },
  toolbox: {
    show: true
  },
  series: [
    {
      name: '地区销售',
      type: 'pie',
      radius: [20, 140],
      center: ['50%', '60%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 5
      },
      data: [
        { value: 30, name: '龙子湖区' },
        { value: 28, name: '蚌山区' },
        { value: 26, name: '禹会区' },
        { value: 24, name: '淮上区' },
        { value: 24, name: '怀远县' },
        { value: 24, name: '五河县' },
        { value: 24, name: '固镇县' }
      ]
    }
  ]
};
Page({
  data: {
    ec: {
      lazyLoad: true
    },
    list:[]
  },
  onShow(){
    sans=[]
    this.countsite("龙子湖区")
    this.countsite("蚌山区")
    this.countsite("禹会区")
    this.countsite("淮上区")
    this.countsite("怀远县")
    this.countsite("五河县")
    this.countsite("固镇县")
    time=setTimeout(()=>{
      sans.sort((a,b)=>{
        return b[0]-a[0]
      })
      this.setData({
        list:sans
      })
      this.echartsComponnet = this.selectComponent('#mychart1');
      this.initChart()
    },250)
    
  },
  initChart() {
    this.echartsComponnet.init((canvas, width, height) => {
      const Chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      canvas.setChart(Chart);
      var option = options
      Chart.setOption(option);
      return Chart;
    });
  },
  countsite(address){
    wx.request({
      url:`http://${app.data.http}/api/site/countSite/${address}`,
      success:res=>{
        sans.push([res.data.data.count,address])
        if(address=="龙子湖区"){
          options.series[0].data[0].value=res.data.data.count
        }else if(address=="蚌山区"){
          options.series[0].data[1].value=res.data.data.count
        }else if(address=="禹会区"){
          options.series[0].data[2].value=res.data.data.count
        }else if(address=="淮上区"){
          options.series[0].data[3].value=res.data.data.count
        }else if(address=="怀远县"){
          options.series[0].data[4].value=res.data.data.count
        }else if(address=="五河县"){
          options.series[0].data[5].value=res.data.data.count
        }else{
          options.series[0].data[6].value=res.data.data.count
        }
      }
    })
  },
  onUnload(){
    clearTimeout(time)
  }
});