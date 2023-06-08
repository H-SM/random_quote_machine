function App(){

    const [ quotes, setQuotes ] = React.useState([]);
    const [ randomQuote, setRandomQuote ] = React.useState([]);
    const [ color, setColor ]= React.useState("#FFF");
    const handleOnClick= () => {
            const colors = [
                "#90A4AE",
                "#26C6DA",
                "#9CCC65",
                "#FFC107",
                "#FF5722",
                "#EC407A",
                "#2196F3",
                "#689F38",
                "#BDBDBD",
                "#F4511E",
            ];
        let randomIndex = Math.floor(Math.random() * quotes.length);
        let randomColorIndex = Math.floor(Math.random() * colors.length);
        setRandomQuote(quotes[randomIndex]);
        setColor(colors[randomColorIndex]);
        
    }
    React.useEffect(()=>{
        async function fetchData(){
            const response = await fetch('https://type.fit/api/quotes');
            const data = await response.json();
            setQuotes(data);
            let randomIndex = Math.floor(Math.random() * data.length);
            setRandomQuote(data[randomIndex]);
        }
        fetchData();
    }, []);
    return ( 
        <div style={{backgroundColor : color, minHeight : "100vh"}} >
        <div className="container pt-5" >
            <div className="jumbotron">
                <div className="card" >
                    <div className="card-header">Inspirational Quotes</div>
                    <div className="card-body" id="quote-box">
                    {(randomQuote) ? (
                            <> 
                            <h5 className="card-title" id="author">{randomQuote.author || 'No author'}</h5> 
                            <p className="card-text" id="text">&quot;{randomQuote.text}&quot;</p>
                            </>
                     ) : (
                            <h2>Loading</h2>
                        )}
                    <button id="new-quote" onClick={handleOnClick} type="button" class="btn btn-primary ml-3 mr-1 btn-sm">New Quote</button>
                            {/* <a href="twitter.com/intent/" target="_blank"className="btn btn-warning"> */}

                    <a href={"https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" + encodeURIComponent('" '+randomQuote.text + '"'+ randomQuote.author)}target="_blank" className="btn btn-warning" id="tweet-quote">
                                <i className="fa fa-twitter" ></i>
                    </a>
                    <a href="" className="btn btn-danger">
                                <i className="fa fa-tumblr"></i>
                    </a>
                    </div>
                </div>
            </div>
            {/* {quotes.map((quote, index) => (
                <div key={index}>{quote.text}</div>
            ))} */}
        </div>
        </div>
    )
}

const root = document.querySelector('.app');
const app = (
    <React.StrictMode>
      <App />
    </React.StrictMode>
);


ReactDOM.createRoot(root).render(app);