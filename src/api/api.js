import axios from 'axios';
// axios.defaults.baseURL="http://192.168.1.216:3000";
// axios.defaults.baseURL="http://10.253.27.126:3000";
 axios.defaults.baseURL="http://localhost:3000";
 export const login = params=>{
	 return axios.post('/users/login',params).then(res=>res.data)
 }
export const getAllStudents = params =>{ //获取所有学生
	return axios.get('/students/getAllStudents?stuNum='+params).then(res=>res.data);
}
export const applyChangeDorm =params => { //申请改舍
	return axios.post('students/applyChangeDorm',params).then(res=>res)
}
export const retractApplyChange =params =>{ //撤回改舍申请
	return axios.post('students/retractApplyChange',params).then(res=>res)
}

export const applyRepaire = params =>{ //申请维修，或者更改维修信息
	return axios.post('/students/applyRepaire',params).then(res=>res)
}
export const subApllyRepaire=params=>{ //提交申请维修
	return axios.post('/students/subApplyRepaire',params).then(res=>res.data)
}
export const retractApllyRepaire = params =>{ //撤回维修申请
	return axios.post('/students/retractApllyRepaire',params).then(res=>res)
}


export const search =params=>{ //搜索
	return axios.post('/students/search',params).then(res=>res.data)
}
export const subChange = params=>{ //提交改舍申请
	return axios.post('/students/subChange',params).then(res=>res.data)
}

export const getDorm =params=>{ //获取宿舍信息
	return axios.get('/dorm/getAllDorm?dormNum='+params).then(res=>res.data)
}
export const changeDormRepaire =params=>{ //改变宿舍维修状态
	return axios.post('/dorm/changeDormRepaire',params).then(res=>res.data)
}
export const assignmentDorm= params=>{
	return axios.post('/students/assignmentDorm',params).then(res=>res.data)
}
export const addStudents = params=> { //新增学生
	return axios.post('/students/addStudents',params).then(res=>res.data)
}
export const adDorm =params =>{
	return axios.post('/dorm/adDorm',params).then(res=>res.data)
}
export const deleteDorm =params =>{
	return axios.post('/dorm/deleteDorm',params).then(res=>res.data)
}
export const deleteStudents = params => {
	return axios.post('/students/deleteStudents',params).then(res=>res.data)
}
export const sureDormRepaire=params=>{
	return axios.post('/dorm/sureDormRepaire',params).then(res=>res.data)
}
export const searchDorm= params => {
	return axios.post('/dorm/search',params).then(res=>res.data)
}
export const manageChange= params =>{
	return axios.post('/students/manageChange',params).then(res=>res.data)
}