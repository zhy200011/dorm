<template>
	<div>
		<el-form ref='form' :model="form" :rules="rules" label-width="100px">
			<el-form-item label="联系方式:" prop="number">
				<el-input v-model="form.number" placeholder="请输入邮箱"></el-input>
			</el-form-item>
			<el-form-item label="损坏类型:" prop="damageType">
				<el-select v-model="form.damageType" clearable collapse-tags multiple>
					<el-option 
					v-for="item in damageType" 
					:value="item.value"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="紧急程度:" prop="urgencyDegree">
				<el-select v-model="form.urgencyDegree" >
					<el-option 
					v-for="item in urgencyDegree" 
					:value="item.value"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="备注:" prop="note">
				<el-input v-model="form.note" type="textarea" rows="2"
				placeholder="输入备注"
				></el-input>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import {applyRepaire,
	changeDormRepaire
	} from '@/api/api.js'
	export default{
		mounted() {
			this.form.number='';
			this.form.damageType=[];
			this.form.urgencyDegree='';
			this.form.note='';
		},
		data(){
			return{
				form:{
					number:'',
					damageType:[],
					urgencyDegree:'',
					note:'',
				},
				date:'',
				rules:{
					number:[
						{required:true,trigger:blur,message:'请输入联系方式'},
					{pattern:/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
						trriger:blur,
						message:'必须输入邮箱'}],
					damageType:[{required:true,trigger:blur,message:'请选择损坏类型'},],
					urgencyDegree:[{required:true,trigger:blur,message:'请选择紧急程度'},],
					note:[{required:true,trigger:blur,message:'请输入备注'},]
				},
				damageType:[{value:'门窗'},{value:'电路'},{value:'水管'},{value:'空调'},{value:'照明'},{value:'床铺'},{value:'柜台'},{value:'厕所'}],
				urgencyDegree:[{value:'十分紧急'},{value:'普通'},{value:'不急'}],
			}
		},
		methods:{
			submit(scope){
				this.$refs.form.validate(valid=>{
					if(valid){
						let date=new Date()
						let month=date.getMonth()+1;
						let year =date.getFullYear();
						let day=date.getDate();
						this.date=year+ '-'+month+'-'+day
						let params={
							name:scope.name,
							id:scope._id,
							stuNum:scope.stuNum,
							form:this.form,
							date:this.date,
							isRepaire:true,
						}
						applyRepaire(params).then(res=>{
							this.$emit('getList')
						})
					}
				})
			},
			submitChange(scope){//提交维修更改
				let date=new Date()
				let month=date.getMonth()+1;
				let year =date.getFullYear();
				let day=date.getDate();
				this.date=year+ '-'+month+'-'+day
				let params={
					id:scope._id,
					dormNum:scope.dormNum,
					form:this.form,
					date:this.date
				}
				changeDormRepaire(params).then(res=>{
					this.$emit('getList')
				})
			}
			
		},
		
	}
</script>

<style scoped="scoped">
</style>
