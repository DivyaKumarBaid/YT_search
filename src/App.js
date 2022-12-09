import React from 'react';
import Card from './components/Card/Card'
import './App.css'
import Filter from './components/filter/Filter';
import { BsYoutube,BsSortUpAlt } from 'react-icons/bs'
import { WiDaySunny } from 'react-icons/wi'
import { MdNightlight } from 'react-icons/md'
import TextFilter from './components/filter/TextFilter';

export default function App() {
  // theme
  const [theme, setTheme] = React.useState(false);
  const toggleTheme = () => setTheme(old => !old);

  // data
  const [data, setData] = React.useState([])
  const [isPending, setPending] = React.useState(true)
  const [error, setError] = React.useState(null)

  // channel config for filter
  const [channelName, setChannelName] = React.useState("");
  const [videoTitle, setvideoTitle] = React.useState("");
  const [videoDescription, setvideoDescription] = React.useState("");
  const [sortingType, setSortingType] = React.useState("Ascending");

  // options for sorting
  const [sorting, setSorting] = React.useState(['Ascending', 'Descending']);
  // options for sorting

  // page for fetching
  const [page, setPage] = React.useState(1);

  // handle page inc
  const changePage = (value) => {
    setPage(prev => prev + value);
  }

  // handles location filter
  const handleChannelName = (value) => {
    setChannelName(value);
  };
  // handles location filter
  const handlevideoTitle = (value) => {
    setvideoTitle(value);
  };
  // handles location filter
  const handlevideoDescription = (value) => {
    setvideoDescription(value);
  };
  // handles location filter
  const handleSorting = (value) => {
    setSortingType(value);
  };

  const handleSearch = () => {
    let url = process.env.REACT_APP_BASE_URL+`/videos/?page=${page}&sort=${sortingType === "Ascending" ? true : false}`
    if (channelName !== "") {
      url = url + `&channelName=${channelName}`
    }
    if (videoTitle !== "") {
      url = url + `&videoTitle=${videoTitle}`
    }
    if (videoDescription !== "") {
      url = url + `&description=${videoDescription}`
    }
    fetchData(url)
  }

  const fetchData = (url) => {
    const abortCont = new AbortController();
    fetch(url, { signal: abortCont.signal })
      .then(res => {
        if (!res === 200 || !res === 201) {
          throw Error('Could not fetch the data form the servre');
        }
        return res.json();
      })
      .then(data => {
        setData(data);
        setPending(false);
        setError(null);
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          setPending(false);
          setError(err.message);
        }
      })
    return () => abortCont.abort()
  }

  // example http://127.0.0.1:8000/videos/?page=1&sort=true
  // const { data, isPending, Error } = useFetch(`http://127.0.0.1:8000/videos/?page=1&sort=true&channelName=asd&videoTitle=asd&description=asd`)

  React.useEffect(() => {
    // data, isPending, Error
    fetchData(process.env.REACT_APP_BASE_URL+`/videos/?page=${page}&sort=${sortingType === "Ascending" ? true : false}`)
  }, [page, sortingType])

  // const handleLoc = (value) => setLoc(value);
  return (
    <div className={`container ${theme && "darkTheme"}`}>
      <div className={`navBar ${theme && "darkTheme"}`}>
        <div className="company">
          <BsYoutube style={{ color: 'red', fontSize: '1.5em', marginRight: '12px' }} />
          Youtube-Estate
        </div>
        <div className="navRightWrapper" style={{display:"flex",justifyContent:"center",alignItems:"center",}}>
        <div className="apiLink" style={{marginRight:'15px'}}>
          <a href={process.env.REACT_APP_BASE_URL + `/docs`}>
            <div className="submitBtn">API</div>
          </a>
        </div>
          {theme ? <MdNightlight onClick={toggleTheme} style={{ color: "white", fontSize: '20px', marginRight: '35px',marginLeft:'5px', cursor: 'pointer', transform: 'rotate(-20deg)' }} /> : <WiDaySunny onClick={toggleTheme} style={{ color: "black", fontSize: '35px', marginRight: '25px', cursor: 'pointer' }} />}
        </div>
      </div>
      <div className="landing">
        <div className="landingText">
          Search Youtube<br />without any hussle.
        </div>
        <div className={`imageDiv ${theme && 'darkTheme'}`} style={{ backgroundImage: 'url(assets/homeHero.png)' }}></div>
      </div>

      <div className={`filter ${theme && "darkTheme"}`}>

        <Filter
          value={sortingType}
          handleChange={handleSorting}
          list={sorting}
          place={"Sorting(Time)"}
          symbol={<BsSortUpAlt style={{ color: 'var(--base)', marginRight: '5px' }} />}
          theme={theme}
        />

        <div style={{ width: '1px', height: '8vh', background: 'rgb(35,35,35,0.2)' }}></div>
        <TextFilter
          value={channelName}
          handleChange={handleChannelName}
          place={"Channel Name"}
          theme={theme}
        />
        <div style={{ width: '1px', height: '8vh', background: 'rgb(35,35,35,0.2)' }}></div>
        <TextFilter
          value={videoTitle}
          handleChange={handlevideoTitle}
          place={"Video Title"}
          theme={theme}
        />

        <div style={{ width: '0.5px', height: '8vh', background: 'rgb(35,35,35,0.2)' }}></div>
        <TextFilter
          value={videoDescription}
          handleChange={handlevideoDescription}
          place={"Description"}
          theme={theme}
        />
        <div style={{ width: '0.5px', height: '8vh', background: 'rgb(35,35,35,0.2)' }}></div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => { handleSearch() }}><div className="submitBtn">Search</div></div>
      </div>
      {isPending ? <div className={`Loader ${theme && "darkTheme"}`}>Loading...</div>
        : data && <div className={`searchResult ${theme && "darkTheme"}`}>
          {data.map((data => <Card obj={data} theme={theme} />))}
        </div>}
      <div className="pagination">
        <div className={`pageSelector ${theme && "darkTheme"}`}>
          {page > 1 && <div className={`prev pageBox ${theme && "darkTheme"}`} onClick={() => { changePage(-1) }}>
            -
          </div>}
          <div className={`pageDisplay pageBox ${theme && "darkTheme"}`}>
            {page}
          </div>
          {data && data.length > 0 && <div className={`next pageBox ${theme && "darkTheme"}`} onClick={() => { changePage(1) }}>
            +
          </div>}
        </div>
      </div>
    </div>
  )
}
