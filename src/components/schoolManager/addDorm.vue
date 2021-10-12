<template>
	<div>
		<el-form :inline=true ref='addForm' :model="form" :rules="rules">
			<el-form-item prop="dormNum" label="宿舍号" >
				<el-input v-model="form.dormNum"  placeholder="10-01-01格式"></el-input>
			</el-form-item>
			<el-form-item  >
				<el-button @click="addDorm" type="primary">添加</el-button>
				<el-button @click="detailsDorm" type="primary">显示详情</el-button>
			</el-form-item>
		</el-form>
		<el-divider content-position='center'>删除宿舍</el-divider>
		<el-form :inline=true :model="dormForm" >
			<el-form-item  label="宿舍号" >
				<el-select v-model="dormForm.dormNum" clearable >
					<el-option v-for="item in dorm" :value="item"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item  >
				<el-button @click="deleteDorm" type="primary">删除</el-button>
			</el-form-item>
		</el-form>
		<el-dialog :visible.sync="detailsDormVisible">
			<el-table :data="dormList" > 
				<el-table-column label="栋" prop="dong" align="center"></el-table-column>
				<el-table-column label="层" prop="layer" align="center"></el-table-column>
				<el-table-column label="房间数" prop="num.length"></el-table-column>
				<el-table-column label="操作" align="center" >
					<template slot-scope="scope">
						<el-button @click="searchDorm(scope.row)" type="primary">查看</el-button>
					</template>
				</el-table-column>
			</el-table>
			
		</el-dialog>
		<el-dialog :visible.sync="numVisible">
			<el-table :data="numList">
				<el-table-column align="center" label="房间号" prop="num"></el-table-column>
			</el-table>
		</el-dialog>
	
	</div>
</template>

<script>
	import {adDorm,getDorm,deleteDorm} from '@/api/api'
export default{
	mounted(){
		 getDorm().then(res=>{
			 if(res.code==200){
				 let data =res.data;
				 data.forEach(item=>{
					 this.dorm.push(item.dormNum);
				 })
			 }
		 })
	},
	data(){
		return{
			form:{
				dormNum:''
			},
			numVisible:false,
			dormForm:{
				dormNum:''
			},
			detailsDormVisible:false,
			dorm:[],
			numList:[],
			dormList:[],//栋，层
			rules:{
				dormNum:[{
						required:true,
						message:'添加时必填',
						trigger:"blur"
					},{
						pattern:/^\d{2}-\d{2}-\d{2}$/,
						message:'满足格式如:10-01-01',
						trigger:"change",
					}]
				},
		}
	},
	methods:{
		addDorm(){//添加宿舍
			let params ={dormNum:this.form.dormNum}
			if(this.form.dormNum==''){
				alert('请输入要创建的宿舍号')
			}else{
				this.$refs.addForm.validate(valid=>{
					if(valid){
						adDorm(params).then(res=>{
							if(res.message=='创建成功'){
								let data =res.data;
								console.log(data)
								this.dorm=[];
								data.forEach(item =>{
									this.dorm.push(item.dormNum)
								})
								this.$emit('changeDorm')
							}else if(res.message=='已有宿舍'){
								alert('已有宿舍');
							}else{
								alert('创建失败');
								}
							})
						
					}
				})
				
			}
			
		},
		deleteDorm(){
			let params ={dormNum:this.dormForm.dormNum}
			console.log(params)
			deleteDorm(params).then(res=>{
				console.log(res)
				if(res.message=='删除成功'){
					let data =res.data;
					this.dorm=[];
					this.dormForm.dormNum='';
					data.forEach(item=>{
						this.dorm.push(item.dormNum);
					})
					this.$emit('changeDorm')
					alert('删除成功');
				}
			})
		},
	
		detailsDorm(){
			this.detailsDormVisible=true;
			getDorm().then(res=>{
				let dormList=res.data.map(item=>item.dormNum);
				let newDorm=[];//新的宿舍数据结构
				dormList.forEach(item=>{
					let arr={};
					let z=item.split('-')
					arr.dong=z[0];
					arr.layer=z[1];
					arr.num=z[2];
					newDorm.push(arr)
				})
			let newDormList=[{
				dong:'01',
				layer:'01',
				num:[]},
				];
			
			newDorm.forEach(item=>{ 
				let count=0;
				let index=0;
				newDormList.forEach((newItem,newIndex)=>{
					if(newItem.dong==item.dong&&newItem.layer==item.layer){
						count++; //如果存在，就返回数组下标
						index=newIndex;
					}
				})
				if(count>0){
					newDormList[index].num.push(item.num)
				}else{
					newDormList.push({
						dong:item.dong,
						layer:item.layer,
						num:[item.num]
					})
				}
				// for(let newItem of newDormList){//绝对有bug，但我没找到
				// 	if(newItem.dong&&newItem.dong==item.dong&&newItem.layer&&newItem.layer==item.layer){
				// 		newItem.num.push(item.num);
				// 		count++;
				// 	}else{
				// 		count++;//做一个标记，无论在一个循环中多少次不相等，都只创建一次
				// 		if(count==1){
				// 			newDormList.push({dong:item.dong,layer:item.layer,num:[]})
				// 		}
				// 	}
				// }
			});
			newDormList.map(item=>{
				
				let tempDong=item.dong.split('0')
				if(tempDong[1]==0){
					tempDong=item.dong+'栋'
				}else{
					tempDong=item.dong.split('0')[1]+'栋'
				}
				let tempLayer=item.layer.split('0')
				if(tempLayer[1]==0){
					tempLayer=item.layer+'层'
				}else{
					tempLayer=tempLayer[1]+'层'
				}
				item.dong=tempDong
				item.layer=tempLayer
				return item
			})
			this.dormList=newDormList;
			})
			
		},
		searchDorm(scope){
			// console.log(scope)
			this.numList=[];
			for(let item of scope.num){
				this.numList.push({num:item+'号'})
			}
			this.numVisible=true;
			this.detailsDormVisible=false
		}
	},
}
</script>

<style>
</style>
