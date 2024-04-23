import React, {  useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Footer from "./Footer";

function FilterBar(props) {
    const setSelectedFilters = props.setSelectedFilters;
    const selectedFilters = props.selectedFilters;

    const handleFilterSelection = (filterKind) => {
        const addFilter = (filterToAdd) => {
            setSelectedFilters(
                [...selectedFilters, filterToAdd]
            );
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

    const FilterOption = ({filterName, lastButton}) => {
        return (
            <li className="filterBar-option">
                <button 
                    type="button"
                    className={lastButton ? 
                        ("filterBar-option-button last-button")
                         : 
                        ("filterBar-option-button")
                    }
                    onClick={() => {handleFilterSelection(filterName)}}
                >
                    {filterName}
                    {selectedFilters.includes(filterName) ? 
                        (<img className="filterBar-option-button-removeicon" src="/img/remove-icon.png" alt="plus icon"/> ) 
                         : 
                        (<img className="filterBar-option-button-plusicon" src="/img/plus-icon.png" alt="X icon"/>)
                    }
                </button>
            </li>
        );
    };

    return (
        <div className="filterBar">
            <h2 className="filterBar-title">
                Filter
            </h2>
            <ul className="filterBar-allOptions">
                <FilterOption filterName={"Support Group"} />
                <FilterOption filterName={"Therapy"} />
                <FilterOption filterName={"Housing"} />
                <FilterOption filterName={"Employment"} />
                <FilterOption 
                    filterName={"Club"} 
                    lastButton={true} 
                />
            </ul>
        </div>
    );
};

function Resources(props) {
    const resourceData = props.resourceData;
    const [filteredResourceData, setFilteredResourceData] = useState(resourceData);

    useEffect(() => {
        const includesAll = (resources, currentFilters) => 
            currentFilters.every(filter => 
                resources.includes(filter));
        
        if (props.selectedFilters.length === 0) {
            setFilteredResourceData(resourceData);
        } else {
            setFilteredResourceData(
                resourceData.filter((resource) => 
                    includesAll(resource.tags, props.selectedFilters)) 
            );
        };
    }, [props.selectedFilters, resourceData]);

    const resourceCards = filteredResourceData.map((resource) => {
        const tags = resource.tags.map((tag) => {
            if (tag === "UW" | tag === "Seattle" | tag === "Online" ) {
                return (
                    <li 
                        key={tag} 
                        className={`${tag} resourceCard-tag`}
                    >
                        {tag} Resource
                    </li>
                );
            } else if (resource.tags.includes("UW") && tag === "Club") {
                return (
                    <li 
                        key={tag} 
                        className={`${tag} resourceCard-tag`}
                    >
                        RSO
                    </li>
                );
            } else {
                return (
                    <li 
                        key={tag} 
                        className={`${tag} resourceCard-tag`}
                    >
                        {tag}
                    </li>
                );
            };
        });
        return (
            <div 
                key={resource.name} 
                className="resourceCard"
            >
                <div>
                    <h3 className="resourceCard-name">
                        {resource.name}
                    </h3>
                    <img 
                        className="resourceCard-img" 
                        src={resource.image} 
                        alt={resource.alt} 
                    />
                    <ul className="resourceCard-tag-container">
                        {tags}
                    </ul>
                    <p>
                        {resource.description}
                    </p>
                </div>
                <a 
                    className="resourceCard-button" 
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
        <div className="resourceTab-content-container">
            <FilterBar 
                selectedFilters={props.selectedFilters} 
                setSelectedFilters={props.setSelectedFilters}
            />
            <div className="resourceTab-content">
                <h2>
                    {props.resourceType}
                </h2>
                <div className="resourceTab-content-allResourceCards">
                    {resourceCards.length === 0 ?
                        ("No current resources. Try another filter!")
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
            <div className="body">
                <Tabs
                    defaultActiveKey="UW Resources"
                    className="body-allResourceTabs"
                >
                    <Tab 
                        eventKey="UW Resources" 
                        title="UW Resources"
                        className="body-resourceTab"
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
                        className="body-resourceTab"
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
                        className="body-resourceTab"
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