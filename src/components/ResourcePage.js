import React, {  useState } from "react";
import Navigation from './NavigationBar';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Footer from "./Footer";

function FilterBar(props) {
    const setSelectedFilters = props.setSelectedFilters;
    const selectedFilters = props.selectedFilters;

    const handleFilterSelection = (filterKind) => {
        const addFilter = (filterToAdd) => {
            setSelectedFilters([...selectedFilters, filterToAdd])
        }
        const removeFilter = (filterToRemove) => {
            setSelectedFilters(
                selectedFilters.filter(
                    (currentFilter) => currentFilter !== filterToRemove
                )
            )
        }

        if (selectedFilters.includes(filterKind)) {
            removeFilter(filterKind);
        } else {
            addFilter(filterKind);
        }
    }

    return (
        <div className="filterBar">
            <h2>Filter</h2>
            <ul className="filterBar-options">
                <li>
                    <button 
                        type='button' 
                        className="filterBar-option-button"
                        onClick={() => {handleFilterSelection('Support Group')}}
                    >
                        Support Group
                        {selectedFilters.includes('Support Group') ? (
                            <img className="filterBar-option-removeicon" src="/img/remove-icon.png" alt="plus icon"/> 
                            ) : (
                            <img className="filterBar-option-plusicon" src="/img/plus-icon.png" alt="X icon"/>
                        )}
                    </button>
                </li>
                <li>
                    <button 
                        type='button' 
                        className="filterBar-option-button"
                        onClick={() => {handleFilterSelection('Therapy')}}
                    >
                        Therapy
                        {selectedFilters.includes('Therapy') ? (
                            <img className="filterBar-option-removeicon" src="/img/remove-icon.png" alt="plus icon"/> 
                            ) : (
                            <img className="filterBar-option-plusicon" src="/img/plus-icon.png" alt="X icon"/>
                        )}
                    </button>
                </li>
                <li>
                    <button 
                        type='button' 
                        className="filterBar-option-button"
                        onClick={() => {handleFilterSelection('Housing')}}
                    >
                        Housing
                        {selectedFilters.includes('Housing') ? (
                            <img className="filterBar-option-removeicon" src="/img/remove-icon.png" alt="plus icon"/> 
                            ) : (
                            <img className="filterBar-option-plusicon" src="/img/plus-icon.png" alt="X icon"/>
                        )}
                    </button>
                </li>
                <li>
                    <button 
                        type='button' 
                        className="filterBar-option-button"
                        onClick={() => {handleFilterSelection('Employment')}}
                    >
                        Employment
                        {selectedFilters.includes('Employment') ? (
                            <img className="filterBar-option-removeicon" src="/img/remove-icon.png" alt="plus icon"/> 
                            ) : (
                            <img className="filterBar-option-plusicon" src="/img/plus-icon.png" alt="X icon"/>
                        )}
                    </button>
                </li>
                <li>
                    <button 
                        type='button' 
                        className="filterBar-option-button"
                        onClick={() => {handleFilterSelection('Club')}}
                    >
                        Clubs
                        {selectedFilters.includes('Club') ? (
                            <img className="filterBar-option-removeicon" src="/img/remove-icon.png" alt="plus icon"/> 
                            ) : (
                            <img className="filterBar-option-plusicon" src="/img/plus-icon.png" alt="remove icon"/>
                        )}
                    </button>
                </li>
            </ul>
        </div>
    );
};

function Resources(props) {
    const resourceData = props.resourceData;
    const resourceCards = resourceData.map((resource) => {
        const tags = resource.tags.map((tag) => {
            if (tag === "UW" | tag === "Seattle" | tag === "Online" ) {
                return (
                    <li key={tag} className={`${tag} resource-card-tag`}>{tag} Resource</li>
                )
            } else {
                return (
                    <li key={tag} className={`${tag} resource-card-tag`}>{tag}</li>
                )
            }
        })
        console.log(props.selectedFilters);
        return (
            <div key={resource.name} className="resource-card-container">
                <div>
                    <h3 className="resource-card-name">{resource.name}</h3>
                    <img className="resource-card-img" src={resource.image} alt={resource.alt} />
                    <ul className="resource-card-tags-container">
                        {tags}
                    </ul>
                    <p>{resource.description}</p>
                </div>
                <a 
                    className="resource-card-button" 
                    href={resource.link} 
                    target="_blank"
                    rel="noreferrer"
                >
                    GO TO RESOURCE
                </a>
            </div>
        )
    });
    return (
        <div className="resourcePage-content-container">
            <FilterBar 
                selectedFilters={props.selectedFilters} 
                setSelectedFilters={props.setSelectedFilters}
            />
            <div className="resources">
                <h2>{props.resourceType}</h2>
                <div className="resource-all-cards-container">
                    {resourceCards}
                </div>
            </div>
        </div>
    )
}

export default function ResourcePage(props) {
    const [selectedFilters, setSelectedFilters] = useState([]);
    return (
        <div className="resourcePage">
            <Navigation pageTitle={'Resources'} />
            <div className="resourcePage-body">
                <Tabs
                    defaultActiveKey='UW Resources'
                    className="resource-type-tabs"
                >
                    <Tab 
                        eventKey="UW Resources" 
                        title="UW Resources"
                        className="resource-option-tab"
                    >
                        <Resources 
                            setSelectedFilters={setSelectedFilters} 
                            selectedFilters={selectedFilters}
                            resourceType={"UW Resources"} 
                            resourceData={props.uwResources} 
                        />
                    </Tab>
                    <Tab 
                        eventKey="Seattle Resources" 
                        title="Seattle Resources"
                        className="resource-option-tab"
                    >
                        <Resources 
                            setSelectedFilters={setSelectedFilters} 
                            selectedFilters={selectedFilters}
                            resourceType={"Seattle Resources"} 
                            resourceData={props.seattleResources} 
                        />
                    </Tab>
                    <Tab 
                        eventKey="Online Resources" 
                        title="Online Resources"
                        className="resource-option-tab"
                    >
                        <Resources 
                            setSelectedFilters={setSelectedFilters} 
                            selectedFilters={selectedFilters}
                            resourceType={"Online Resources"} 
                            resourceData={props.onlineResources} 
                        />
                    </Tab>
                </Tabs>
            </div>
            <Footer />
        </div>
    )
}