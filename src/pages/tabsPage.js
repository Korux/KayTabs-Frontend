import React, { useEffect, Fragment } from 'react';
import SearchFilter from '../components/searchfilter';
import TabList from '../components/tablist';



function KTabsViewer(){

    const [tabInfo, setInfo] = React.useState(null);

    useEffect(() => {
        if(tabInfo === null){
            fetch('http://localhost:3000/tabs')
            .then(response => response.json())
            .then(data => {
                setInfo(data);
            });
        }
    });

    function updateTabs(query){
        fetch('http://localhost:3000/tabs?search=' + query)
        .then(response => response.json())
        .then(data => {
            setInfo(data);
        });
    }

    return(
        <Fragment>
            <SearchFilter onSearch={updateTabs}/>
            <TabList data={tabInfo}/>
        </Fragment>
    );

}

export default KTabsViewer;