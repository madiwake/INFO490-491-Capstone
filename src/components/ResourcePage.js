import React, {  useEffect, useState } from "react";
import Navigation from './NavigationBar';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Footer from "./Footer";

function FilterBar(props) {
    const setSelectedFilters = props.setSelectedFilters;
    const selectedFilters = props.selectedFilters;

    const handleFilterSelection = (filterKind) => {
        const addFilter = (filterToAdd) => {
            setSelectedFilters([...selectedFilters, filterToAdd]);
        };
        const removeFilter = (filterToRemove) => {
            setSelectedFilters(
                selectedFilters.filter(
                    (currentFilter) => currentFilter !== filterToRemove
                )
            );
        };

        if (selectedFilters.includes(filterKind)) {
            removeFilter(filterKind);
        } else {
            addFilter(filterKind);
        };
    };

    const FilterOption = ({filterName}) => {
        return (
            <li>
                <button 
                    type='button' 
                    className="filterBar-option-button"
                    onClick={() => {handleFilterSelection(filterName)}}
                >
                    {filterName}
                    {selectedFilters.includes(filterName) ? (
                        <img className="filterBar-option-removeicon" src="/img/remove-icon.png" alt="plus icon"/> 
                        ) : (
                        <img className="filterBar-option-plusicon" src="/img/plus-icon.png" alt="X icon"/>
                    )}
                </button>
            </li>
        );
    };

    return (
        <div className="filterBar">
            <h2>Filter</h2>
            <ul className="filterBar-options">
                <FilterOption filterName={'Support Group'} />
                <FilterOption filterName={'Therapy'} />
                <FilterOption filterName={'Housing'} />
                <FilterOption filterName={'Employment'} />
                <FilterOption filterName={'Club'} />
            </ul>
        </div>
    );
};

function Resources(props) {
    const resourceData = props.resourceData;
    const [filteredResourceData, setFilteredResourceData] = useState(resourceData);

    useEffect(() => {
        const includesAll = (resources, currentFilters) => currentFilters.every(filter => resources.includes(filter));
        if (props.selectedFilters.length === 0) {
            setFilteredResourceData(resourceData);
        } else {
            setFilteredResourceData(
                resourceData.filter((resource) => includesAll(resource.tags, props.selectedFilters)) 
            )
        };
    }, [props.selectedFilters, resourceData]);

    const resourceCards = filteredResourceData.map((resource) => {
        const tags = resource.tags.map((tag) => {
            if (tag === "UW" | tag === "Seattle" | tag === "Online" ) {
                return (
                    <li key={tag} className={`${tag} resource-card-tag`}>{tag} Resource</li>
                );
            } else {
                return (
                    <li key={tag} className={`${tag} resource-card-tag`}>{tag}</li>
                );
            };
        });
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
        );
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
                    { resourceCards.length === 0 ?
                        ("No Results Try another filter!")
                        :
                        (resourceCards)
                    }
                </div>
            </div>
        </div>
    );
};

export default function ResourcePage(props) {
    const [selectedFilters, setSelectedFilters] = useState([]);

// try to make dynamic tab component to use - not working when trying normal approach

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
    );
};