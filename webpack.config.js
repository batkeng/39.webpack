const path = require('path'); //노드기반으로 돌기 때문에 여기서만은 common js 문법을 써야함
const webpack = require('webpack'); //웹팩이 가진 플러그인을 사용하기 위해
const moment = require('moment');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin}= require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
	mode: 'development', //production 과 development 둘 중 하나
	entry:{
		main:"./index.js" //import로 부른 애들을 하나로 합쳐줌
	},
	module:{ //미들웨어를 등록
		rules:[
			{
				test: /\.js$/, 
				use:[
					path.resolve("./sample-loader.js"),
				]
			},
			{
				test: /\.css$/, 
				//css-loader: css import
				// style - loader: import 된 css의 적용 
			/* 	use:["style-loader","css-loader"], css를 main.js로 쓰고싶다면 이것  */
				use: [ //css를 밖으로 빼고싶다면 이것 
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
            },
          },
          'css-loader',
        ],
      },
		/* 	{
				test: /\.(jpe?g|gif)$/,
				use:[
					{
						loader:'file-loader',
						options: {
							publicPath:'./dist', //dist 폴더에 저장하겟다
							name: '[name].[ext]?[hash]'
					}
					}
				],
			}, */
			{
				test: /\.(png|jpe?g|gif)$/,
				use:[
					{
						loader:'url-loader',
						options: {
							publicPath:'./dist', //dist 폴더에 저장하겟다
							name: '[name].[ext]?[hash]',
							limit:2048 //2kb 이하만 처리
					}
					},
				],
			}
		],
	},
	plugins:[
		new webpack.BannerPlugin({
			banner:`
			Created by batkeng
			Build Datetime: ${moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}
			`,
		}),//내가 만든 소스 위에 알림창을 보여줌
		new webpack.DefinePlugin({//proxy 서버를 운용 서버를 속일때 쓰는게 proxy 
			VERSION: JSON.stringify('v.1.0.0'), //이 문자열을 json으로 바꾸시오
			'api.domain':JSON.stringify('http://example.com') 
		}),
		new HtmlWebpackPlugin({
			template: 'index.html',
			minify:{   //소스를 압축
				collapseWhitespace:true, //tab space 등의 공백을 제거 
				removeComments:true, //주석을 제거
			},
			hash:true //정적파일들은 모두 해시를 걸겠다
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: "[name].css"
		})
	],
	output:{
		filename:'[name].js',
		path:path.resolve("./dist"), //현재 dist 폴더를 절대경로로 
	}
}