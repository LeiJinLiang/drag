
import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const isDev: boolean = process.env.NODE_ENV === 'development'

const entry : string [] = isDev?['webpack-hot-middleware/client??reload=true', './src/index']: ['./src/index']

const plugins : any[] = [
    new HtmlWebpackPlugin({
        template : path.resolve(__dirname,'./tmpl.html')
    }),
    new webpack.HotModuleReplacementPlugin()
]

if(!isDev){
    plugins.pop()
}

const config: webpack.Configuration = {
    mode: isDev?"development": "production",
    entry : entry,
    module:{
        rules : [
            {
                test : /\.tsx?$/,
                use : 'ts-loader',
                exclude : '/node_modules/'
            },
            {
                test : /\.css$/i,
                use : [ 
                        { loader: 'style-loader'},
                        { 
                            loader : 'css-loader',
                            options : {
                                importLoaders: 1,
                                modules : true
                            }
                        }
                ],
                exclude : '/node_modules/',
               
            }
        ]
    },
    plugins: plugins,
    resolve : {
        extensions : ['.tsx','.ts','.js']
    },
    output : {
        path : path.resolve(__dirname,'dist'),
        filename : '[name].[hash].js'
    }
}

export default config