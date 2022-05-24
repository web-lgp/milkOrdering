export default function arr1(month1,day1) {
  let month=month1;
  let day=day1;
  if(day>=7){
    return new Array([month+"."+(day-6),month+"."+(day-5),month+"."+(day-4),month+"."+(day-3),month+"."+(day-2),month+"."+(day-1),month+"."+day]);
  }
  if(day<7){
    let arr1=[];
    while(arr1.length!=7){
      if(month==1 || month==3 || month==5 || month==7 || month==8 || month==10 || month==12){
        if(day>=1){
          arr1.unshift(month+"."+day)
          day--;
        }else{
          if(month==1){
            month=12
          }else{
            month--;
            if(month==1 || month==3 || month==5 || month==7 || month==8 || month==10 || month==12){
              day=31
            }else  if(month==4 || month==6 || month==9 || month==11){
              day=30
            }
          }
        }
      }
      else if(month==4 || month==6 || month==9 || month==11){
        if(day>=1){
          arr1.unshift(month+"."+day)
          day--;
        }else{
          if(month==1){
            month=12
          }else{
            month--;
            if(month==1 || month==3 || month==5 || month==7 || month==8 || month==10 || month==12){
              day=31
            }else  if(month==4 || month==6 || month==9 || month==11){
              day=30
            }
          }
        }
      }
    }
    return arr1;
  }
}