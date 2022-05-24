export default function getdate(date,date2,index){
  console.log("下标",index);
  //2022-4-29 2022-5-2
  let arys1=[];
  arys1=date.split('-');
  let ssdate=new Date(arys1[0],parseInt(arys1[1]-1),arys1[2])
  let week1=String(ssdate.getDay()).replace("0",0).replace("1","-")
  console.log(week1);
  let runnian=(arys1[0]*1%4==0 && arys1[0]*1%100!=0) || arys1[0]*1%400==0
  let year=arys1[0]*1
  let yue=arys1[1]*1
  let day=arys1[2]*1
  let arys2=[];
  arys2=date2.split('-');
  let ssdate2=new Date(arys2[0],parseInt(arys2[1]-1),arys2[2])
  let week2=String(ssdate2.getDay()).replace("0",0).replace("1","-")
  let runnian2=(arys2[0]*1%4==0 && arys2[0]*1%100!=0) || arys2[0]*1%400==0
  let year2=arys2[0]*1
  let yue2=arys2[1]*1
  let day2=arys2[2]*1
  let i=day
  let count=0
  if(index==4){
    while(!(yue==yue2 && i==day2+1)){
      if(yue==1 || yue==3 || yue==5 || yue==7 || yue==8 || yue==10 || yue==12 )
      {
        if(i<=31){
          let a=[];
          a=(year+'-'+yue+'-'+i).split('-');
          let ss=new Date(a[0],parseInt(a[1]-1),a[2])
          let wek=String(ss.getDay()).replace("0",0).replace("1","-")
          if(wek==6){
            
            count+=1;
          }
        }else{
          yue=yue+1;
          i=0;
        }
      }
      if(yue==4 || yue==6 || yue==9 || yue==11)
      {
        if(i<=30){
          let a2=[];
          a2=(year+'-'+yue+'-'+i).split('-');
          let ss2=new Date(a2[0],parseInt(a2[1]-1),a2[2]);
          let wek2=String(ss2.getDay()).replace("0",0).replace("1","-");
          if(wek2==6){
            count+=1;
          }
        }else{
          yue=yue+1;
          i=0;
        }
      }
      i++;
    }
  }
  if(index==5){
    while(!(yue==yue2 && i==day2+1)){
      if(yue==1 || yue==3 || yue==5 || yue==7 || yue==8 || yue==10 || yue==12 )
      {
        if(i<=31){
          let a=[];
          a=(year+'-'+yue+'-'+i).split('-');
          let ss=new Date(a[0],parseInt(a[1]-1),a[2])
          let wek=String(ss.getDay()).replace("0",0).replace("1","-")
          if(wek==0){
            count+=1;
          }
        }else{
          yue=yue+1;
          i=0;
        }
      }
      if(yue==4 || yue==6 || yue==9 || yue==11)
      {
        if(i<=30){
          let a2=[];
          a2=(year+'-'+yue+'-'+i).split('-');
          let ss2=new Date(a2[0],parseInt(a2[1]-1),a2[2]);
          let wek2=String(ss2.getDay()).replace("0",0).replace("1","-");
          if(wek2==0){
            count+=1;
          }
        }else{
          yue=yue+1;
          i=0;
        }
      }
      i++;
    }
  }
  if(index==2 || index==3){
    while(!(yue==yue2 && i==day2+1)){
      if(yue==1 || yue==3 || yue==5 || yue==7 || yue==8 || yue==10 || yue==12 ){
        if(i<=31){
          if(i%index==0){
            count+=1;
          }
        }else{
          yue=yue+1;
          i=0;
        }
      }
      if(yue==4 || yue==6 || yue==9 || yue==11){
        if(i<=30){
          if(i%index==0){
            count+=1;
          }
        }else{
          yue=yue+1;
          i=0;
        }
      }
      i++;
    }
  }
  if(index==1){
    while(!(yue==yue2 && i==day2+1)){
      if(yue==1 || yue==3 || yue==5 || yue==7 || yue==8 || yue==10 || yue==12 ){
        if(i<=31){
          if(i%2==1){
            count+=1;
          }
        }else{
          yue=yue+1;
          i=0;
        }
      }
      if(yue==4 || yue==6 || yue==9 || yue==11){
        if(i<=30){
          if(i%2==1){
            count+=1;
          }
        }else{
          yue=yue+1;
          i=0;
        }
      }
      i++;
    }
  }
  if(index==0){
    while(!(yue==yue2 && i==day2+1)){
      if(yue==1 || yue==3 || yue==5 || yue==7 || yue==8 || yue==10 || yue==12 ){
        if(i<=31){
          count+=1;
        }else{
          yue=yue+1;
          i=0;
        }
      }
      if(yue==4 || yue==6 || yue==9 || yue==11){
        if(i<=30)
          count+=1;
        else{
          yue=yue+1;
          i=0;
        }
      }
      i++;
    }
  }
  return count
}
