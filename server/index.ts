import * as express from 'express'

const app = express()

const PORT = 8080

app.get('/', (req: express.Request, res: express.Response) => {
    res.setHeader('Content-Type', 'text/html')
    res.end('<h1>Hello World</h1>')
})


app.listen(PORT, () => console.log(`app running on port ${PORT}`))