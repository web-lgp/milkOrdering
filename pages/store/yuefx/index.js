import * as echarts from '../../ec-canvas/echarts';
import arr1 from "./date.js"
import dateapi from "./dateapi.js"
const app = getApp();
let options = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} \n{b} : {c} ({d}%)',
  },
  legend: {
    bottom: -25,
    left: 'center',
    padding: 50,
    data: ['天天送', '单号送', '双号送', '三日送', '周六送',"周末送"]
  },
  series: [
    {
      type: 'pie',
      radius: '65%',
      center: ['50%', '50%'],
      selectedMode: 'single',
      name:"配送分析",
      data: [
        {value: 0,name: '天天送',},
        { value: 0, name: '单号送' },
        { value: 0, name: '双号送' },
        { value: 0, name: '三日送' },
        { value: 0, name: '周六送' },
        { value: 0, name: '周末送' },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};
let options2 = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} \n{b} : {c} ({d}%)',
  },
  legend: {
    bottom: -40,
    left: 'center',
    padding: 50,
    data: ['天天送', '单号送', '双号送', '三日送', '周六送',"周末送"]
  },
  series: [
    {
      type: 'pie',
      radius: '65%',
      center: ['50%', '50%'],
      selectedMode: 'single',
      name:"配送分析",
      data: [
        {value: 0,name: '天天送',},
        { value: 0, name: '单号送' },
        { value: 0, name: '双号送' },
        { value: 0, name: '三日送' },
        { value: 0, name: '周六送' },
        { value: 0, name: '周末送' },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};
let options3= {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  grid: {
    top:"25%",
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: '天天送',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: '单号送',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: '双号送',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: '三日送',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: '周六送',
      type: 'line',
      stack: 'Total',
      label: {
        show: true,
        position: 'top'
      },
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    },
    {
      name: '周末送',
      type: 'line',
      stack: 'Total',
      label: {
        show: true,
        position: 'top'
      },
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  ]
};
let text=[]
Page({
  data: {
    ec: {
      lazyLoad: true
    },
    show: false,
    currentDate: new Date().getTime(),
    minDate: new Date().getFullYear(),
    option: [
      { text: '默认全部分析', value: 0 },
      { text: '选择年月分析', value: 1 },
      { text: '最近七天分析', value: 2 }
    ],
    value: 0,
    arr:[],
    time:""
  },
  onLoad(options) {
    text=[]
    this.countDelivery(0)
    this.countDelivery(1)
    this.countDelivery(2)
    this.countDelivery(3)
    this.countDelivery(4)
    this.countDelivery(5)
    this.echartsComponnet = this.selectComponent('#mychart1');
    this.initChart()
    setTimeout(()=>{
      text.sort((a,b)=>{
        return b[1]-a[1]
      })
      this.setData({
        arr:text
      })
    },300)
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
  initChart3() {
    this.echartsComponnet.init((canvas, width, height) => {
      const Chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      canvas.setChart(Chart);
      var option = options3
      Chart.setOption(option);
      return Chart;
    });
  },
  countDelivery(index){
      wx.request({
        url:`http://${app.data.http}/api/indent/selectAllByDelivery/${index}`,
        success:res=>{
          if(index==0){
            text.push(["天天送",res.data.data.count])
          }
          if(index==1){
            text.push(["单号送",res.data.data.count])
          }
          if(index==2){
            text.push(["双号送",res.data.data.count])
          }
          if(index==3){
            text.push(["三日送",res.data.data.count])
          }
          if(index==4){
            text.push(["周六送",res.data.data.count])
          }
          if(index==5){
            text.push(["周末送",res.data.data.count])
          }
          options.series[0].data[index].value=res.data.data.count
        }
    })
  },
  showPopup() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false,value:0});
    this.onLoad()
  },
  onChange(e){
    this.setData({value:e.detail})
    if(e.detail==0){ 
      this.onLoad()
    }
    if(e.detail==1){
      this.setData({show:true})
    }
    if(e.detail==2){
      let date=new Date()
      let arrs=arr1(date.getMonth()+1,date.getDate())
      let arr2=dateapi(date.getFullYear(),date.getMonth()+1,date.getDate())
      options3.xAxis[0].data=arrs
      this.getzhixian(arr2)
      setTimeout(()=>{
        this.echartsComponnet = this.selectComponent('#mychart3');
        this.initChart3()
      },500)
    }
  },
  confirm(e){
    text=[]
    this.setData({
      show:false,
    })
    let date=new Date(e.detail)
    let detas=date.getFullYear()+""+(date.getMonth()+1)
    this.setData({
      time:date.getFullYear()+"年"+(date.getMonth()+1)+"月"
    })
    this.countByDeliveryAndlikedate(0,detas)
    this.countByDeliveryAndlikedate(1,detas)
    this.countByDeliveryAndlikedate(2,detas)
    this.countByDeliveryAndlikedate(3,detas)
    this.countByDeliveryAndlikedate(4,detas)
    this.countByDeliveryAndlikedate(5,detas)
    setTimeout(()=>{
      this.echartsComponnet = this.selectComponent('#mychart2');
      this.initChart2()
      text.sort((a,b)=>{
        return b[1]-a[1]
      })
      this.setData({
        arr:text
      })
    },300)
  },
  cancel(){
    this.setData({show:false,value:0})
    this.onLoad()
  },
  countByDeliveryAndlikedate(index,dates){
    wx.request({
      url:`http://${app.data.http}/api/indent/countByDeliveryAndlikedate/${index}/${dates}`,
      success:res=>{
        if(index==0){
          text.push(["天天送",res.data.data.count])
        }
        if(index==1){
          text.push(["单号送",res.data.data.count])
        }
        if(index==2){
          text.push(["双号送",res.data.data.count])
        }
        if(index==3){
          text.push(["三日送",res.data.data.count])
        }
        if(index==4){
          text.push(["周六送",res.data.data.count])
        }
        if(index==5){
          text.push(["周末送",res.data.data.count])
        }
        options2.series[0].data[index].value=res.data.data.count
      }
    })
  },
  getzhixian(arr2){
    wx.request({
      url: `http://${app.data.http}/api/indent/countByDeliveryAndlikedate2`,
      method:"POST",
      data:arr2.toString(),
      success:(res)=>{
        options3.series[0].data=res.data.data.count[0]
        options3.series[1].data=res.data.data.count[1]
        options3.series[2].data=res.data.data.count[2]
        options3.series[3].data=res.data.data.count[3]
        options3.series[4].data=res.data.data.count[4]
        options3.series[5].data=res.data.data.count[5]
        options3.series[6].data=res.data.data.count[6]
      }
    })  
  }
})