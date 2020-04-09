module.exports={
	presets:[
		['@babel/preset-env',{
			useBuiltIns:'usage',
			corejs:{
				version:2
			},
			targets: {
				browsers: ">= 1% in KR"  //한국에서 99%이상의 브라우저에서 돌게끔 
			}
		}],
	]
}