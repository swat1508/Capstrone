import React,{useState,Fragment} from 'react';
import SearchComponent from '../../components/search/Search';
import SortComponent from '../../components/sort/Sort';
 const AdminPage= ()=> {
    const [query,setQuery]=useState({searchQuery:"",sortBy:"title",sortType:"asc"});
    const updateQuery=(updatedQuery)=>{
        setQuery(prevState => {return { ...prevState,...updatedQuery}});
    }
    console.log(query);
    return(
        <Fragment>
            <div className="col-sm-8">
                <SearchComponent updateQuery={updateQuery}/>
            </div>
            <div className="col-sm-4">
                <SortComponent updateQuery={updateQuery}/>
            </div>
        </Fragment>
    )
}
export default AdminPage;