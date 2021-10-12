module.exports={
	configureWebpack:{
		resolve:{
			alias:{
				'assets':'@/assets',
				'components':'@/components',
				'network':'@/network',
				'views':'@/views',
				
			}
		},
	
	},
	// 配置设置接口
	  devServer:{
	        proxy:{
	            ["/dev-api"]:{
	            target:'http://localhost:30001',
	              changeOrigin:true,
	                pathRewrite: {
	                    ['^' + "/dev-ap"]: ''
	                }
	            }
	        }
	
	    }

}