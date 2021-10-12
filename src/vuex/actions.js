import  {getAllStudents}  from "@/api/api";
export default {
	acAllStudents({commit}){
		getAllStudents().then( res=>{
			commit('allStudents',res)
		})
	}
}