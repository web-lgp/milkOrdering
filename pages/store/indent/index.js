import * as echarts from '../../ec-canvas/echarts';
import arr1 from "../yuefx/date"
import dateapi from "../yuefx/dateapi.js"
const app = getApp();
let qs=[]
let options={
  title:{
    text:"订单跟踪",
    left:"center"
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: '订单跟踪',
      type: 'pie',
      radius: ['40%', '60%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '40',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 30, name: '待付款' },
        { value: 28, name: '待收货' },
        { value: 26, name: '待评价' },
        { value: 24, name: '已完成' }
      ]
    }
  ]
}
let options2 = {
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    top:"17%",
    data: ['待付款', '待收货', '待评价', '已完成']
  },
  grid: {
    top:"35%",
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '待付款',
      type: 'line',
      stack: 'Total',
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: '待收货',
      type: 'line',
      stack: 'Total',
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: '待评价',
      type: 'line',
      stack: 'Total',
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: '已完成',
      type: 'line',
      stack: 'Total',
      data: [320, 332, 301, 334, 390, 330, 320]
    }
  ]
};
Page({
  data: {
    ec: {
      lazyLoad: true
    },
    option: [
      { text: '默认全部分析', value: 0 },
      { text: '最近七天分析', value: 1 }
    ],
    value:0,
    list:[]
  },
  onLoad(options) {
   this.countIndentState(1)
   this.countIndentState(2)
   this.countIndentState(3)
   this.countIndentState(4)
   this.echartsComponnet = this.selectComponent('#mychart1');
   this.initChart()
   setTimeout(()=>{
     this.setData({
       list:qs
     })
     console.log(list,this.data.qs);
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
  initChart2() {
    this.echartsComponnet.init((canvas, width, height) => {
      const Chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      canvas.setChart(Chart);
      var option = options2
      Chart.setOption(option);
      return Chart;
    });
  },
  onChange(e){
    this.setData({value:e.detail})
    if(e.detail==0){
      this.onLoad()
    }
    if(e.detail==1){
      let date=new Date()
      let arrs=arr1(date.getMonth()+1,date.getDate())
      let arr2=dateapi(date.getFullYear(),date.getMonth()+1,date.getDate())
      options2.xAxis.data=arrs
      this.getindent(arr2)
      setTimeout(()=>{
        this.echartsComponnet = this.selectComponent('#mychart2');
        this.initChart2()
      },500)
    }
  },
  countIndentState(index){
    wx.request({
      url:`http://${app.data.http}/api/indent/countByIndentstate/${index}`,
      success:res=>{
        if(index==1){
          qs.push([res.data.data.count,"待付款"])
          options.series[0].data[0].value=res.data.data.count
        }
        else if(index==2){
          qs.push([res.data.data.count,"待收货"])
          options.series[0].data[1].value=res.data.data.count
        }
        else if(index==3){
          qs.push([res.data.data.count,"待评价"])
          options.series[0].data[2].value=res.data.data.count
        }
        else{
          qs.push([res.data.data.count,"已完成"])
          options.series[0].data[3].value=res.data.data.count
        }
      }
    })
  },
  getindent(arr2){
    wx.request({
      url: `http://${app.data.http}/api/indent/countindentstateAndlikedate2`,
      method:"POST",
      data:arr2.toString(),
      success:(res)=>{
        options2.series[0].data=res.data.data.count[0]
        options2.series[1].data=res.data.data.count[1]
        options2.series[2].data=res.data.data.count[2]
        options2.series[3].data=res.data.data.count[3]
        options2.series[4].data=res.data.data.count[4]
        options2.series[5].data=res.data.data.count[5]
        options2.series[6].data=res.data.data.count[6]
      }
    })  
  }
})