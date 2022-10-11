import axios from 'axios';
import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const dateArray = [];
dateArray.push((getDateRangeData("2022-10-01","2022-10-10")))
console.log(dateArray)


function dayData(name, uv,pv,amt){
	this.name = name;
	this.uv = uv;
  this.pv = pv;
  this.amt = amt;
};

const first = ['A','B','C','D','E'];
const second = [1000,2000,3000,4000,5000];
const third = [2000,3000,4000,5000,6000];
const fourth = [1000,2000,3000,4000,5000];


const data = [
  
];
for(let i=0;i<5;i++){
  let dayData1 = new dayData(first[i],second[i],third[i],fourth[i])
  data.push(dayData1);
}


export default class Graph extends PureComponent {

  render() {
    return (
      <LineChart
        width={1000}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" 
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
    );
  }
}

function getDateRangeData(param1, param2){  //param1은 시작일, param2는 종료일이다.
	var res_day = [];
 	var ss_day = new Date(param1);
   	var ee_day = new Date(param2);    	
  		while(ss_day.getTime() <= ee_day.getTime()){
  			var _mon_ = (ss_day.getMonth()+1);
  			_mon_ = _mon_ < 10 ? '0'+_mon_ : _mon_;
  			var _day_ = ss_day.getDate();
  			_day_ = _day_ < 10 ? '0'+_day_ : _day_;
   			res_day.push(ss_day.getFullYear() + '-' + _mon_ + '-' +  _day_);
   			ss_day.setDate(ss_day.getDate() + 1);
   	}
   	return res_day;
}
console.log(getDateRangeData("2022-09-10","2022-10-10"))