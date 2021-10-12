<template>

		<el-form ref='form' :model="form" :rules="rules" label-width="100px">
			
			<el-form-item label="联系方式:" prop="number">
				<el-input v-model="form.number" placeholder="请输入邮箱"></el-input>
			</el-form-item>
			<el-form-item label="意愿宿舍:" prop="wishDorm" >
				<el-select v-model="form.wishDorm" >
					<el-option v-for='item in dormNum':value="item.dormNum" :key='item.dormNum'></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="备注:"  prop="note" >
				<el-input   type="textarea" rows="2"
				v-model="form.note" placeholder="请说明原因"></el-input>
			</el-form-item>
		
		</el-form>

</template>

<script>
	import {applyChangeDorm,getDorm} from '@/api/api.js'
	export default{
		mounted() {
			this.form.number='';
			this.form.wishDorm='';
			this.form.note='';
			getDorm().then(res=>{
				this.dormNum=res.data
			})
		},
		data(){
			return{
				form:{
					number:'',
					wishDorm:'',
					note:''
				},
				rules:{
					number:[
						{required:true,message:'请输入邮箱',trigger:'blur'},
						{pattern:/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
						trriger:blur,
						message:'必须输入邮箱'}
					],
					wishDorm:[
						{required:true,message:'请输入意愿宿舍',trigger:'blur'}
					],
					note:[
						{required:true,message:'请输入备注',trigger:'blur'}
					]
				},
				dormNum:[],
				
			}
		},
		methods:{
			
			submit(scope){ //提交信息方法
				this.$refs.form.validate(valid=>{
					if(valid){
						let params={
							name:scope.name,
							id:scope._id,
							stuNum:scope.stuNum,
							number:this.form.number,
							wishDorm:this.form.wishDorm,
							note:this.form.note,
							
						};
						if(this.form.wishDorm==scope.dorm.dormNum){
							alert('已在期望宿舍')
						}else{
							applyChangeDorm(params).then(res =>{
								// console.log(res)
								this.$emit('getList') //激活事件，获取列表
								
							})
						}
						
					}else{
						alert('提交错误')
					}
				}),
				this.$refs.form.resetFields();
			}
		}
	}
</script>

<style scoped="scoped">
	.el-input{
		width:70%;
	}
	.select-sex{
		width: 25%;
	}
</style>
