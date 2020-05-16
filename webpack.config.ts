
import path from 'path'
import webpack from 'webpack'
import  HtmlWebpackPlugin from 'html-webpack-plugin'

const isDev: boolean = process.env.NODE_ENV === 'development'

const config: webpack.Configuration = {
    mode: isDev?"development": "production",
    entry : './src/index.ts',
    module:{
        rules : [
            {
                test : /\.tsx?$/,
                use : 'ts-loader',
                exclude : '/node_modules/'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    resolve : {
        extensions : ['.tsx','.ts','.js']
    },
    output : {
        path : path.resolve(__dirname,'dist'),
        filename : '[name].[hash].js'
    }
}

export default config