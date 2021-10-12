import Vuex from "vuex";
import Vue from 'vue';
import mutations from "./mutations.js";
import actions from "./actions";

Vue.use(Vuex);
export default new Vuex.Store({
	state: {
		allStudents: [], //获取学生列表
	},
	mutations: mutations,
	actions: actions,
	modules: {},
});
