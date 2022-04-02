import React, { useEffect, Fragment } from 'react';
import SearchFilter from '../components/searchfilter';
import TabList from '../components/tablist';
import globalVars from '../global';


function KTabsViewer(){

    const [tabInfo, setInfo] = React.useState(null);

    useEffect(() => {
        if(tabInfo === null){
            fetch(globalVars.server + '/tabs')
            .then(response => response.json())
            .then(data => {
                setInfo(data);
            });
        }
    },[]);

    function updateTabs(query){
        fetch(globalVars.server + '/tabs?search=' + query)
        .then(response => response.json())
        .then(data => {
            setInfo(data);
        });
    }

    return(
        <Fragment>
            <SearchFilter onSearch={updateTabs}/>
            <TabList nostar={false} nodelete={true} data={tabInfo}/>
        </Fragment>
    );

}

export default KTabsViewer;