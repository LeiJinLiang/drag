import express from 'express'
import path from 'path'
import webpack from 'webpack'
import WebpackDevMiddleware from 'webpack-dev-middleware'
import WebpackHotMiddleware  from 'webpack-hot-middleware'
import config from './webpack.config'

const compiler = webpack(config)

const mdiddleware = WebpackDevMiddleware(compiler,{
    publicPath : config.output.publicPath,
    stats : {
        colors : true,
        hash : true,
        timings : true,
        chunks : false,
        chunkModules : false,
        modules : false
    }
})

const app : express.Application = express()

app.use(mdiddleware)
app.use(WebpackHotMiddleware(compiler))

app.get('*',(request, response)=> {
    response.send(mdiddleware.fileSystem.readFileSync(path.join(__dirname,'dist/index.html')))
    response.end()
})

app.listen(3000,()=>{
    console.info(`==> 🌎 Listening on port %s. Open up http://localhost:3000 %s. in your browser.`);
})
